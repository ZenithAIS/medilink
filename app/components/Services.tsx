const services = [
  {
    icon: "📱",
    title: "مدیریت شبکه‌های اجتماعی",
    description:
      "تولید محتوای تخصصی و مدیریت اینستاگرام، تلگرام و سایر پلتفرم‌ها برای کلینیک شما.",
  },
  {
    icon: "🔍",
    title: "سئو و بهینه‌سازی سایت",
    description:
      "رتبه‌بندی در گوگل با کلمات کلیدی تخصصی حوزه زیبایی و جراحی برای جذب بیمار جدید.",
  },
  {
    icon: "📢",
    title: "تبلیغات آنلاین",
    description:
      "اجرای کمپین‌های هدفمند در گوگل ادز و اینستاگرام با بهترین نرخ بازگشت سرمایه.",
  },
  {
    icon: "🎨",
    title: "برندینگ و هویت بصری",
    description:
      "طراحی لوگو، پالت رنگی و هویت بصری منسجم برای ایجاد تمایز در بازار رقابتی.",
  },
  {
    icon: "📊",
    title: "آنالیز و گزارش‌دهی",
    description:
      "ارائه گزارش‌های دقیق ماهانه از عملکرد کمپین‌ها و رشد شاخص‌های کلیدی کلینیک.",
  },
  {
    icon: "⭐",
    title: "مدیریت شهرت آنلاین",
    description:
      "پاسخ به نظرات، مدیریت بحران و تقویت تصویر برند در فضای دیجیتال.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            خدمات ما
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            هر چیزی که کلینیک شما
            <br />
            <span className="gradient-text">برای رشد نیاز دارد</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            با ترکیب خدمات دیجیتال مارکتینگ، کلینیک شما را به برند اول منطقه
            تبدیل می‌کنیم.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
