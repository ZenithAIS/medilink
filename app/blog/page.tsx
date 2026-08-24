import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import NewsletterCta from "@/app/components/NewsletterCta";
import { posts, categories } from "@/app/lib/blog";

export const metadata: Metadata = {
  title: "بلاگ و منابع | مدی‌لینک",
  description:
    "مقالاتی درباره‌ی مدیریت کلینیک، هوش مصنوعی در حوزه‌ی سلامت، تحلیل داده و حریم خصوصی داده‌ی بیمار.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main>
      <PageHero
        badge="بلاگ و منابع"
        title="آنچه درباره‌ی"
        highlight="کلینیک هوشمند می‌دانیم"
        description="تجربه‌ها و راهنماهای عملی برای مدیران کلینیک و کادر درمان."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <li
                key={category}
                className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-600"
              >
                {category}
              </li>
            ))}
          </ul>

          {/* مقاله‌ی شاخص */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow mb-12"
          >
            {/* TODO(asset): تصویر شاخص مقاله — بند ۵ بریف */}
            <div
              className="aspect-[16/10] bg-gradient-to-br from-sky-100 to-teal-100 flex items-center justify-center"
              role="img"
              aria-label={`تصویر شاخص ${featured.title}`}
            >
              <span className="text-xs text-gray-400">جای تصویر شاخص</span>
            </div>
            <div className="p-6 lg:pe-10">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <span className="text-sky-600 font-medium">
                  {featured.category}
                </span>
                <span>{featured.date}</span>
                <span>{featured.readingTime}</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-sky-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {featured.excerpt}
              </p>
              <span className="text-sky-600 font-bold text-sm group-hover:underline">
                مطالعه‌ی مقاله
              </span>
            </div>
          </Link>

          {/* شبکه‌ی مقالات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div
                  className="aspect-[16/10] bg-gray-100 flex items-center justify-center"
                  role="img"
                  aria-label={`تصویر شاخص ${post.title}`}
                >
                  <span className="text-xs text-gray-400">جای تصویر</span>
                </div>
                <div className="p-5 flex flex-col grow">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="text-sky-600 font-medium">
                      {post.category}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed grow">
                    {post.excerpt}
                  </p>
                  <span className="text-xs text-gray-400 mt-4">
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
