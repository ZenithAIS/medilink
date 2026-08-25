import { IconShield, IconClock, IconDashboard, IconChart } from "./Icons";

/**
 * نسخه‌ی پیشین «مورد اعتماد کلینیک‌های برتر» را با نام پنج کلینیک ساختگی
 * نشان می‌داد. تا وقتی مشتری واقعی اجازه‌ی استفاده از نامش را نداده،
 * این سکشن تعهدهای خود مدی‌لینک را نشان می‌دهد — چیزی که راست است و
 * همان کار اعتمادسازی را می‌کند.
 */
const commitments = [
  { Icon: IconShield, text: "داده روی سرور داخل کشور" },
  { Icon: IconDashboard, text: "کنار نرم‌افزار فعلی کلینیک" },
  { Icon: IconClock, text: "راه‌اندازی کمتر از یک روز" },
  { Icon: IconChart, text: "بدون قرارداد حداقل مدت" },
];

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-gray-100 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {commitments.map(({ Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-xl bg-white border border-gray-200 px-4 py-3"
            >
              <Icon className="h-5 w-5 shrink-0 text-sky-600" />
              <span className="text-sm text-gray-600 leading-snug">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
