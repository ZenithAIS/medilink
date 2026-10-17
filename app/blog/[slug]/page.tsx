import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterCta from "@/app/components/NewsletterCta";
import Figure from "@/app/components/Figure";
import BlogCover from "@/app/components/BlogCover";
import Reveal from "@/app/components/Reveal";
import { getPublishedPosts, getPost, type Post } from "@/app/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

// مقاله‌های جدیدِ منتشرشده بعد از بیلد، در اولین درخواست ساخته می‌شوند (dynamicParams پیش‌فرض).
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
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

// هر بلوک متن (جداشده با خط خالی) می‌تواند تیتر «## »/«### »، لیست «- »، تصویر «![alt](url)» یا پاراگراف باشد.
function renderBlock(block: string, key: number) {
  if (block.startsWith("### ")) {
    return (
      <h3 key={key} className="text-xl font-bold text-ink-900 pt-2">
        {block.slice(4)}
      </h3>
    );
  }
  if (block.startsWith("## ")) {
    return (
      <h2 key={key} className="text-2xl font-black text-ink-900 pt-6">
        {block.slice(3)}
      </h2>
    );
  }
  const image = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={key}
        src={image[2]}
        alt={image[1]}
        width={1200}
        height={800}
        loading="lazy"
        className="w-full h-auto rounded-2xl"
      />
    );
  }
  const lines = block.split("\n");
  if (lines.every((l) => l.startsWith("- "))) {
    return (
      <ul key={key} className="list-disc pr-6 space-y-2 text-ink-700 leading-loose">
        {lines.map((l, j) => (
          <li key={j}>{l.slice(2)}</li>
        ))}
      </ul>
    );
  }
  return (
    <p key={key} className="text-ink-700 leading-loose">
      {block}
    </p>
  );
}

// سؤال‌های بخش «سوالات متداول» (تیترهای ### بعد از آن) برای FAQPage استخراج می‌شوند.
function articleSchema(post: Post) {
  const url = `https://medilinkapp.online/blog/${post.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      ...(post.cover ? { image: post.cover } : {}),
      inLanguage: "fa-IR",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "مدیلینک", url: "https://medilinkapp.online" },
      publisher: { "@type": "Organization", name: "مدیلینک", url: "https://medilinkapp.online" },
    },
  ];
  const faqStart = post.body.findIndex((b) => b.startsWith("## سوالات متداول"));
  if (faqStart >= 0) {
    const faq: Record<string, unknown>[] = [];
    for (let i = faqStart + 1; i < post.body.length && !post.body[i].startsWith("## "); i++) {
      const next = post.body[i + 1];
      if (post.body[i].startsWith("### ") && next && !next.startsWith("#")) {
        faq.push({
          "@type": "Question",
          name: post.body[i].slice(4),
          acceptedAnswer: { "@type": "Answer", text: next },
        });
      }
    }
    if (faq.length) graph.push({ "@type": "FAQPage", mainEntity: faq });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const posts = await getPublishedPosts();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <article>
        <header className="pt-32 pb-12 bg-cream-100 border-b border-cream-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="مسیر صفحه" className="text-sm text-ink-400 mb-6">
              <Link href="/blog" className="hover:text-brand-600">
                بلاگ
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink-700">{post.category}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-black text-ink-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-ink-400">
              <span className="text-brand-600 font-medium">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readingTime} مطالعه</span>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {post.cover ? (
            <Figure
              src={post.cover}
              alt={`تصویر شاخص ${post.title}`}
              placeholder=""
              className="aspect-[16/9] rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : (
            <BlogCover
              category={post.category}
              className="aspect-[16/9] w-full rounded-2xl"
            />
          )}
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-lg text-ink-700 leading-relaxed mb-8 font-medium">
            {post.excerpt}
          </p>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
          />
          <div className="space-y-6">
            {post.body.map((block, i) => renderBlock(block, i))}
          </div>

          <div className="mt-12 rounded-2xl border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-black text-ink-900 mb-2">
              می‌خواهید این‌ها را در کلینیک خودتان پیاده کنید؟
            </h2>
            <p className="text-ink-700 text-sm leading-relaxed mb-4">
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

      {related.length > 0 && (
      <section className="py-16 bg-cream-100 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-ink-900 mb-8">
            مطالب مرتبط
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="group block bg-white rounded-2xl border border-cream-300 p-5 hover:shadow-md transition-shadow"
                >
                  <span className="text-xs text-brand-600 font-medium">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-ink-900 mt-2 mb-2 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-ink-400 text-sm leading-relaxed">
                    {item.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      <NewsletterCta />
    </main>
  );
}
