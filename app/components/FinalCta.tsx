import Link from "next/link";
import Reveal from "./Reveal";
import { trialUrl } from "@/app/lib/site";

export default function FinalCta({
  title = "۱۴ روز رایگان، روی کلینیک خودتان",
  description = "بدون پرداخت و بدون تعهد ثبت‌نام کنید و پنل را با بیماران و نوبت‌های واقعی خودتان امتحان کنید. ترجیح می‌دهید اول ببینید؟ یک جلسه‌ی دموی ۳۰ دقیقه‌ای رزرو کنید.",
  cta = "درخواست دمو",
}: {
  title?: string;
  description?: string;
  cta?: string;
}) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          className="relative overflow-hidden rounded-3xl gradient-primary px-8 py-14 text-center text-white"
        >
          <span
            aria-hidden
            className="animate-float-slow absolute -left-10 -top-10 h-52 w-52 rounded-full bg-white/12"
          ></span>
          <span
            aria-hidden
            className="animate-float-slow absolute -bottom-16 left-16 h-40 w-40 rounded-full bg-white/8"
            style={{ animationDelay: "2s" }}
          ></span>

          <h2 className="relative text-4xl md:text-5xl font-black mb-4">
            {title}
          </h2>
          <p className="relative text-white/85 max-w-xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={trialUrl}
              className="inline-block bg-white text-brand-700 px-8 py-4 rounded-xl text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-brand-50"
            >
              شروع ۱۴ روز رایگان
            </a>
            <Link
              href="/contact"
              className="inline-block border-2 border-white/60 text-white px-8 py-4 rounded-xl text-base font-bold transition-colors hover:bg-white/10"
            >
              {cta}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
