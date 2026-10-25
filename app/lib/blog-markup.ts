import type { Post } from "./blog";

/**
 * منطقِ خالصِ رندرِ مقاله (بدون React) تا آزمون‌پذیر باشد. متنِ مقاله از پنل ادمین/DB می‌آید و «غیرقابل‌اعتماد» فرض می‌شود.
 */

export type LinkTarget = { local: boolean; href: string };

const SITE_HOSTS = new Set(["medilinkapp.online", "www.medilinkapp.online"]);

/**
 * فقط دو شکلِ لینک مجاز است: مسیرِ داخلیِ تک‌اسلش («/x») یا https. هر چیز دیگر (javascript:، data:، `//host`، `/\host`، http:،
 * userinfo، رشته‌ی خراب) null است و فقط برچسبِ متن نشان داده می‌شود. تشخیصِ «داخلی» با میزبانِ دقیق (نه startsWith) انجام می‌شود،
 * پس `https://medilinkapp.online.evil.com` داخلی حساب نمی‌شود.
 */
export function classifyHref(raw: string): LinkTarget | null {
  const href = raw.trim();
  if (href.startsWith("/")) {
    if (href.startsWith("//") || href.startsWith("/\\") || /[\u0000-\u001f\u007f\\]/.test(href)) return null;
    return { local: true, href };
  }
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password) return null;
  if (SITE_HOSTS.has(url.hostname)) return { local: true, href: url.pathname + url.search + url.hash || "/" };
  return { local: false, href: url.toString() };
}

/** آدرسِ تصویرِ مقاله: همان قاعده‌ی لینک (مسیر داخلی یا https)؛ در غیر این صورت null و تصویر رندر نمی‌شود. */
export function safeImageSrc(raw: string): string | null {
  const target = classifyHref(raw);
  return target ? target.href : null;
}

/** متن ساده برای اسکیما: لینک‌ها و علامت پررنگ حذف می‌شوند. */
export function plain(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*\*/g, "");
}

// سؤال‌های بخش «سوالات متداول» (تیترهای ### بعد از آن) برای FAQPage استخراج می‌شوند.
export function articleSchema(post: Post) {
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
          acceptedAnswer: { "@type": "Answer", text: plain(next) },
        });
      }
    }
    if (faq.length) graph.push({ "@type": "FAQPage", mainEntity: faq });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
