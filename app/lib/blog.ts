import "server-only";
import { createAppDbPublicClient } from "./app-db/server";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  /** تاریخ انتشار ISO برای اسکیما (datePublished)؛ `date` نسخه‌ی نمایشی شمسی است. */
  publishedAt?: string;
  readingTime: string;
  /** URL عمومی تصویر شاخص؛ نبودنش یعنی کاور برداری دسته‌بندی نشان داده شود. */
  cover?: string;
  /** پاراگراف‌های متن مقاله. */
  body: string[];
};

type PostRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  cover_image: string | null;
  published_at: string | null;
};

const COLUMNS = "slug, title, excerpt, category, content, cover_image, published_at";

/** مقاله‌ها از پنل ادمین (جدول blog_posts در دیتابیس اپ) مدیریت می‌شوند؛ مقاله‌ای که published_at آن
 * در آینده است (زمان‌بندی‌شده) تا رسیدن زمانش نمایش داده نمی‌شود و با revalidate صفحه‌ها خودش ظاهر می‌شود. */
function toPost(row: PostRow): Post {
  const words = row.content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: row.published_at ? new Date(row.published_at).toLocaleDateString("fa-IR") : "",
    publishedAt: row.published_at ? new Date(row.published_at).toISOString() : undefined,
    readingTime: `${minutes.toLocaleString("fa-IR")} دقیقه`,
    cover: row.cover_image ?? undefined,
    body: row.content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  };
}

// خطای دیتابیس نباید بیلد یا کل صفحه‌ی بلاگ را از کار بیندازد؛ فقط لاگ می‌شود.
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const { data, error } = await createAppDbPublicClient()
      .from("blog_posts")
      .select(COLUMNS)
      .eq("published", true)
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    if (error) throw error;
    return (data as PostRow[]).map(toPost);
  } catch (err) {
    console.error("[blog] reading posts failed:", err);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await createAppDbPublicClient()
      .from("blog_posts")
      .select(COLUMNS)
      .eq("published", true)
      .lte("published_at", new Date().toISOString())
      .eq("slug", slug)
      .maybeSingle<PostRow>();
    if (error) throw error;
    return data ? toPost(data) : null;
  } catch (err) {
    console.error("[blog] reading post failed:", err);
    return null;
  }
}
