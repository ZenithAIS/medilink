import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/app/components/Accordion";
import FinalCta from "@/app/components/FinalCta";
import { products, getProduct } from "@/app/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.title} | مدیلینک`,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.title} | مدیلینک`,
      description: product.description,
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const { title, tagline, description, Icon, features, benefits, useCase, faqs } =
    product;

  return (
    <main>
      {/* Hero محصول */}
      <section className="relative overflow-hidden pt-32 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="مسیر صفحه" className="text-sm text-gray-500 mb-6">
            <Link href="/products" className="hover:text-sky-600">
              محصولات
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-sky-600 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-sky-600">
                {tagline}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-2 mb-4 leading-tight">
                {title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="gradient-primary text-white px-8 py-4 rounded-xl text-base font-bold hover:opacity-90 transition-all shadow-lg text-center"
                >
                  درخواست دمو رایگان
                </Link>
                <Link
                  href="/pricing"
                  className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-base font-bold hover:border-sky-400 hover:text-sky-600 transition-all text-center"
                >
                  دریافت تعرفه
                </Link>
              </div>
            </div>

            {/* TODO(asset): اسکرین‌شات بزرگ محصول روی موکاپ لپ‌تاپ/موبایل — بند ۵ بریف */}
            <div
              className="relative aspect-[4/3] rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden"
              role="img"
              aria-label={`پیش‌نمایش ${title}`}
            >
              <div className="h-9 bg-gray-50 border-b border-gray-200 flex items-center gap-1.5 px-4">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
              </div>
              <div className="p-5 grid grid-cols-3 gap-3">
                <div className="col-span-2 h-24 rounded-lg bg-gradient-to-br from-sky-100 to-teal-100"></div>
                <div className="h-24 rounded-lg bg-gray-100"></div>
                <div className="col-span-3 h-28 rounded-lg bg-gray-100"></div>
              </div>
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <span className="text-xs text-gray-400">
                  جای اسکرین‌شات محصول
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قابلیت‌ها */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            قابلیت‌ها
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 bg-gray-50 rounded-xl p-5"
              >
                <span
                  aria-hidden
                  className="mt-1 w-5 h-5 shrink-0 rounded-full gradient-primary"
                ></span>
                <span className="text-sm text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* مزایا و نمونه استفاده */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8">
                نتیجه برای کلینیک شما
              </h2>
              <dl className="grid grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.label}
                    className="bg-white rounded-2xl border border-gray-200 p-6 text-center"
                  >
                    <dd className="text-3xl font-black gradient-text">
                      {benefit.value}
                    </dd>
                    <dt className="text-sm text-gray-500 mt-1">
                      {benefit.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <span className="text-xs font-medium text-sky-600">
                نمونه‌ی استفاده
              </span>
              <h3 className="text-xl font-black text-gray-900 mt-2 mb-3">
                {useCase.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {useCase.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* سوالات متداول محصول */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-gray-900 mb-10 text-center">
            سوالات متداول {title}
          </h2>
          <Accordion items={faqs} />
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
