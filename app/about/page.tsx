import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import FinalCta from "@/app/components/FinalCta";
import { IconShield, IconChart, IconChat, IconClock } from "@/app/components/Icons";
import Reveal from "@/app/components/Reveal";

export const metadata: Metadata = {
  title: "درباره‌ی ما | مدیلینک",
  description:
    "مدیلینک تیمی از مهندسان نرم‌افزار و متخصصان حوزه‌ی سلامت است که سیستم‌های هوش مصنوعی و اتوماسیون برای کلینیک‌ها می‌سازد.",
  alternates: { canonical: "/about" },
};

/*
 * تایم‌لاین «۱۴۰۲ تا ۱۴۰۵» و نام اعضای تیم پیش‌تر اینجا ساختگی بودند.
 * داستان شرکت جعلی، ساده‌ترین چیزی است که مخاطب می‌تواند راستی‌آزمایی
 * کند و اعتماد را از بین می‌برد. تا زمان تأمین متن و عکس واقعی، صفحه
 * درباره‌ی رویکرد و ماموریت است — چیزی که همین حالا راست است.
 */
const approach = [
  {
    title: "از یک درد مشخص شروع می‌کنیم",
    body: "به‌جای خودکار کردن همه‌چیز، اول پیدا می‌کنیم بیشترین زمان تیم شما کجا هدر می‌رود و همان را حل می‌کنیم.",
  },
  {
    title: "کنار سیستم فعلی می‌نشینیم",
    body: "قرار نیست کلینیک کارش را متوقف کند تا سیستم عوض شود. مدیلینک در کنار نرم‌افزار موجود شما کار می‌کند.",
  },
  {
    title: "با کادر درمان می‌سازیم",
    body: "هر قابلیت از یک نیاز واقعی پزشک یا منشی آمده است، نه از فهرست ویژگی‌های رقبا.",
  },
  {
    title: "نتیجه را قابل سنجش می‌کنیم",
    body: "شاخص‌ها از روز اول ثبت می‌شوند تا خودتان ببینید چه چیزی تغییر کرده و چه چیزی نه.",
  },
];

const values = [
  {
    Icon: IconShield,
    tone: "bg-brand-50 text-brand-600",
    title: "محرمانگی، پیش‌فرض نه گزینه",
    description:
      "داده‌ی پزشکی روی سرورهای داخل کشور می‌ماند و هرگز برای آموزش مدل‌های عمومی استفاده نمی‌شود.",
  },
  {
    Icon: IconChart,
    tone: "bg-good-50 text-good-600",
    title: "ادعا با عدد، نه شعار",
    description:
      "هر محصول شاخص‌های خودش را گزارش می‌کند تا اثرش روی کلینیک قابل سنجش باشد.",
  },
  {
    Icon: IconChat,
    tone: "bg-violet-50 text-violet-500",
    title: "زبان کادر درمان",
    description:
      "محصول را با پزشک و منشی می‌سازیم، نه فقط برای آن‌ها. هر قابلیت از یک نیاز واقعی آمده است.",
  },
  {
    Icon: IconClock,
    tone: "bg-cool-50 text-cool-500",
    title: "سادگی بر پیچیدگی",
    description:
      "اگر استفاده از یک قابلیت به آموزش طولانی نیاز داشته باشد، هنوز آماده نیست.",
  },
];

/*
 * بخش «تیم» موقتاً حذف شده است: چهار کارت با نام «نام و نام خانوادگی» و
 * عکس خالی، بدتر از نبودِ این بخش است. برای بازگرداندن، نام و عکس واقعی
 * اعضا را در public/images/team/ بگذارید و این سکشن را دوباره اضافه کنید.
 */

export default function AboutPage() {
  return (
    <main>
      <PageHero
        badge="درباره‌ی ما"
        title="کلینیک‌ها را از کار تکراری"
        highlight="آزاد می‌کنیم"
        description="ماموریت ما این است که کادر درمان وقتش را صرف بیمار کند، نه صرف دفتر نوبت و پیگیری تلفنی."
      />

      {/* داستان ما */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-ink-900 mb-4 text-center">
            رویکرد ما
          </h2>
          <p className="text-ink-400 text-center max-w-xl mx-auto mb-12 text-base leading-relaxed">
            چهار اصلی که هر پروژه‌ی مدیلینک بر پایه‌ی آن‌ها پیش می‌رود.
          </p>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {approach.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 90}
                className="rounded-2xl border border-cream-200 bg-cream-100 p-6"
              >
                <h3 className="text-base font-bold text-ink-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-ink-400 text-sm leading-relaxed">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="py-24 bg-cream-100 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-ink-900 mb-12 text-center">
            ارزش‌های ما
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ Icon, title, description, tone }, i) => (
              <Reveal
                key={title}
                delay={i * 90}
                className="group bg-white rounded-2xl p-6 border border-cream-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${tone}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-ink-900 mb-2">
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

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-ink-900 mb-4">
            با ما کار کنید
          </h2>
          <p className="text-ink-400 leading-relaxed mb-8">
            چه مدیر کلینیکی باشید که دنبال خودکار کردن فرآیندهایش است، چه
            متخصصی که می‌خواهد به تیم ما بپیوندد — خوشحال می‌شویم صحبت کنیم.
          </p>
          <Link
            href="/contact"
            className="inline-block gradient-primary text-white px-8 py-4 rounded-xl text-base font-bold hover:opacity-90 transition-opacity shadow-lg"
          >
            تماس با ما
          </Link>
        </div>
      </section>

      <FinalCta
        title="بیایید درباره‌ی کلینیک شما حرف بزنیم"
        description="در یک جلسه‌ی کوتاه، وضعیت فعلی کلینیک را بررسی می‌کنیم و می‌گوییم آیا مدیلینک به کار شما می‌آید یا نه."
        cta="تماس با ما"
      />
    </main>
  );
}
