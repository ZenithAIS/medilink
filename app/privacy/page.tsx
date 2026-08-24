import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import { contact } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "حریم خصوصی | مدی‌لینک",
  description:
    "سیاست حریم خصوصی مدی‌لینک درباره‌ی جمع‌آوری، نگهداری و پردازش داده‌ی کاربران و بیماران.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/* TODO(legal): این متن پیش‌نویس است و باید پیش از انتشار توسط مشاور حقوقی بازبینی شود. */
const sections = [
  {
    title: "۱. داده‌هایی که جمع‌آوری می‌کنیم",
    body: [
      "اطلاعاتی که خودتان در فرم درخواست دمو وارد می‌کنید: نام، شماره تماس، نوع کلینیک و متن پیام.",
      "نشانی ایمیل، در صورت عضویت در خبرنامه.",
      "داده‌های فنی مرورگر مانند نوع دستگاه و صفحات بازدیدشده، برای بهبود عملکرد سایت.",
    ],
  },
  {
    title: "۲. داده‌ی بیماران کلینیک",
    body: [
      "در صورت استفاده‌ی کلینیک از سامانه‌های مدی‌لینک، داده‌ی بیماران در نقش پردازشگر داده و بر اساس دستور کلینیک پردازش می‌شود؛ مالک داده همچنان کلینیک است.",
      "داده‌ی پزشکی روی سرورهای داخل کشور و به‌صورت رمزنگاری‌شده نگهداری می‌شود.",
      "داده‌ی بیماران هرگز برای آموزش مدل‌های هوش مصنوعی عمومی استفاده نمی‌شود.",
    ],
  },
  {
    title: "۳. هدف از پردازش",
    body: [
      "پاسخ‌گویی به درخواست دمو و ارتباط با شما.",
      "ارائه و بهبود خدمات قراردادی به کلینیک.",
      "رعایت الزامات قانونی و امنیتی.",
    ],
  },
  {
    title: "۴. اشتراک‌گذاری با اشخاص ثالث",
    body: [
      "اطلاعات شما فروخته نمی‌شود و در اختیار اشخاص ثالث برای اهداف تبلیغاتی قرار نمی‌گیرد.",
      "تنها در موارد ضروری و در چارچوب قرارداد محرمانگی، با ارائه‌دهندگان زیرساخت (مانند سرویس پیامک) به اشتراک گذاشته می‌شود.",
    ],
  },
  {
    title: "۵. مدت نگهداری",
    body: [
      "اطلاعات تماس تا زمان درخواست حذف از سوی شما نگهداری می‌شود.",
      "پس از پایان همکاری، خروجی کامل داده به کلینیک تحویل و نسخه‌های مدی‌لینک حذف می‌شود.",
    ],
  },
  {
    title: "۶. حقوق شما",
    body: [
      "می‌توانید درخواست دسترسی، اصلاح یا حذف داده‌های خود را ثبت کنید.",
      "می‌توانید هر زمان عضویت خبرنامه را لغو کنید.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        title="سیاست حریم خصوصی"
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
              تماس درباره‌ی حریم خصوصی
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              برای هر پرسش یا درخواست مربوط به داده‌های خود با{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-sky-600 hover:underline"
              >
                {contact.email}
              </a>{" "}
              در تماس باشید.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
