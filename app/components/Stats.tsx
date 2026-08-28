import { IconDashboard, IconChat, IconShield, IconClock } from "./Icons";
import Reveal from "./Reveal";

/**
 * ارقام محصول، نه ادعای عملکرد.
 *
 * نسخه‌ی پیشین اعدادی مثل «+۱۰۰ کلینیک» و «−۴۰٪ عدم‌حضور» را نشان می‌داد
 * که هیچ داده‌ای پشتشان نبود. هر عدد اینجا از خود محصول می‌آید و قابل
 * راستی‌آزمایی است. وقتی نتایج واقعی از کلینیک‌ها جمع شد، جایگزین شوند.
 */
const facts = [
  { Icon: IconDashboard, value: "۵", label: "سیستم یکپارچه", tone: "bg-brand-50 text-brand-600" },
  { Icon: IconChat, value: "۲۴/۷", label: "پاسخ‌گویی خودکار", tone: "bg-good-50 text-good-600" },
  { Icon: IconClock, value: "< ۱ روز", label: "زمان راه‌اندازی", tone: "bg-violet-50 text-violet-500" },
  { Icon: IconShield, value: "داخل کشور", label: "محل نگهداری داده", tone: "bg-cool-50 text-cool-500" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-cream-100 border-y border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map(({ Icon, value, label, tone }, i) => (
            <Reveal key={label} delay={i * 90} className="group text-center">
              <span
                className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${tone}`}
              >
                <Icon className="w-5 h-5" />
              </span>
              <dd className="text-3xl md:text-4xl font-black gradient-text">
                {value}
              </dd>
              <dt className="text-sm text-ink-400 mt-1">{label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
