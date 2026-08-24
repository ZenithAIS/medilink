import Link from "next/link";
export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      <div className="absolute top-10 right-0 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
              هوش مصنوعی و اتوماسیون برای کلینیک‌ها
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              کلینیک شما را
              <br />
              <span className="gradient-text">هوشمند می‌کنیم</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              از پذیرش تا پیگیری بیمار، با هوش مصنوعی. مدی‌لینک کارهای تکراری
              کلینیک شما را خودکار می‌کند تا تیم‌تان روی درمان تمرکز کند.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-stretch sm:items-center">
              <Link
                href="/contact"
                className="gradient-primary text-white px-8 py-4 rounded-xl text-base font-bold hover:opacity-90 transition-all shadow-lg text-center"
              >
                درخواست دمو رایگان
              </Link>
              <Link
                href="/products"
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-base font-bold hover:border-sky-400 hover:text-sky-600 transition-all text-center"
              >
                مشاهده‌ی محصولات
              </Link>
            </div>
          </div>

          {/* TODO(asset): موکاپ داشبورد محصول روی لپ‌تاپ/موبایل — بند ۵ بریف */}
          <div
            className="relative aspect-[4/3] rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden"
            role="img"
            aria-label="پیش‌نمایش داشبورد مدی‌لینک"
          >
            <div className="h-9 bg-gray-50 border-b border-gray-200 flex items-center gap-1.5 px-4">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
            </div>
            <div className="p-5 grid grid-cols-3 gap-3">
              <div className="col-span-2 h-24 rounded-lg bg-gradient-to-br from-sky-100 to-teal-100"></div>
              <div className="h-24 rounded-lg bg-gray-100"></div>
              <div className="h-16 rounded-lg bg-gray-100"></div>
              <div className="h-16 rounded-lg bg-gray-100"></div>
              <div className="h-16 rounded-lg bg-gray-100"></div>
              <div className="col-span-3 h-20 rounded-lg bg-gray-100"></div>
            </div>
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <span className="text-xs text-gray-400">
                جای موکاپ داشبورد محصول
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
