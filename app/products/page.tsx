import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import FinalCta from "@/app/components/FinalCta";
import { products } from "@/app/lib/products";
import { IconShield, IconClock, IconChart } from "@/app/components/Icons";
import Reveal from "@/app/components/Reveal";

export const metadata: Metadata = {
  title: "محصولات و خدمات | مدیلینک",
  description:
    "پنج سیستم هوش مصنوعی و اتوماسیون برای کلینیک‌ها: مدیریت کلینیک، نوبت‌دهی خودکار، ربات پاسخ‌گو، اتوماسیون پیامک و گزارش‌های هوشمند.",
  alternates: { canonical: "/products" },
};

const advantages = [
  {
    Icon: IconShield,
    tone: "bg-brand-50 text-brand-600",
    title: "ساخته‌شده برای فضای پزشکی",
    description:
      "دسترسی مبتنی بر نقش، نگهداری داده روی سرورهای داخل کشور و رعایت محرمانگی پرونده‌ی بیمار.",
  },
  {
    Icon: IconClock,
    tone: "bg-good-50 text-good-600",
    title: "راه‌اندازی در کمتر از یک روز",
    description:
      "بدون توقف کار کلینیک و بدون نیاز به کنار گذاشتن نرم‌افزار فعلی شما.",
  },
  {
    Icon: IconChart,
    tone: "bg-violet-50 text-violet-500",
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
            {products.map(({ slug, title, tagline, description, Icon }, i) => (
              <Reveal key={slug} delay={i * 80}>
                <Link
                  href={`/products/${slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-cream-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-violet-50 text-brand-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-brand-600 mb-1">
                    {tagline}
                  </span>
                  <h2 className="text-lg font-bold text-ink-900 mb-2">
                    {title}
                  </h2>
                  <p className="text-ink-400 text-sm leading-relaxed grow">
                    {description}
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-bold text-brand-600">
                    جزئیات بیشتر
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">
                      ←
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream-100 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-ink-900 mb-12 text-center">
            چرا مدیلینک؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map(({ Icon, title, description, tone }, i) => (
              <Reveal
                key={title}
                delay={i * 100}
                className="group text-center md:text-right"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0 transition-transform duration-300 group-hover:scale-110 ${tone}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">
                  {title}
                </h3>
                <p className="text-ink-400 text-sm leading-relaxed">
                  {description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
