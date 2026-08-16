const projects = [
  {
    title: "کلینیک زیبایی آرتا",
    category: "مدیریت شبکه‌های اجتماعی + سئو",
    result: "۳۴۰٪ رشد فالوئر در ۶ ماه",
    color: "from-sky-400 to-blue-600",
    emoji: "💎",
  },
  {
    title: "مرکز درمانی نوین",
    category: "تبلیغات گوگل + برندینگ",
    result: "۱۸۰ مراجع جدید در ماه اول",
    color: "from-violet-400 to-purple-600",
    emoji: "🏥",
  },
  {
    title: "کلینیک پوست و مو سپید",
    category: "کمپین اینستاگرام + محتوا",
    result: "۲۵۰٪ افزایش رزرو آنلاین",
    color: "from-pink-400 to-rose-600",
    emoji: "✨",
  },
  {
    title: "مجموعه زیبایی پارسیان",
    category: "برندینگ کامل + دیجیتال مارکتینگ",
    result: "برند اول منطقه در ۸ ماه",
    color: "from-emerald-400 to-teal-600",
    emoji: "🌿",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            نمونه کارها
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            موفقیت‌هایی که
            <br />
            <span className="gradient-text">به آن‌ها افتخار می‌کنیم</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            نمونه‌ای از کلینیک‌هایی که با مدیلینک به رشد چشمگیری رسیدند.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`bg-gradient-to-br ${project.color} p-10 flex items-center justify-center`}
              >
                <span className="text-6xl">{project.emoji}</span>
              </div>
              <div className="bg-white p-6">
                <span className="text-xs font-medium text-sky-500 bg-sky-50 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <h3 className="text-lg font-black text-gray-900 mt-3 mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <span>📊</span>
                  <span>{project.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
