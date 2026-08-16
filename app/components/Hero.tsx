export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      <div className="absolute top-20 right-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
          متخصص دیجیتال مارکتینگ کلینیک‌های زیبایی
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          رشد کلینیک شما
          <br />
          <span className="gradient-text">مأموریت ماست</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          مدیلینک با استراتژی‌های هدفمند دیجیتال مارکتینگ، کلینیک‌های زیبایی
          و درمانی را به برندهای قدرتمند تبدیل می‌کند.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="gradient-primary text-white px-8 py-4 rounded-full text-base font-bold hover:opacity-90 transition-all shadow-lg"
          >
            مشاوره رایگان بگیرید
          </a>
          <a
            href="#services"
            className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full text-base font-bold hover:border-sky-400 hover:text-sky-500 transition-all"
          >
            خدمات ما
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { number: "+۱۵۰", label: "کلینیک موفق" },
            { number: "+۵۰۰%", label: "رشد بازدید" },
            { number: "+۸۵%", label: "افزایش مراجعین" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
