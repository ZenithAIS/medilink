import { IconDashboard, IconChat, IconShield, IconClock } from "./Icons";

/**
 * ارقام محصول، نه ادعای عملکرد.
 *
 * نسخه‌ی پیشین اعدادی مثل «+۱۰۰ کلینیک» و «−۴۰٪ عدم‌حضور» را نشان می‌داد
 * که هیچ داده‌ای پشتشان نبود. هر عدد اینجا از خود محصول می‌آید و قابل
 * راستی‌آزمایی است. وقتی نتایج واقعی از کلینیک‌ها جمع شد، جایگزین شوند.
 */
const facts = [
  { Icon: IconDashboard, value: "۵", label: "سیستم یکپارچه" },
  { Icon: IconChat, value: "۲۴/۷", label: "پاسخ‌گویی خودکار به بیمار" },
  { Icon: IconClock, value: "< ۱ روز", label: "زمان راه‌اندازی" },
  { Icon: IconShield, value: "داخل کشور", label: "محل نگهداری داده" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map(({ Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="w-6 h-6 text-sky-600 mx-auto mb-3" />
              <dd className="text-3xl md:text-4xl font-black gradient-text">
                {value}
              </dd>
              <dt className="text-sm text-gray-500 mt-1">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
