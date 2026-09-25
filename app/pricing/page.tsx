import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import Accordion from "@/app/components/Accordion";
import Reveal from "@/app/components/Reveal";
import { pricingFaqs } from "@/app/lib/pricing";
import { packages, isBuyable, formatToman } from "@/app/lib/packages";

export const metadata: Metadata = {
  title: "تعرفه‌ها و خرید آنلاین | مدیلینک",
  description:
    "تعرفه‌ی اتوماسیون مطب، طراحی سایت و سئوی پزشکی مدیلینک — با پرداخت آنلاین و امن از طریق زرین‌پال.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main>
      <PageHero
        badge="تعرفه‌ها"
        title="هر بخش را جداگانه"
        highlight="سفارش بدهید"
        description="قیمت‌ها بدون احتساب مالیات بر ارزش افزوده است. خرید آنلاین و امن از طریق درگاه زرین‌پال."
      />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {packages.map((pkg, pkgIndex) => (
            <Reveal key={pkg.key} delay={pkgIndex * 80}>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2 className="text-3xl font-black text-ink-900">{pkg.title}</h2>
                {pkg.relatedHref && (
                  <Link
                    href={pkg.relatedHref}
                    className="text-sm text-brand-600 hover:underline shrink-0"
                  >
                    جزئیات بیشتر ←
                  </Link>
                )}
              </div>
              {pkg.note && (
                <p className="text-sm text-ink-400 mb-6 leading-relaxed">{pkg.note}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pkg.tiers.map((tier) => (
                  <div
                    key={tier.key}
                    className="rounded-2xl p-8 flex flex-col h-full border border-cream-300 bg-white shadow-sm"
                  >
                    <h3 className="text-lg font-black text-ink-900 mb-2">{tier.label}</h3>
                    {tier.description && (
                      <p className="text-sm text-ink-400 leading-relaxed mb-4 grow">
                        {tier.description}
                      </p>
                    )}
                    <div className="mb-6 mt-auto">
                      {isBuyable(tier) ? (
                        <>
                          <div className="text-2xl font-black gradient-text">
                            {tier.priceNote ?? formatToman(tier.amountToman)}
                          </div>
                          <div className="text-xs text-ink-400 mt-1">
                            {tier.billing === "monthly" ? "ماهانه" : "پرداخت یک‌باره"}
                          </div>
                        </>
                      ) : (
                        <div className="text-xl font-black text-ink-700">
                          {tier.priceNote ?? "استعلام قیمت"}
                        </div>
                      )}
                    </div>
                    {isBuyable(tier) ? (
                      <Link
                        href={`/checkout?package=${pkg.key}&tier=${tier.key}`}
                        className="block text-center py-3 rounded-xl font-bold gradient-primary text-white hover:opacity-90 shadow-md transition-opacity"
                      >
                        خرید آنلاین
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="block text-center py-3 rounded-xl font-bold border-2 border-cream-300 text-ink-700 hover:border-brand-300 hover:text-brand-600 transition-colors"
                      >
                        درخواست استعلام
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ تعرفه */}
      <section className="py-24 bg-cream-100 border-t border-cream-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-ink-900 mb-10 text-center">
            پرسش‌های مالی رایج
          </h2>
          <Reveal>
            <Accordion items={pricingFaqs} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
