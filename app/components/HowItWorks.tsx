const steps = [
  {
    title: "ثبت‌نام و تعریف کلینیک",
    description:
      "اطلاعات کلینیک، پزشکان و خدمات را وارد می‌کنیم. راه‌اندازی کمتر از یک روز طول می‌کشد.",
  },
  {
    title: "اتصال به سیستم‌های فعلی",
    description:
      "به پنل پیامک، واتساپ و نرم‌افزار فعلی کلینیک متصل می‌شویم؛ نیازی به مهاجرت داده نیست.",
  },
  {
    title: "فعال‌سازی اتوماسیون",
    description:
      "قوانین نوبت‌دهی، یادآوری و پیگیری فعال می‌شود و ربات شروع به پاسخ‌گویی می‌کند.",
  },
  {
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
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            چطور کار می‌کند؟
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            چهار مرحله از اولین تماس تا کلینیک کاملاً خودکار.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="w-11 h-11 rounded-full gradient-primary text-white flex items-center justify-center font-black mb-4">
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="hidden md:block absolute top-5 right-14 left-0 h-px bg-gray-200"
                ></span>
              )}
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
