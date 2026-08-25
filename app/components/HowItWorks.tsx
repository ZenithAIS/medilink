import {
  IconDashboard,
  IconMessage,
  IconCalendar,
  IconChart,
} from "./Icons";

const STEP_ICONS = [IconDashboard, IconMessage, IconCalendar, IconChart];

function Icon({ step, className }: { step: number; className?: string }) {
  const C = STEP_ICONS[step] ?? IconDashboard;
  return <C className={className} />;
}

const steps = [
  {
    number: "۱",
    title: "ثبت‌نام و تعریف کلینیک",
    description:
      "اطلاعات کلینیک، پزشکان و خدمات را وارد می‌کنیم. راه‌اندازی کمتر از یک روز طول می‌کشد.",
  },
  {
    number: "۲",
    title: "اتصال به سیستم‌های فعلی",
    description:
      "به پنل پیامک، واتساپ و نرم‌افزار فعلی کلینیک متصل می‌شویم؛ نیازی به مهاجرت داده نیست.",
  },
  {
    number: "۳",
    title: "فعال‌سازی اتوماسیون",
    description:
      "قوانین نوبت‌دهی، یادآوری و پیگیری فعال می‌شود و ربات شروع به پاسخ‌گویی می‌کند.",
  },
  {
    number: "۴",
    title: "پایش و بهینه‌سازی",
    description:
      "با داشبورد گزارش‌ها نتیجه را می‌بینید و تیم ما فرآیندها را ماهانه بهینه می‌کند.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            چطور کار می‌کند؟
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            چهار مرحله از اولین تماس تا کلینیک کاملاً خودکار.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex md:block gap-4">
              {/* ریل اتصال مراحل: افقی در دسکتاپ (RTL: از راست به چپ)، عمودی در موبایل */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden md:block absolute top-7 right-16 left-0 border-t-2 border-dashed border-sky-200"
                ></span>
              )}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="md:hidden absolute top-14 right-7 w-0.5 h-[calc(100%+2rem)] bg-sky-100"
                ></span>
              )}

              <div className="relative shrink-0">
                <span className="relative z-10 w-14 h-14 rounded-2xl gradient-primary text-white flex items-center justify-center text-xl font-black shadow-lg shadow-sky-200">
                  {step.number}
                </span>
                <Icon
                  step={i}
                  className="absolute -bottom-1 -left-1 z-20 w-6 h-6 p-1 rounded-lg bg-white border border-sky-100 text-sky-600 shadow-sm"
                />
              </div>

              <div className="md:mt-6">
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
