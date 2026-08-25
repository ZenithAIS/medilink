import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import FinalCta from "@/app/components/FinalCta";
import { products } from "@/app/lib/products";
import { IconShield, IconClock, IconChart } from "@/app/components/Icons";

export const metadata: Metadata = {
  title: "محصولات و خدمات | مدیلینک",
  description:
    "پنج سیستم هوش مصنوعی و اتوماسیون برای کلینیک‌ها: مدیریت کلینیک، نوبت‌دهی خودکار، ربات پاسخ‌گو، اتوماسیون پیامک و گزارش‌های هوشمند.",
  alternates: { canonical: "/products" },
};

const advantages = [
  {
    Icon: IconShield,
    title: "ساخته‌شده برای فضای پزشکی",
    description:
      "دسترسی مبتنی بر نقش، نگهداری داده روی سرورهای داخل کشور و رعایت محرمانگی پرونده‌ی بیمار.",
  },
  {
    Icon: IconClock,
    title: "راه‌اندازی در کمتر از یک روز",
    description:
      "بدون توقف کار کلینیک و بدون نیاز به کنار گذاشتن نرم‌افزار فعلی شما.",
  },
  {
    Icon: IconChart,
    title: "نتیجه‌ی قابل اندازه‌گیری",
    description:
      "هر محصول شاخص‌های خودش را گزارش می‌کند تا اثر آن روی کلینیک شفاف باشد.",
  },
];

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        badge="محصولات ما"
        title="پنج سیستم هوشمند"
        highlight="برای کل مسیر بیمار"
        description="هر محصول به‌تنهایی کار می‌کند و کنار هم یک کلینیک کاملاً خودکار می‌سازد."
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(({ slug, title, tagline, description, Icon }) => (
              <Link
                key={slug}
                href={`/products/${slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-50 to-teal-50 text-sky-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-sky-600 mb-1">
                  {tagline}
                </span>
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed grow">
                  {description}
                </p>
                <span className="mt-4 text-sky-600 font-bold text-sm group-hover:underline">
                  جزئیات بیشتر
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
            چرا مدیلینک؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map(({ Icon, title, description }) => (
              <div key={title} className="text-center md:text-right">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-sky-600 flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
