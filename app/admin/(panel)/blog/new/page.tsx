import Link from "next/link";
import { requireSiteAdmin } from "@/app/lib/app-db/admin-guard";
import PostForm from "../PostForm";
import { existingCategories } from "../_categories";

export default async function NewPostPage() {
  const { supabase } = await requireSiteAdmin();
  const categories = await existingCategories(supabase);

  return (
    <div className="max-w-3xl">
      <Link href="/admin/blog" className="text-xs text-ink-400 hover:text-brand-600">
        ← بلاگ
      </Link>
      <h1 className="text-2xl font-black text-ink-900 mt-1 mb-6">مقاله‌ی جدید</h1>
      <PostForm categories={categories} />
    </div>
  );
}
