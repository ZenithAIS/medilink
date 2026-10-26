import Link from "next/link";
import { getPublishedPosts } from "@/app/lib/blog";

/* سکشن صفحه‌ی خانه: تازه‌ترین مقاله‌های بلاگ (برای کشف سریع‌تر مقاله‌ها توسط گوگل). */
export default async function LatestPosts() {
  const posts = (await getPublishedPosts()).slice(0, 6);
  if (!posts.length) return null;
  return (
    <section id="latest-posts" className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-ink-900 mb-4">تازه‌ترین مقاله‌ها</h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="block h-full rounded-2xl border border-cream-300 bg-white p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-ink-900 mb-2">{p.title}</h3>
                <p className="text-sm text-ink-600 leading-7 line-clamp-3">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-center mt-8">
          <Link href="/blog" className="text-brand-600 font-bold text-sm hover:underline">
            همه‌ی مقاله‌ها
          </Link>
        </p>
      </div>
    </section>
  );
}
