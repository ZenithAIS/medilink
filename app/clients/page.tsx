import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import ClientLogo from "@/app/components/ClientLogo";
import { clients } from "@/app/lib/clients";
import FinalCta from "@/app/components/FinalCta";

export const metadata: Metadata = {
  title: "نمونه‌کارها و مشتریان | مدیلینک",
  description:
    "کلینیک‌هایی که با مدیلینک کار می‌کنند و نتایجی که به دست آورده‌اند — از کاهش نرخ عدم‌حضور تا افزایش رزرو آنلاین.",
  alternates: { canonical: "/clients" },
};


/* TODO(content): ارقام کیس‌استادی ساختگی‌اند و پیش از انتشار باید با داده‌ی واقعی و رضایت کتبی مشتری جایگزین شوند. */
const caseStudies = [
  {
    client: "کلینیک پوست و زیبایی آرتا",
    challenge:
      "منشی روزانه حدود سه ساعت صرف تماس برای یادآوری نوبت می‌کرد و با این حال نرخ عدم‌حضور بالا بود.",
    solution:
      "راه‌اندازی نوبت‌دهی آنلاین، یادآوری خودکار دومرحله‌ای و لیست انتظار فعال.",
    metrics: [
      { before: "۲۸٪", after: "۱۵٪", label: "نرخ عدم‌حضور" },
      { before: "۳ ساعت", after: "۰", label: "کار دستی روزانه" },
    ],
  },
  {
    client: "مرکز درمانی نوین",
    challenge:
      "حجم بالای پیام در واتساپ و اینستاگرام خارج از ساعت کاری بی‌پاسخ می‌ماند.",
    solution:
      "استقرار ربات پاسخ‌گوی هوشمند با دانش خدمات و تعرفه‌های مرکز و امکان ثبت نوبت در گفتگو.",
    metrics: [
      { before: "۰", after: "۱۸۰", label: "نوبت خارج از ساعت کاری (ماه اول)" },
      { before: "> ۶ ساعت", after: "< ۱ دقیقه", label: "میانگین زمان پاسخ" },
    ],
  },
  {
    client: "پلی‌کلینیک سپید",
    challenge:
      "گزارش‌گیری از سه شعبه دستی بود و مدیر تصویر یکپارچه‌ای از عملکرد نداشت.",
    solution:
      "راه‌اندازی داشبورد BI با شاخص‌های درآمد، نرخ بازگشت بیمار و عملکرد تفکیکی هر شعبه.",
    metrics: [
      { before: "۵ روز", after: "لحظه‌ای", label: "زمان تهیه‌ی گزارش ماهانه" },
      { before: "—", after: "۱۲+", label: "شاخص تحت پایش" },
    ],
  },
];

export default function ClientsPage() {
  return (
    <main>
      <PageHero
        badge="نمونه‌کارها"
        title="نتایجی که"
        highlight="قابل اندازه‌گیری‌اند"
        description="سه نمونه از کلینیک‌هایی که فرآیندهایشان را با مدیلینک خودکار کردند."
      />

      {/* گرید مشتریان */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm text-gray-500 mb-8">
            بیش از ۱۰۰ کلینیک به مدیلینک اعتماد کرده‌اند
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clients.map((client) => (
              <li
                key={client.name}
                className="h-20 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 grayscale"
              >
                <ClientLogo client={client} className="h-12 w-32" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* کیس‌استادی */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            داستان‌های موفقیت
          </h2>

          <div className="space-y-8">
            {caseStudies.map((study) => (
              <article
                key={study.client}
                className="bg-white rounded-2xl border border-gray-200 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-black text-gray-900 mb-4">
                    {study.client}
                  </h3>
                  <div className="mb-4">
                    <span className="text-xs font-bold text-gray-400">
                      چالش
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed mt-1">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400">
                      راه‌حل مدیلینک
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed mt-1">
                      {study.solution}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {study.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl bg-gray-50 border border-gray-100 p-4"
                    >
                      <div className="flex items-baseline justify-center gap-3">
                        <span className="text-lg font-bold text-gray-300 line-through">
                          {metric.before}
                        </span>
                        <span aria-hidden className="text-gray-300">
                          ←
                        </span>
                        <span className="text-2xl font-black gradient-text">
                          {metric.after}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 text-center mt-2">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
