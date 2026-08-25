import { IconPhoneMissed, IconClock, IconUserMinus } from "./Icons";

const items = [
  {
    Icon: IconPhoneMissed,
    problem: "تماس‌های بی‌پاسخ، بیمار از‌دست‌رفته",
    solution:
      "ربات پاسخ‌گوی هوشمند مدیلینک شبانه‌روز به سوالات بیماران جواب می‌دهد و نوبت ثبت می‌کند.",
  },
  {
    Icon: IconClock,
    problem: "ساعت‌ها وقت منشی صرف کارهای تکراری",
    solution:
      "یادآوری نوبت، پیگیری و ثبت پرونده به‌صورت خودکار انجام می‌شود؛ تیم شما وقت آزاد می‌کند.",
  },
  {
    Icon: IconUserMinus,
    problem: "بیمارانی که دیگر برنمی‌گردند",
    solution:
      "اتوماسیون پیگیری پس از درمان، بیمار را در زمان درست به کلینیک برمی‌گرداند.",
  },
];

export default function ProblemSolution() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            هر کلینیکی این سه مشکل را دارد
            <br />
            <span className="gradient-text">ما هر سه را حل می‌کنیم</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(({ Icon, problem, solution }) => (
            <div key={problem} className="text-center md:text-right">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{problem}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
