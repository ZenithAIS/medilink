import Link from "next/link";
import { products } from "@/app/lib/products";

export default function Products() {
  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
            محصولات ما
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            پنج سیستم هوشمند
            <br />
            <span className="gradient-text">برای کل مسیر بیمار</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            هر محصول به‌تنهایی کار می‌کند و کنار هم یک کلینیک کاملاً خودکار
            می‌سازد.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(({ slug, title, description, Icon }) => (
            <Link
              key={slug}
              href={`/products/${slug}`}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-50 to-teal-50 text-sky-600 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed grow">
                {description}
              </p>
              <span className="mt-4 text-sky-600 font-bold text-sm group-hover:underline">
                جزئیات بیشتر
              </span>
            </Link>
          ))}

          <div className="rounded-2xl p-6 border-2 border-dashed border-sky-200 bg-white flex flex-col justify-center items-start gap-3">
            <h3 className="text-lg font-bold text-gray-900">
              مطمئن نیستید کدام برای شما مناسب است؟
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              در یک جلسه‌ی دمو، وضعیت کلینیک شما را بررسی و ترکیب درست را
              پیشنهاد می‌کنیم.
            </p>
            <Link
              href="/contact"
              className="text-sky-600 font-bold text-sm hover:underline"
            >
              درخواست دمو رایگان
            </Link>
          </div>
        </div>

        <p className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-xl text-sm font-bold hover:border-sky-400 hover:text-sky-600 transition-all"
          >
            مشاهده‌ی همه‌ی محصولات
          </Link>
        </p>
      </div>
    </section>
  );
}
