import { siteUrl } from "./site";

// BreadcrumbList + WebPage برای هر مسیر (سرور هم رندر می‌کند، پس در HTML خام هست).
const LABELS: Record<string, string> = {
  about: "درباره ما",
  blog: "وبلاگ",
  checkout: "پرداخت",
  clients: "مشتریان",
  contact: "تماس با ما",
  faq: "سوالات متداول",
  pricing: "تعرفه‌ها",
  privacy: "حریم خصوصی",
  products: "محصولات",
  services: "خدمات",
  terms: "قوانین و شرایط",
};

/**
 * نامِ یک قطعه‌ی مسیر. قطعه‌ی URL را «مهاجم» تعیین می‌کند (هر مسیرِ دلخواه، حتی 404، در همین schema رندر می‌شود)، پس:
 * decode ایمن (رشته‌ی %-ناقص خطا نمی‌دهد)، حذف کاراکترهای کنترلی، سقفِ طول، و جست‌وجوی برچسب فقط در کلیدهای خودِ LABELS
 * (نه `constructor`/`__proto__`). امنیتِ تزریق به <script> را serializeJsonLd تضمین می‌کند، نه این تابع.
 */
function segmentName(segment: string): string {
  if (Object.prototype.hasOwnProperty.call(LABELS, segment)) return LABELS[segment];
  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    // %-ناقص: همان رشته‌ی خام
  }
  const clean = decoded.replace(/[\u0000-\u001f\u007f]/g, "").replace(/-/g, " ").trim().slice(0, 80);
  return clean || "صفحه";
}

export function pageSchema(path: string) {
  const segs = path.split("/").filter(Boolean);
  const crumbs = [{ name: "مدیلینک", url: siteUrl }];
  let acc = "";
  for (const s of segs) {
    acc += "/" + s;
    crumbs.push({ name: segmentName(s), url: siteUrl + acc });
  }
  const url = siteUrl + (path === "/" ? "" : path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: crumbs[crumbs.length - 1].name,
        inLanguage: "fa-IR",
        isPartOf: { "@id": `${siteUrl}#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.url,
        })),
      },
    ],
  };
}
