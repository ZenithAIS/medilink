import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import Accordion from "@/app/components/Accordion";
import Reveal from "@/app/components/Reveal";
import {
  plans,
  comparison,
  addons,
  pricingFaqs,
  type ComparisonRow,
} from "@/app/lib/pricing";

export const metadata: Metadata = {
  title: "تعرفه‌ها و پلن‌ها | مدیلینک",
  description:
    "پلن‌های ماهانه‌ی مدیلینک برای مطب‌ها، کلینیک‌های تخصصی و مجموعه‌های چندشعبه‌ای. بدون قرارداد حداقل مدت.",
  alternates: { canonical: "/pricing" },
};

function Cell({ value }: { value: ComparisonRow["basic"] }) {
  if (typeof value === "string") {
    return <span className="text-sm text-ink-700">{value}</span>;
  }
  return value ? (
    <>
      <span aria-hidden className="text-brand-600 font-black">
        ✓
      </span>
      <span className="sr-only">دارد</span>
    </>
  ) : (
    <>
      <span aria-hidden className="text-ink-400 font-black">
        ×
      </span>
      <span className="sr-only">ندارد</span>
    </>
  );
}

export default function PricingPage() {
  return (
    <main>
      <PageHero
        badge="تعرفه‌ها"
        title="تعرفه‌ی متناسب"
        highlight="با اندازه‌ی کلینیک شما"
        description="پلن‌ها ماهانه‌اند و هر زمان قابل ارتقا، تنزل یا لغو هستند. تعرفه بر اساس تعداد شعبه و حجم پیام محاسبه و در جلسه‌ی دمو مکتوب اعلام می‌شود."
      />

      {/* کارت پلن‌ها */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <Reveal
                key={plan.name}
                delay={i * 100}
                className={`rounded-2xl p-8 flex flex-col h-full ${
                  plan.featured
                    ? "border-2 border-brand-400 shadow-xl relative bg-white"
                    : "border border-cream-300 bg-white shadow-sm"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 right-8 gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    پرطرفدار
                  </span>
                )}
                <h2 className="text-2xl font-black text-ink-900 mb-2">
                  {plan.name}
                </h2>
                <p className="text-sm text-ink-400 leading-relaxed mb-6">
                  {plan.summary}
                </p>
                <div className="mb-6">
                  <div className="text-3xl font-black gradient-text">
                    {plan.price}
                  </div>
                  <div className="text-xs text-ink-400 mt-1">
                    {plan.period}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-brand-400"
                      ></span>
                      <span className="text-sm text-ink-700 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-xl font-bold transition-opacity ${
                    plan.featured
                      ? "gradient-primary text-white hover:opacity-90 shadow-md"
                      : "border-2 border-cream-300 text-ink-700 hover:border-brand-300 hover:text-brand-600"
                  }`}
                >
                  دریافت تعرفه
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* جدول مقایسه */}
      <section className="py-24 bg-cream-100 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-ink-900 mb-10 text-center">
            مقایسه‌ی امکانات
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-cream-300 bg-white">
            <table className="w-full md:min-w-[640px] text-right">
              <caption className="sr-only">
                جدول مقایسه‌ی امکانات پلن‌های مدیلینک
              </caption>
              <thead>
                <tr className="border-b border-cream-300 bg-cream-100">
                  <th scope="col" className="p-2 md:p-4 text-xs md:text-sm font-bold text-ink-900">
                    امکانات
                  </th>
                  <th scope="col" className="p-2 md:p-4 text-xs md:text-sm font-bold text-ink-900 text-center">
                    پایه
                  </th>
                  <th scope="col" className="p-2 md:p-4 text-xs md:text-sm font-bold text-brand-600 text-center">
                    حرفه‌ای
                  </th>
                  <th scope="col" className="p-2 md:p-4 text-xs md:text-sm font-bold text-ink-900 text-center">
                    ویژه
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {comparison.map((row) => (
                  <tr key={row.feature}>
                    <th
                      scope="row"
                      className="p-2 md:p-4 text-xs md:text-sm font-medium text-ink-700 text-right"
                    >
                      {row.feature}
                    </th>
                    <td className="p-2 md:p-4 text-center">
                      <Cell value={row.basic} />
                    </td>
                    <td className="p-2 md:p-4 text-center bg-brand-50/40">
                      <Cell value={row.pro} />
                    </td>
                    <td className="p-2 md:p-4 text-center">
                      <Cell value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* افزودنی‌ها */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-ink-900 mb-10 text-center">
            خدمات افزودنی
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addons.map((addon, i) => (
              <Reveal
                key={addon.title}
                delay={i * 80}
                className="bg-cream-100 rounded-2xl p-6 border border-cream-200"
              >
                <h3 className="text-base font-bold text-ink-900 mb-2">
                  {addon.title}
                </h3>
                <p className="text-ink-400 text-sm leading-relaxed">
                  {addon.description}
                </p>
              </Reveal>
            ))}
          </div>
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
