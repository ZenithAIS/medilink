import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSiteAdmin } from "@/app/lib/app-db/admin-guard";
import { deletePost } from "@/app/actions/blog";
import PostForm, { type EditablePost } from "../PostForm";
import { existingCategories } from "../_categories";
import DeletePostButton from "../DeletePostButton";

type Props = { params: Promise<{ id: string }> };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const { supabase } = await requireSiteAdmin();
  const [{ data: post }, categories] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, category, content, cover_image, published")
      .eq("id", id)
      .maybeSingle<EditablePost>(),
    existingCategories(supabase),
  ]);
  if (!post) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/blog" className="text-xs text-ink-400 hover:text-brand-600">
        ← بلاگ
      </Link>
      <h1 className="text-2xl font-black text-ink-900 mt-1 mb-6">ویرایش مقاله</h1>
      <PostForm post={post} categories={categories} />

      <form action={deletePost} className="mt-6">
        <input type="hidden" name="id" value={post.id} />
        <DeletePostButton />
      </form>
    </div>
  );
}
