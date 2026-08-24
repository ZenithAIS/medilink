import { IconDashboard, IconCalendar, IconChat, IconClock } from "./Icons";

const stats = [
  { Icon: IconDashboard, value: "+۱۰۰", label: "کلینیک فعال" },
  { Icon: IconCalendar, value: "+۲۵۰٬۰۰۰", label: "نوبت ثبت‌شده" },
  { Icon: IconChat, value: "+۱٫۲ میلیون", label: "پیام پاسخ‌داده‌شده" },
  { Icon: IconClock, value: "−۴۰٪", label: "کاهش نرخ عدم‌حضور" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ Icon, value, label }) => (
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
