"use client";

import { usePathname } from "next/navigation";
import { siteUrl } from "../lib/site";

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

export default function PageSchema() {
  const path = usePathname() || "/";
  if (path.startsWith("/admin")) return null;
  const segs = path.split("/").filter(Boolean);
  const crumbs = [{ name: "مدیلینک", url: siteUrl }];
  let acc = "";
  for (const s of segs) {
    acc += "/" + s;
    crumbs.push({
      name: LABELS[s] ?? decodeURIComponent(s).replace(/-/g, " "),
      url: siteUrl + acc,
    });
  }
  const url = siteUrl + (path === "/" ? "" : path);
  const data = {
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
