import Link from "next/link";
import LogoMark from "./components/LogoMark";

/**
 * صفحه‌ی ۴۰۴ برندشده. تا پیش از این، سایت صفحه‌ی خطای پیش‌فرض و
 * بی‌طرح Next.js را نشان می‌داد.
 *
 * چون داخل app/layout.tsx رندر می‌شود، هدر و فوتر سایت را هم دارد —
 * کاربر گم‌شده حداقل ناوبری کامل جلوی چشمش می‌ماند.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <div className="text-center">
        <LogoMark className="mx-auto mb-6 h-14 w-14" />
        <p className="gradient-text text-6xl font-black">۴۰۴</p>
        <h1 className="mt-4 text-2xl font-black text-ink-900">
          این صفحه پیدا نشد
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-400">
          آدرسی که دنبالش بودید یا جابه‌جا شده یا هرگز وجود نداشته است.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="gradient-primary rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-opacity hover:opacity-90"
          >
            بازگشت به خانه
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border-2 border-cream-300 px-6 py-3 text-sm font-bold text-ink-700 transition-all hover:border-brand-300 hover:text-brand-600"
          >
            تماس با ما
          </Link>
        </div>
      </div>
    </main>
  );
}
