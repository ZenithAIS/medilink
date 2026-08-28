import { IconPhoneMissed, IconClock, IconUserMinus } from "./Icons";
import Reveal from "./Reveal";

const items = [
  {
    Icon: IconPhoneMissed,
    problem: "تماس‌های بی‌پاسخ",
    solution: "ربات پاسخ‌گو شبانه‌روز جواب می‌دهد و نوبت ثبت می‌کند.",
  },
  {
    Icon: IconClock,
    problem: "کار تکراری منشی",
    solution: "یادآوری و پیگیری، خودکار. تیم شما وقت آزاد می‌کند.",
  },
  {
    Icon: IconUserMinus,
    problem: "بیمارانی که برنمی‌گردند",
    solution: "پیگیری خودکار، بیمار را در زمان درست برمی‌گرداند.",
  },
];

export default function ProblemSolution() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-ink-900 mb-4">
            هر کلینیکی این سه مشکل را دارد
            <br />
            <span className="gradient-text">ما هر سه را حل می‌کنیم</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(({ Icon, problem, solution }, i) => (
            <Reveal
              key={problem}
              delay={i * 100}
              className="group text-center md:text-right"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 mx-auto md:mx-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-ink-900 mb-2">{problem}</h3>
              <p className="text-ink-400 text-sm leading-relaxed">{solution}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
