import { IconShield, IconChart, IconChat, IconClock } from "./Icons";

/**
 * جایگزین سکشن «نظرات مشتریان».
 *
 * نسخه‌ی پیشین سه نقل‌قول با نام و سمت پزشکانی نشان می‌داد که وجود
 * خارجی نداشتند. نقل‌قول جعلی منتسب به پزشک، در حوزه‌ی سلامت هم از نظر
 * حقوقی پرریسک است و هم اعتماد را از بین می‌برد. تا وقتی نظر واقعی با
 * رضایت کتبی جمع نشده، اینجا تعهدهای خود مدیلینک را می‌گوییم.
 */
const commitments = [
  {
    Icon: IconShield,
    title: "داده‌ی بیمار مال کلینیک است",
    body: "روی سرورهای داخل کشور نگهداری می‌شود، هرگز برای آموزش مدل‌های عمومی به کار نمی‌رود، و هر زمان بخواهید خروجی کامل آن را تحویل می‌گیرید.",
  },
  {
    Icon: IconClock,
    title: "بدون قفل شدن به ما",
    body: "قرارداد حداقل مدت ندارد و لازم نیست نرم‌افزار فعلی کلینیک را کنار بگذارید. اگر به کارتان نیامد، بدون جریمه خارج می‌شوید.",
  },
  {
    Icon: IconChart,
    title: "نتیجه را خودتان می‌سنجید",
    body: "شاخص‌های کلیدی از روز اول ثبت می‌شوند تا اثر هر تغییر را با عدد ببینید، نه با حرف ما.",
  },
  {
    Icon: IconChat,
    title: "ربات جای پزشک را نمی‌گیرد",
    body: "پاسخ‌ها در محدوده‌ی اطلاعات تأییدشده‌ی کلینیک است و هر پرسش درمانی به کادر درمان ارجاع می‌شود. توصیه‌ی پزشکی نمی‌کند.",
  },
];

export default function Commitments() {
  return (
    <section id="commitments" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            چه چیزی را
            <br />
            <span className="gradient-text">به شما تعهد می‌دهیم</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            این‌ها ادعای نتیجه نیستند؛ شرط‌هایی هستند که همکاری با ما روی
            آن‌ها بنا می‌شود.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commitments.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
