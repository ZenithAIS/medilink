import Link from "next/link";
import { services } from "@/app/lib/services";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-500 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse-ring"></span>
            خدمات مدیلینک
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-ink-900 mb-4">
            فراتر از پنل مدیریت کلینیک
            <br />
            <span className="gradient-text">رشد آنلاین شما هم با ماست</span>
          </h2>
          <p className="text-ink-400 max-w-xl mx-auto text-base leading-relaxed">
            علاوه بر پنل مدیریت کلینیک، این خدمات را هم مستقل ارائه می‌کنیم —
            برای دیده‌شدن بیشتر کلینیک شما در فضای آنلاین.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map(({ slug, title, description, Icon }, i) => (
            <Reveal key={slug} delay={i * 80}>
              <Link
                href={`/services/${slug}`}
                className="group flex h-full flex-col rounded-2xl border border-cream-200 bg-cream-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-brand-50 text-violet-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
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
        </div>

        <p className="text-center mt-10">
          <Link
            href="/services"
            className="inline-block border-2 border-cream-300 text-ink-700 px-8 py-3 rounded-xl text-sm font-bold hover:border-brand-300 hover:text-brand-600 transition-all"
          >
            مشاهده‌ی همه‌ی خدمات
          </Link>
        </p>
      </div>
    </section>
  );
}
