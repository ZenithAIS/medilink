import Link from "next/link";
import { products } from "@/app/lib/products";
import Reveal from "./Reveal";

export default function Products() {
  return (
    <section id="products" className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse-ring"></span>
            محصولات ما
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-ink-900 mb-4">
            پنج سیستم هوشمند
            <br />
            <span className="gradient-text">برای کل مسیر بیمار</span>
          </h2>
          <p className="text-ink-400 max-w-xl mx-auto text-base leading-relaxed">
            هر محصول به‌تنهایی کار می‌کند و کنار هم یک کلینیک کاملاً خودکار
            می‌سازد.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(({ slug, title, description, Icon }, i) => (
            <Reveal key={slug} delay={i * 80}>
              <Link
                href={`/products/${slug}`}
                className="group flex h-full flex-col rounded-2xl border border-cream-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-violet-50 text-brand-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-ink-900 mb-2">{title}</h3>
                <p className="text-ink-400 text-sm leading-relaxed grow">
                  {description}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm font-bold text-brand-600">
                  جزئیات بیشتر
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={products.length * 80}>
            <div className="flex h-full flex-col items-start justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-100 bg-white p-6">
              <h3 className="text-lg font-bold text-ink-900">
                مطمئن نیستید کدام برای شما مناسب است؟
              </h3>
              <p className="text-ink-400 text-sm leading-relaxed">
                در یک جلسه‌ی دمو، وضعیت کلینیک شما را بررسی و ترکیب درست را
                پیشنهاد می‌کنیم.
              </p>
              <Link
                href="/contact"
                className="text-brand-600 font-bold text-sm hover:underline"
              >
                درخواست دمو رایگان
              </Link>
            </div>
          </Reveal>
        </div>

        <p className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block border-2 border-cream-300 text-ink-700 px-8 py-3 rounded-xl text-sm font-bold hover:border-brand-300 hover:text-brand-600 transition-all"
          >
            مشاهده‌ی همه‌ی محصولات
          </Link>
        </p>
      </div>
    </section>
  );
}
