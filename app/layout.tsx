import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { siteUrl, contact, socials } from "./lib/site";
import SiteChrome from "./components/SiteChrome";

const GTM_ID = "GTM-K47MTWQ7";
const GA_ID = "G-X4JM3DZVS8";

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
      <body>
        {/* Google Tag Manager — باید همین ابتدای body باشد (دستور رسمی گوگل). */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Google Analytics 4 (gtag.js) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`,
          }}
        />
        <SiteChrome>{children}</SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
