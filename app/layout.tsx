import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مدیلینک | دیجیتال مارکتینگ تخصصی کلینیک‌های زیبایی",
  description:
    "مدیلینک یک تیم دیجیتال مارکتینگ تخصصی برای کلینیک‌های زیبایی و درمانی است.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
