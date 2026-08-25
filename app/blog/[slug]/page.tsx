import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterCta from "@/app/components/NewsletterCta";
import Figure from "@/app/components/Figure";
import { posts, getPost } from "@/app/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | بلاگ مدیلینک`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <article>
        <header className="pt-32 pb-12 bg-gray-50 border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="مسیر صفحه" className="text-sm text-gray-500 mb-6">
              <Link href="/blog" className="hover:text-sky-600">
                بلاگ
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{post.category}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="text-sky-600 font-medium">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readingTime} مطالعه</span>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Figure
            src={post.cover}
            alt={`تصویر شاخص ${post.title}`}
            placeholder={`جای تصویر شاخص — public/images/blog/${post.slug}.jpg`}
            className="aspect-[16/9] rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium">
            {post.excerpt}
          </p>
          <div className="space-y-6">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-gray-600 leading-loose">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-sky-200 bg-sky-50 p-6">
            <h2 className="text-lg font-black text-gray-900 mb-2">
              می‌خواهید این‌ها را در کلینیک خودتان پیاده کنید؟
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              در یک جلسه‌ی دمو نشان می‌دهیم مدیلینک کدام بخش را برای شما خودکار
              می‌کند.
            </p>
            <Link
              href="/contact"
              className="inline-block gradient-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
            >
              درخواست دمو رایگان
            </Link>
          </div>
        </div>
      </article>

      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            مطالب مرتبط
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-xs text-sky-600 font-medium">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-2 mb-2 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCta />
    </main>
  );
}
