import {
  IconDashboard,
  IconMessage,
  IconCalendar,
  IconChart,
} from "./Icons";
import Reveal from "./Reveal";

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
      "اطلاعات کلینیک را وارد می‌کنیم؛ کمتر از یک روز.",
  },
  {
    number: "۲",
    title: "اتصال به سیستم‌های فعلی",
    description:
      "به پیامک، واتساپ و نرم‌افزار فعلی وصل می‌شویم.",
  },
  {
    number: "۳",
    title: "فعال‌سازی اتوماسیون",
    description:
      "نوبت‌دهی، یادآوری و پاسخ‌گویی، خودکار فعال می‌شود.",
  },
  {
    number: "۴",
    title: "پایش و بهینه‌سازی",
    description:
      "نتیجه را در داشبورد می‌بینید؛ ماهانه بهینه می‌کنیم.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-ink-900 mb-4">
            چطور کار می‌کند؟
          </h2>
          <p className="text-ink-400 max-w-xl mx-auto text-base leading-relaxed">
            چهار مرحله از اولین تماس تا کلینیک کاملاً خودکار.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 120}
              className="relative flex md:block gap-4"
            >
              {/* ریل اتصال مراحل: افقی در دسکتاپ (RTL: از راست به چپ)، عمودی در موبایل */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden md:block absolute top-7 right-16 left-0 border-t-2 border-dashed border-brand-100"
                ></span>
              )}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="md:hidden absolute top-14 right-7 w-0.5 h-[calc(100%+2rem)] bg-brand-100"
                ></span>
              )}

              <div className="relative shrink-0">
                <span className="relative z-10 w-14 h-14 rounded-2xl gradient-primary text-white flex items-center justify-center text-xl font-black shadow-lg shadow-brand-200">
                  {step.number}
                </span>
                <Icon
                  step={i}
                  className="absolute -bottom-1 -left-1 z-20 w-6 h-6 p-1 rounded-lg bg-white border border-brand-100 text-brand-600 shadow-sm"
                />
              </div>

              <div className="md:mt-6">
                <h3 className="text-base font-bold text-ink-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-ink-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
