import type { Metadata } from "next";
import { LossCalculator } from "./LossCalculator";

// صفحه‌ی عمومیِ «ماشین‌حسابِ ضررِ نیامدنِ بیمار» برای فروش؛ هیچ داده‌ای ذخیره یا به سرور ارسال نمی‌شود.
export const metadata: Metadata = {
  title: "ماشین‌حساب ضرر نیامدن بیمار | مدیلینک",
  description: "حساب کنید کلینیک شما ماهانه چقدر از نیامدن بیمار و رهاکردن دوره‌ی درمان ضرر می‌کند.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-cream-100 px-4 py-10">
      <div className="mx-auto max-w-[640px]">
        <p className="m-0 text-xs font-extrabold tracking-wide text-brand-500">مدیلینک</p>
        <h1 className="mt-2 mb-3 text-2xl font-extrabold text-ink-900">
          کلینیک شما ماهی چقدر از نیامدن بیمار ضرر می‌کند؟
        </h1>
        <p className="mt-0 mb-6 text-sm leading-7 text-ink-400">
          سه عدد را وارد کنید. حساب فقط در مرورگر شما انجام می‌شود و هیچ اطلاعاتی ذخیره نمی‌شود.
        </p>
        <LossCalculator />
      </div>
    </main>
  );
}
