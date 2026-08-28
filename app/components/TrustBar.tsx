import { IconShield, IconClock, IconDashboard, IconChart } from "./Icons";
import Reveal from "./Reveal";

/**
 * نسخه‌ی پیشین «مورد اعتماد کلینیک‌های برتر» را با نام پنج کلینیک ساختگی
 * نشان می‌داد. تا وقتی مشتری واقعی اجازه‌ی استفاده از نامش را نداده،
 * این سکشن تعهدهای خود مدیلینک را نشان می‌دهد — چیزی که راست است و
 * همان کار اعتمادسازی را می‌کند.
 *
 * رنگ هر آیکون از چرخه‌ی رنگ‌های وضعیتِ همان پالتی است که کارفرما داد
 * (برند/سبز/بنفش/آبی)، تا کارت‌ها یکدست و خسته‌کننده نباشند.
 */
const commitments = [
  { Icon: IconShield, text: "داده روی سرور داخل کشور", tone: "bg-brand-50 text-brand-600" },
  { Icon: IconDashboard, text: "کنار نرم‌افزار فعلی کلینیک", tone: "bg-good-50 text-good-600" },
  { Icon: IconClock, text: "راه‌اندازی کمتر از یک روز", tone: "bg-violet-50 text-violet-500" },
  { Icon: IconChart, text: "بدون قرارداد حداقل مدت", tone: "bg-cool-50 text-cool-500" },
];

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-cream-200 bg-cream-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {commitments.map(({ Icon, text, tone }, i) => (
            <Reveal
              as="li"
              key={text}
              delay={i * 90}
              className="group flex items-center gap-3 rounded-xl bg-white border border-cream-300 px-4 py-3 transition-shadow hover:shadow-md"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${tone}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm text-ink-700 leading-snug">{text}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
