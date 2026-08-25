import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteUrl } from "./lib/site";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

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
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
