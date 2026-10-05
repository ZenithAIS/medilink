import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteUrl, contact, socials } from "./lib/site";
import SiteChrome from "./components/SiteChrome";
import GtmFallback from "./components/GtmFallback";
import { GTM_ID, GTM_HEAD_SNIPPET } from "./lib/gtm";

// Google Tag Manager: قطعه‌ی رسمی در app/lib/gtm.ts. عمداً <script> ساده‌ی درون <head> است، نه next/script:
// next/script با strategy="afterInteractive" فقط بعد از Hydration در مرورگر تزریق می‌شود (در HTMLِ خام اصلاً <script>
// نیست و ابزارهای تأیید/Tag Assistant آن را نمی‌بینند)، و با "beforeInteractive" هم بدنه در صفِ __next_s می‌نشیند و
// دیرتر اجرا می‌شود. این لایه‌ی ریشه برای «همه‌ی» مسیرها یک بار رندر می‌شود (admin و not-found هم زیر همین layout
// هستند)، پس GTM هیچ‌جا دوبار بارگذاری نمی‌شود.

// Shabnam نسخه‌ی Black ندارد؛ فایل Bold برای وزن ۹۰۰ هم اعلام می‌شود تا
// مرورگر به‌جای ضخیم‌سازی مصنوعی (که در فارسی بد رندر می‌شود) از گلیف واقعی
// استفاده کند. یعنی font-black و font-bold یک شکل دیده می‌شوند.
const shabnam = localFont({
  src: [
    { path: "./fonts/Shabnam-Thin.woff2", weight: "100", style: "normal" },
    { path: "./fonts/Shabnam-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Shabnam.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Shabnam-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Shabnam-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Shabnam-Bold.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-shabnam",
});

const title =
  "مدیلینک | سیستم‌های هوش مصنوعی و اتوماسیون کلینیکی و پزشکی";
const description =
  "کلینیک شما را هوشمند می‌کنیم — از پذیرش تا پیگیری بیمار، با هوش مصنوعی. سامانه‌ی مدیریت کلینیک، نوبت‌دهی خودکار، ربات پاسخ‌گو و گزارش‌های هوشمند.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "هوش مصنوعی پزشکی",
    "اتوماسیون کلینیک",
    "نرم‌افزار مدیریت کلینیک",
    "نوبت‌دهی آنلاین کلینیک",
    "ربات پاسخ‌گوی بیمار",
    "مدیلینک",
  ],
  alternates: { canonical: "/" },
  verification: {
    google: [
      "sEkBpXcec5SVNzDMLkFdpjy6IOXIiZJFA59WAhzFIKs",
      "SQ4XYORRgu5JnZH0C1-BWfXHMnC4hMVecG83IHxt2ys",
      "lODv7Apso_g1A021qPZXSn1S9znUnQKfguOWZcOPyEo",
    ],
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: "مدیلینک",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f2793f",
};

/* اسکیمای سازمان و نرم‌افزار — بند ۶ بریف. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "مدیلینک",
      url: siteUrl,
      description,
      areaServed: "IR",
      email: contact.email,
      sameAs: socials.map((s) => s.href),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: contact.phoneHref.replace("tel:", ""),
        email: contact.email,
        availableLanguage: ["fa"],
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "مدیلینک",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "fa-IR",
      description,
      publisher: { "@id": `${siteUrl}#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={shabnam.variable}>
      <head>
        {/* Google Tag Manager — head (دستور رسمی گوگل: تا حد امکان بالای head) */}
        <script id="gtm-script" dangerouslySetInnerHTML={{ __html: GTM_HEAD_SNIPPET }} />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) — فوراً بعد از بازشدنِ body */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <SiteChrome>{children}</SiteChrome>
        <GtmFallback />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
