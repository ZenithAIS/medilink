import Link from "next/link";
import { requireSiteAdmin } from "@/app/lib/app-db/admin-guard";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  published_at: string | null;
  updated_at: string;
};

export default async function AdminBlogPage() {
  const { supabase } = await requireSiteAdmin();
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, category, published, published_at, updated_at")
    .order("updated_at", { ascending: false })
    .returns<Row[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-ink-900">بلاگ</h1>
        <Link
          href="/admin/blog/new"
          className="gradient-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90"
        >
          مقاله‌ی جدید
        </Link>
      </div>

      {error && (
        <div className="bg-bad-50 border border-bad-200 text-bad-600 text-sm rounded-xl px-4 py-3 mb-4">
          خطا در خواندن مقاله‌ها: {error.message}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[720px] text-right">
          <thead>
            <tr className="border-b border-cream-200 bg-cream-100 text-xs text-ink-400">
              <th className="p-3 font-bold">عنوان</th>
              <th className="p-3 font-bold">دسته‌بندی</th>
              <th className="p-3 font-bold">وضعیت</th>
              <th className="p-3 font-bold">آخرین ویرایش</th>
              <th className="p-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {posts?.map((post) => (
              <tr key={post.id} className="text-sm">
                <td className="p-3">
                  <Link href={`/admin/blog/${post.id}`} className="font-medium text-ink-900 hover:text-brand-600">
                    {post.title}
                  </Link>
                  <div className="text-xs text-ink-400" dir="ltr">
                    /blog/{post.slug}
                  </div>
                </td>
                <td className="p-3 text-ink-700">{post.category}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      post.published ? "bg-good-50 text-good-600" : "bg-cream-200 text-ink-700"
                    }`}
                  >
                    {post.published ? "منتشرشده" : "پیش‌نویس"}
                  </span>
                </td>
                <td className="p-3 text-ink-400 whitespace-nowrap">
                  {new Date(post.updated_at).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-3 text-left">
                  {post.published && (
                    <a href={`/blog/${post.slug}`} target="_blank" className="text-xs text-brand-600 hover:underline">
                      مشاهده
                    </a>
                  )}
                </td>
              </tr>
            ))}
            {posts?.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-ink-400">
                  هنوز مقاله‌ای نوشته نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
