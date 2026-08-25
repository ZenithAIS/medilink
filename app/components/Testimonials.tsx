import Link from "next/link";
/* TODO(asset): عکس پرتره‌ی پزشک + لوگوی کلینیک برای هر نقل‌قول — بند ۵ بریف */
const testimonials = [
  {
    name: "دکتر سارا محمدی",
    role: "مدیر کلینیک پوست و زیبایی آرتا",
    text: "منشی ما روزی سه ساعت صرف یادآوری نوبت می‌کرد. حالا این کار کاملاً خودکار است و نرخ عدم‌حضور ما تقریباً نصف شده.",
  },
  {
    name: "دکتر امیر رضایی",
    role: "مدیر مرکز درمانی نوین",
    text: "ربات پاسخ‌گو شب‌ها و تعطیلات هم نوبت می‌گیرد. ماه اول بیش از ۱۸۰ نوبت خارج از ساعت کاری ثبت شد.",
  },
  {
    name: "دکتر نیلوفر کریمی",
    role: "مدیر پلی‌کلینیک سپید",
    text: "گزارش‌های مدیلینک اولین باری بود که عدد دقیق نرخ بازگشت بیمار را دیدم. تصمیم‌گیری برای سه شعبه خیلی ساده‌تر شد.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            پزشکانی که با ما کار می‌کنند
            <br />
            <span className="gradient-text">چه می‌گویند؟</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <blockquote className="text-gray-600 text-sm leading-relaxed mb-6">
                &laquo;{item.text}&raquo;
              </blockquote>
              <figcaption>
                <div className="font-bold text-gray-900 text-sm">
                  {item.name}
                </div>
                <div className="text-gray-500 text-xs mt-0.5">{item.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center mt-10">
          <Link
            href="/clients"
            className="text-sky-600 font-bold text-sm hover:underline"
          >
            مشاهده‌ی داستان‌های موفقیت
          </Link>
        </p>
      </div>
    </section>
  );
}
