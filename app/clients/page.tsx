import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import FinalCta from "@/app/components/FinalCta";
import {
  IconChart,
  IconCalendar,
  IconChat,
  IconClock,
  IconShield,
} from "@/app/components/Icons";

export const metadata: Metadata = {
  title: "نتایج و سنجش | مدیلینک",
  description:
    "چه شاخص‌هایی را برای کلینیک شما می‌سنجیم، چطور گزارش می‌دهیم، و چه زمانی مطالعه‌ی موردی منتشر می‌کنیم.",
  alternates: { canonical: "/clients" },
};

/*
 * این صفحه پیش‌تر لوگوی هشت کلینیک ساختگی و سه «داستان موفقیت» با ارقام
 * قبل/بعد نشان می‌داد که هیچ‌کدام واقعی نبودند. ادعای آماری ساختگی در
 * حوزه‌ی سلامت هم گمراه‌کننده است و هم مسئولیت حقوقی دارد.
 *
 * تا وقتی داده‌ی واقعی و رضایت کتبی مشتری در دست نیست، صفحه به چیزی
 * می‌پردازد که همین حالا راست است: اینکه چه چیزی را می‌سنجیم و چطور
 * گزارش می‌دهیم.
 */

const metrics = [
  {
    Icon: IconCalendar,
    title: "نرخ عدم‌حضور",
    body: "نسبت نوبت‌هایی که بیمار در آن‌ها حاضر نشده، پیش و پس از فعال شدن یادآوری خودکار.",
  },
  {
    Icon: IconClock,
    title: "زمان صرف‌شده‌ی تیم",
    body: "ساعت‌هایی که منشی صرف تماس، یادآوری و ثبت دستی می‌کند و چه سهمی از آن خودکار شده است.",
  },
  {
    Icon: IconChat,
    title: "پاسخ‌گویی به بیمار",
    body: "تعداد پیام‌های دریافتی، سهم پاسخ خودکار، و میانگین زمان تا اولین پاسخ.",
  },
  {
    Icon: IconChart,
    title: "بازگشت بیمار",
    body: "نسبت بیمارانی که برای درمان بعدی برمی‌گردند و فاصله‌ی میان مراجعه‌ها.",
  },
];

const method = [
  {
    step: "۱",
    title: "ثبت وضعیت پایه",
    body: "پیش از فعال‌سازی، وضعیت فعلی شاخص‌ها ثبت می‌شود. بدون نقطه‌ی شروع، هیچ ادعایی درباره‌ی بهبود معنا ندارد.",
  },
  {
    step: "۲",
    title: "اندازه‌گیری پیوسته",
    body: "شاخص‌ها از روز اول به‌صورت خودکار جمع می‌شوند، نه با تخمین یا گزارش دستی.",
  },
  {
    step: "۳",
    title: "گزارش ماهانه به خود شما",
    body: "عددها در داشبورد خودتان است. لازم نیست حرف ما را باور کنید؛ گزارش را می‌بینید.",
  },
];

export default function ClientsPage() {
  return (
    <main>
      <PageHero
        badge="نتایج و سنجش"
        title="نتیجه را"
        highlight="با عدد نشان می‌دهیم"
        description="به‌جای ادعا، شاخص‌های کلینیک شما را از روز اول می‌سنجیم و گزارش می‌دهیم."
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">
            چه چیزی را می‌سنجیم
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12 text-base leading-relaxed">
            این چهار شاخص برای بیشتر کلینیک‌ها بیشترین اثر مالی را دارند.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-sky-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            چطور می‌سنجیم
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {method.map((m) => (
              <li
                key={m.step}
                className="bg-white rounded-2xl p-6 border border-gray-200"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-lg font-black text-white">
                  {m.step}
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {m.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-sky-600">
              <IconShield className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">
              مطالعه‌ی موردی، فقط با داده‌ی واقعی
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              ترجیح می‌دهیم این صفحه فعلاً خالی از عدد باشد تا اینکه با ارقام
              ساخته‌شده پر شود. هر مطالعه‌ی موردی که اینجا منتشر شود، بر پایه‌ی
              داده‌ی اندازه‌گیری‌شده و با رضایت کتبی همان کلینیک خواهد بود.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              اگر می‌خواهید بدانید مدیلینک روی کلینیک شما چه اثری می‌گذارد، در
              جلسه‌ی دمو وضعیت فعلی‌تان را با هم بررسی می‌کنیم و صادقانه
              می‌گوییم کجا کمک می‌کند و کجا نه.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block gradient-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
            >
              درخواست دمو رایگان
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
