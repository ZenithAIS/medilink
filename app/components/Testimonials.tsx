const testimonials = [
  {
    name: "دکتر سارا محمدی",
    role: "مدیر کلینیک زیبایی آرتا",
    text: "از وقتی با مدیلینک کار می‌کنیم، تعداد مراجعین ما بیش از دو برابر شده. تیم حرفه‌ای و متعهدی هستند که واقعاً به رشد کلینیک ما اهمیت می‌دهند.",
    avatar: "👩‍⚕️",
    stars: 5,
  },
  {
    name: "دکتر امیر رضایی",
    role: "مدیر مرکز درمانی نوین",
    text: "استراتژی محتوایی که مدیلینک برای ما طراحی کرد، کاملاً متفاوت از آژانس‌های دیگر بود. نتایج در همان ماه اول قابل مشاهده بود.",
    avatar: "👨‍⚕️",
    stars: 5,
  },
  {
    name: "دکتر نیلوفر کریمی",
    role: "مدیر کلینیک پوست و مو سپید",
    text: "مدیلینک زبان صنعت پزشکی و زیبایی را می‌فهمد. محتواهایی که تولید می‌کنند هم علمی است هم جذاب. اعتماد بیماران ما بیشتر شده.",
    avatar: "👩‍⚕️",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            نظرات مشتریان
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            مشتریان ما
            <br />
            <span className="gradient-text">چه می‌گویند؟</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "{item.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-full flex items-center justify-center text-2xl">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">
                    {item.name}
                  </div>
                  <div className="text-gray-500 text-xs">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
