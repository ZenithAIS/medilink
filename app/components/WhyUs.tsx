const reasons = [
  {
    icon: "🎯",
    title: "تخصص در حوزه زیبایی",
    description:
      "برخلاف آژانس‌های عمومی، ما فقط روی کلینیک‌های زیبایی و درمانی تمرکز داریم و زبان این صنعت را می‌شناسیم.",
  },
  {
    icon: "📈",
    title: "نتایج قابل اندازه‌گیری",
    description:
      "هر ریال هزینه‌ای که می‌کنید را ردیابی می‌کنیم و گزارش شفاف از بازگشت سرمایه ارائه می‌دهیم.",
  },
  {
    icon: "🤝",
    title: "همراهی بلندمدت",
    description:
      "ما شریک رشد کلینیک شما هستیم، نه فقط یک ارائه‌دهنده خدمات. موفقیت شما موفقیت ماست.",
  },
  {
    icon: "⚡",
    title: "اجرای سریع و چابک",
    description:
      "با تیم متخصص و فرآیندهای بهینه، کمپین‌های شما را در کمترین زمان ممکن راه‌اندازی می‌کنیم.",
  },
];

const results = [
  { label: "افزایش مراجعین جدید", value: 85 },
  { label: "رشد فالوئر اینستاگرام", value: 320, cap: true },
  { label: "کاهش هزینه جذب بیمار", value: 60 },
  { label: "افزایش رزرو آنلاین", value: 250, cap: true },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
            چرا مدیلینک
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            چرا کلینیک‌ها
            <br />
            <span className="gradient-text">مدیلینک را انتخاب می‌کنند؟</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-sky-50 transition-colors duration-300"
              >
                <div className="text-3xl mb-3">{reason.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900 mb-8">
              نتایج واقعی کلینیک‌های ما
            </h3>
            {results.map((result) => (
              <div key={result.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {result.label}
                  </span>
                  <span className="text-sm font-black gradient-text">
                    {result.cap ? `+${result.value}%` : `+${result.value}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="gradient-primary h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(result.value, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
