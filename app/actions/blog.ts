"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSiteAdmin } from "@/app/lib/app-db/admin-guard";

export type PostFormState = { message?: string } | undefined;

const BUCKET = "blog";
const MAX_COVER_BYTES = 5 * 1024 * 1024;
const COVER_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

const PostSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().trim().min(3, "عنوان را کامل وارد کنید.").max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "نامک فقط حروف انگلیسی کوچک، عدد و خط تیره (مثل reduce-no-show).")
    .max(120),
  excerpt: z.string().trim().min(10, "خلاصه حداقل ۱۰ حرف باشد.").max(400),
  category: z.string().trim().min(2, "دسته‌بندی را وارد کنید.").max(60),
  content: z.string().trim().min(1, "متن مقاله خالی است.").max(100_000),
  published: z.boolean(),
  removeCover: z.boolean(),
});

/** مسیر فایل داخل باکت، از روی URL عمومی؛ برای تصاویر خارج از باکت ما null. */
function storagePath(publicUrl: string | null) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = publicUrl?.indexOf(marker) ?? -1;
  return publicUrl && i >= 0 ? decodeURIComponent(publicUrl.slice(i + marker.length)) : null;
}

function revalidateBlog(...slugs: (string | undefined)[]) {
  revalidatePath("/blog");
  for (const slug of slugs) if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/blog");
}

export async function savePost(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const { supabase } = await requireSiteAdmin();

  const parsed = PostSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    category: formData.get("category"),
    content: formData.get("content"),
    published: formData.get("published") === "on",
    removeCover: formData.get("removeCover") === "on",
  });
  if (!parsed.success) return { message: parsed.error.issues[0]?.message ?? "اطلاعات نامعتبر است." };
  const input = parsed.data;

  const existing = input.id
    ? (
        await supabase
          .from("blog_posts")
          .select("slug, cover_image, published_at")
          .eq("id", input.id)
          .maybeSingle<{ slug: string; cover_image: string | null; published_at: string | null }>()
      ).data
    : null;
  if (input.id && !existing) return { message: "مقاله پیدا نشد." };

  let coverImage = input.removeCover ? null : (existing?.cover_image ?? null);

  const file = formData.get("cover");
  if (file instanceof File && file.size > 0) {
    const ext = COVER_TYPES[file.type];
    if (!ext) return { message: "تصویر باید JPG، PNG یا WebP باشد." };
    if (file.size > MAX_COVER_BYTES) return { message: "حجم تصویر حداکثر ۵ مگابایت است." };

    const path = `${input.slug}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });
    if (uploadError) {
      console.error("[savePost] upload failed:", uploadError.message);
      return { message: "آپلود تصویر ناموفق بود." };
    }
    coverImage = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  const row = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    category: input.category,
    content: input.content,
    cover_image: coverImage,
    published: input.published,
    // تاریخ انتشار واقعی: اولین باری که منتشر می‌شود؛ لغو انتشار تاریخ را پاک می‌کند.
    published_at: input.published ? (existing?.published_at ?? new Date().toISOString()) : null,
  };

  const { error } = input.id
    ? await supabase.from("blog_posts").update(row).eq("id", input.id)
    : await supabase.from("blog_posts").insert(row);

  if (error) {
    if (error.code === "23505") return { message: "این نامک قبلاً برای مقاله‌ی دیگری استفاده شده." };
    console.error("[savePost]", error.message);
    return { message: "ذخیره‌ی مقاله ناموفق بود." };
  }

  // تصویر قبلی اگر جایگزین یا حذف شد، از باکت هم پاک شود.
  const oldPath = storagePath(existing?.cover_image ?? null);
  if (oldPath && existing?.cover_image !== coverImage) {
    await supabase.storage.from(BUCKET).remove([oldPath]);
  }

  revalidateBlog(input.slug, existing?.slug);
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  const { supabase } = await requireSiteAdmin();
  const id = z.uuid().parse(formData.get("id"));

  const { data: post } = await supabase
    .from("blog_posts")
    .select("slug, cover_image")
    .eq("id", id)
    .maybeSingle<{ slug: string; cover_image: string | null }>();
  if (!post) redirect("/admin/blog");

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error("حذف مقاله ناموفق بود.");

  const path = storagePath(post.cover_image);
  if (path) await supabase.storage.from(BUCKET).remove([path]);

  revalidateBlog(post.slug);
  redirect("/admin/blog");
}
