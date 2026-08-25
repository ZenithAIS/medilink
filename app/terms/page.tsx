import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import { contact } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "قوانین و مقررات | مدیلینک",
  description:
    "شرایط استفاده از وب‌سایت و سرویس‌های مدیلینک، تعهدات طرفین و محدودیت مسئولیت.",
  alternates: { canonical: "/terms" },
};

/* TODO(legal): این متن پیش‌نویس است و باید پیش از انتشار توسط مشاور حقوقی بازبینی شود. */
const sections = [
  {
    title: "۱. پذیرش شرایط",
    body: [
      "استفاده از وب‌سایت و سرویس‌های مدیلینک به معنای پذیرش این شرایط است. در صورت عدم موافقت، لطفاً از سرویس استفاده نکنید.",
    ],
  },
  {
    title: "۲. شرح سرویس",
    body: [
      "مدیلینک نرم‌افزار مدیریت و اتوماسیون کلینیک ارائه می‌دهد. مدیلینک ارائه‌دهنده‌ی خدمات درمانی نیست و هیچ توصیه‌ی پزشکی ارائه نمی‌کند.",
      "پاسخ‌های تولیدشده توسط ابزارهای هوش مصنوعی جایگزین نظر کادر درمان نیستند و مسئولیت تصمیم‌های درمانی بر عهده‌ی کلینیک است.",
    ],
  },
  {
    title: "۳. تعهدات کاربر",
    body: [
      "کلینیک موظف است رضایت لازم را از بیماران برای پردازش داده‌هایشان اخذ کند.",
      "حساب کاربری و رمز عبور محرمانه است و مسئولیت فعالیت‌های انجام‌شده با آن بر عهده‌ی دارنده‌ی حساب است.",
      "استفاده از سرویس برای ارسال پیام ناخواسته یا هر فعالیت خلاف قوانین ممنوع است.",
    ],
  },
  {
    title: "۴. تعرفه و پرداخت",
    body: [
      "پلن‌ها ماهانه‌اند و هزینه در ابتدای هر دوره دریافت می‌شود.",
      "ارقام اعلام‌شده بدون احتساب مالیات بر ارزش افزوده است.",
      "تغییر تعرفه‌ها حداقل ۳۰ روز پیش از اعمال، اطلاع‌رسانی می‌شود.",
    ],
  },
  {
    title: "۵. سطح سرویس و پشتیبانی",
    body: [
      "مدیلینک تلاش می‌کند دسترس‌پذیری سرویس را در بالاترین سطح ممکن حفظ کند؛ توقف‌های برنامه‌ریزی‌شده از پیش اطلاع‌رسانی می‌شود.",
      "سطح پاسخ‌گویی پشتیبانی بر اساس پلن انتخابی متفاوت است.",
    ],
  },
  {
    title: "۶. مالکیت فکری",
    body: [
      "کلیه‌ی حقوق نرم‌افزار، طراحی و محتوای وب‌سایت متعلق به مدیلینک است.",
      "داده‌ی واردشده توسط کلینیک متعلق به خود کلینیک باقی می‌ماند.",
    ],
  },
  {
    title: "۷. خاتمه‌ی همکاری",
    body: [
      "هر یک از طرفین می‌تواند با اطلاع قبلی همکاری را پایان دهد.",
      "پس از خاتمه، خروجی کامل داده در قالب استاندارد تحویل کلینیک می‌شود.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        title="قوانین و مقررات"
        description="آخرین به‌روزرسانی: تیر ۱۴۰۵"
      />

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-black text-gray-900 mb-3">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.body.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-sky-500"
                    ></span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
            <h2 className="text-lg font-black text-gray-900 mb-2">
              پرسش درباره‌ی این شرایط
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              با{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-sky-600 hover:underline"
              >
                {contact.email}
              </a>{" "}
              یا شماره‌ی {contact.phone} تماس بگیرید.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
