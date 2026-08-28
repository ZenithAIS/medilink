import { IconShield, IconChart, IconChat, IconClock } from "./Icons";
import Reveal from "./Reveal";

/**
 * جایگزین سکشن «نظرات مشتریان».
 *
 * نسخه‌ی پیشین سه نقل‌قول با نام و سمت پزشکانی نشان می‌داد که وجود
 * خارجی نداشتند. نقل‌قول جعلی منتسب به پزشک، در حوزه‌ی سلامت هم از نظر
 * حقوقی پرریسک است و هم اعتماد را از بین می‌برد. تا وقتی نظر واقعی با
 * رضایت کتبی جمع نشده، اینجا تعهدهای خود مدیلینک را می‌گوییم — کوتاه،
 * چون قول کوتاه راحت‌تر زیر سوال می‌رود و پس همان‌قدر باید محکم باشد.
 */
const commitments = [
  {
    Icon: IconShield,
    title: "داده‌ی بیمار مال کلینیک است",
    body: "روی سرور داخل کشور می‌ماند؛ هر زمان بخواهید، مال شماست.",
    tone: "bg-brand-50 text-brand-600",
  },
  {
    Icon: IconClock,
    title: "بدون قفل شدن به ما",
    body: "بدون قرارداد حداقل مدت؛ هر زمان بخواهید خارج می‌شوید.",
    tone: "bg-good-50 text-good-600",
  },
  {
    Icon: IconChart,
    title: "نتیجه را خودتان می‌سنجید",
    body: "شاخص‌ها از روز اول ثبت می‌شوند؛ عدد می‌بینید، نه شعار.",
    tone: "bg-violet-50 text-violet-500",
  },
  {
    Icon: IconChat,
    title: "ربات جای پزشک را نمی‌گیرد",
    body: "پرسش درمانی همیشه به کادر درمان ارجاع می‌شود، نه ربات.",
    tone: "bg-cool-50 text-cool-500",
  },
];

export default function Commitments() {
  return (
    <section id="commitments" className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-ink-900 mb-4">
            چه چیزی را
            <br />
            <span className="gradient-text">به شما تعهد می‌دهیم</span>
          </h2>
          <p className="text-ink-400 max-w-xl mx-auto text-base leading-relaxed">
            این‌ها ادعای نتیجه نیستند؛ شرط‌های همکاری با ما هستند.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {commitments.map(({ Icon, title, body, tone }, i) => (
            <Reveal
              key={title}
              delay={i * 90}
              className="group rounded-2xl border border-cream-200 bg-white p-6 transition-shadow duration-300 hover:shadow-md"
            >
              <span
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${tone}`}
              >
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="text-base font-bold text-ink-900 mb-1.5">
                {title}
              </h3>
              <p className="text-ink-400 text-sm leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
