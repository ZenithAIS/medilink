import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import FinalCta from "@/app/components/FinalCta";
import { services } from "@/app/lib/services";
import Reveal from "@/app/components/Reveal";

export const metadata: Metadata = {
  title: "خدمات مدیلینک | سئوی پزشکی و طراحی سایت هوشمند",
  description:
    "فراتر از پنل مدیریت کلینیک: سئوی تخصصی سایت‌های پزشکی و طراحی سایت هوشمند متصل به هوش مصنوعی برای کلینیک و مطب شما.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        badge="خدمات مدیلینک"
        title="حضور آنلاین کلینیک شما"
        highlight="فراتر از یک پنل مدیریت"
        description="مدیلینک علاوه بر پنل مدیریت کلینیک، به رشد و دیده‌شدن آنلاین شما هم کمک می‌کند."
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ slug, title, tagline, description, Icon }, i) => (
              <Reveal key={slug} delay={i * 80}>
                <Link
                  href={`/services/${slug}`}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-ink-900 mb-4">
            پنل مدیریت کلینیک را هم می‌خواهید؟
          </h2>
          <p className="text-ink-400 text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            این خدمات مستقل از پنل مدیریت کلینیک ارائه می‌شوند و می‌توانید هرکدام را جدا یا در کنار هم سفارش دهید.
          </p>
          <Link
            href="/products"
            className="inline-block border-2 border-cream-300 text-ink-700 px-8 py-3 rounded-xl text-sm font-bold hover:border-brand-300 hover:text-brand-600 transition-all"
          >
            مشاهده‌ی پنل مدیریت کلینیک
          </Link>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
