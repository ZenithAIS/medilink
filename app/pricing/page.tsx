import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import Accordion from "@/app/components/Accordion";
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
    return <span className="text-sm text-gray-700">{value}</span>;
  }
  return value ? (
    <>
      <span aria-hidden className="text-sky-600 font-black">
        ✓
      </span>
      <span className="sr-only">دارد</span>
    </>
  ) : (
    <>
      <span aria-hidden className="text-gray-300 font-black">
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
        title="تعرفه‌ی شفاف،"
        highlight="بدون هزینه‌ی پنهان"
        description="پلن‌ها ماهانه‌اند و هر زمان قابل ارتقا، تنزل یا لغو هستند. راه‌اندازی پایه در همه‌ی پلن‌ها رایگان است."
      />

      {/* کارت پلن‌ها */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col h-full ${
                  plan.featured
                    ? "border-2 border-sky-500 shadow-xl relative bg-white"
                    : "border border-gray-200 bg-white shadow-sm"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 right-8 gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    پرطرفدار
                  </span>
                )}
                <h2 className="text-xl font-black text-gray-900 mb-2">
                  {plan.name}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {plan.summary}
                </p>
                <div className="mb-6">
                  <div className="text-3xl font-black gradient-text">
                    {plan.price}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {plan.period}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-sky-500"
                      ></span>
                      <span className="text-sm text-gray-600 leading-relaxed">
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
                      : "border-2 border-gray-200 text-gray-700 hover:border-sky-400 hover:text-sky-600"
                  }`}
                >
                  {plan.price === "تماس بگیرید"
                    ? "درخواست مشاوره"
                    : "انتخاب پلن"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* جدول مقایسه */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">
            مقایسه‌ی امکانات
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] text-right">
              <caption className="sr-only">
                جدول مقایسه‌ی امکانات پلن‌های مدیلینک
              </caption>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th scope="col" className="p-4 text-sm font-bold text-gray-900">
                    امکانات
                  </th>
                  <th scope="col" className="p-4 text-sm font-bold text-gray-900 text-center">
                    پایه
                  </th>
                  <th scope="col" className="p-4 text-sm font-bold text-sky-600 text-center">
                    حرفه‌ای
                  </th>
                  <th scope="col" className="p-4 text-sm font-bold text-gray-900 text-center">
                    ویژه
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparison.map((row) => (
                  <tr key={row.feature}>
                    <th
                      scope="row"
                      className="p-4 text-sm font-medium text-gray-700 text-right"
                    >
                      {row.feature}
                    </th>
                    <td className="p-4 text-center">
                      <Cell value={row.basic} />
                    </td>
                    <td className="p-4 text-center bg-sky-50/40">
                      <Cell value={row.pro} />
                    </td>
                    <td className="p-4 text-center">
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
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">
            خدمات افزودنی
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <div
                key={addon.title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {addon.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ تعرفه */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">
            پرسش‌های مالی رایج
          </h2>
          <Accordion items={pricingFaqs} />
        </div>
      </section>
    </main>
  );
}
