import Link from "next/link";

export default function FinalCta({
  title = "کلینیک‌تان را در یک جلسه‌ی ۳۰ دقیقه‌ای ببینید",
  description = "بدون تعهد و بدون هزینه. نشان می‌دهیم مدی‌لینک دقیقاً روی فرآیندهای کلینیک شما چطور کار می‌کند.",
  cta = "درخواست دمو رایگان",
}: {
  title?: string;
  description?: string;
  cta?: string;
}) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-primary rounded-3xl px-8 py-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-4">{title}</h2>
          <p className="text-white/85 max-w-xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-sky-700 px-8 py-4 rounded-xl text-base font-bold hover:bg-sky-50 transition-colors shadow-lg"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
