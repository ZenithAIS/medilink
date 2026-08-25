import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import Figure from "@/app/components/Figure";
import FinalCta from "@/app/components/FinalCta";
import { IconShield, IconChart, IconChat, IconClock } from "@/app/components/Icons";

export const metadata: Metadata = {
  title: "درباره‌ی ما | مدیلینک",
  description:
    "مدیلینک تیمی از مهندسان نرم‌افزار و متخصصان حوزه‌ی سلامت است که سیستم‌های هوش مصنوعی و اتوماسیون برای کلینیک‌ها می‌سازد.",
  alternates: { canonical: "/about" },
};

/* TODO(content): داستان، تایم‌لاین و اعضای تیم ساختگی‌اند و باید با اطلاعات واقعی جایگزین شوند. */
const timeline = [
  {
    year: "۱۴۰۲",
    title: "شروع از یک مشکل واقعی",
    body: "بنیان‌گذاران مدیلینک در پروژه‌ای برای یک کلینیک پوست دیدند که بیش از نیمی از وقت منشی صرف کارهای تکراری می‌شود.",
  },
  {
    year: "۱۴۰۳",
    title: "اولین نسخه‌ی سامانه",
    body: "سامانه‌ی مدیریت کلینیک و نوبت‌دهی خودکار در سه کلینیک همکار پیاده‌سازی و آزمایش شد.",
  },
  {
    year: "۱۴۰۴",
    title: "افزوده شدن هوش مصنوعی",
    body: "ربات پاسخ‌گوی هوشمند و اتوماسیون پیگیری بیمار به مجموعه‌ی محصولات اضافه شد.",
  },
  {
    year: "۱۴۰۵",
    title: "بیش از ۱۰۰ کلینیک فعال",
    body: "مدیلینک امروز در کلینیک‌های پوست، دندانپزشکی، چشم‌پزشکی و پلی‌کلینیک‌های چندشعبه‌ای استفاده می‌شود.",
  },
];

const values = [
  {
    Icon: IconShield,
    title: "محرمانگی، پیش‌فرض نه گزینه",
    description:
      "داده‌ی پزشکی روی سرورهای داخل کشور می‌ماند و هرگز برای آموزش مدل‌های عمومی استفاده نمی‌شود.",
  },
  {
    Icon: IconChart,
    title: "ادعا با عدد، نه شعار",
    description:
      "هر محصول شاخص‌های خودش را گزارش می‌کند تا اثرش روی کلینیک قابل سنجش باشد.",
  },
  {
    Icon: IconChat,
    title: "زبان کادر درمان",
    description:
      "محصول را با پزشک و منشی می‌سازیم، نه فقط برای آن‌ها. هر قابلیت از یک نیاز واقعی آمده است.",
  },
  {
    Icon: IconClock,
    title: "سادگی بر پیچیدگی",
    description:
      "اگر استفاده از یک قابلیت به آموزش طولانی نیاز داشته باشد، هنوز آماده نیست.",
  },
];

/** photo: مسیر عکس در public/images/team/ — مثلاً "/images/team/ceo.jpg" */
const team: { name: string; role: string; photo?: string }[] = [
  { name: "نام و نام خانوادگی", role: "مدیرعامل و هم‌بنیان‌گذار" },
  { name: "نام و نام خانوادگی", role: "مدیر فنی" },
  { name: "نام و نام خانوادگی", role: "مدیر محصول" },
  { name: "نام و نام خانوادگی", role: "مدیر موفقیت مشتری" },
];

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
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            داستان ما
          </h2>
          <ol className="max-w-3xl mx-auto space-y-8">
            {timeline.map((item) => (
              <li key={item.year} className="flex gap-6">
                <div className="shrink-0 w-16 text-left">
                  <span className="text-lg font-black gradient-text">
                    {item.year}
                  </span>
                </div>
                <div className="border-r-2 border-gray-100 ps-0 pe-6 pb-2">
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            ارزش‌های ما
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
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

      {/* تیم */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            تیم مدیلینک
          </h2>
          <p className="text-gray-500 text-center mb-12 text-sm">
            ترکیبی از مهندسی نرم‌افزار، هوش مصنوعی و تجربه‌ی مدیریت کلینیک.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <Figure
                  src={member.photo}
                  alt={`عکس ${member.role}`}
                  placeholder="جای عکس پرتره"
                  className="aspect-square rounded-2xl border border-gray-200 mb-3"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="font-bold text-gray-900 text-sm">
                  {member.name}
                </div>
                <div className="text-gray-500 text-xs mt-0.5">
                  {member.role}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-12">
            <Link
              href="/contact"
              className="text-sky-600 font-bold text-sm hover:underline"
            >
              علاقه‌مند به همکاری با ما هستید؟
            </Link>
          </p>
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
