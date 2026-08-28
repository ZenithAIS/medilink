import Link from "next/link";
import { products } from "@/app/lib/products";
import { contact, navLinks, socials } from "@/app/lib/site";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/">
              <span className="text-2xl font-black gradient-text">
                مدیلینک
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              مدیلینک ارائه‌دهنده‌ی سیستم‌های هوش مصنوعی و اتوماسیون برای
              کلینیک‌ها و مراکز پزشکی است — از پذیرش تا پیگیری بیمار.
            </p>

            <NewsletterForm />

            <div className="flex gap-3 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 h-9 bg-ink-900 hover:bg-brand-500 text-ink-400 hover:text-white rounded-lg flex items-center justify-center text-xs font-medium transition-colors duration-200"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">محصولات</h4>
            <ul className="space-y-2 text-sm">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="hover:text-brand-300 transition-colors duration-200"
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-brand-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-300 transition-colors duration-200"
                >
                  تماس و درخواست دمو
                </Link>
              </li>
            </ul>
            <ul className="space-y-2 text-sm mt-6">
              <li>
                <a
                  href={contact.phoneHref}
                  className="hover:text-brand-300 transition-colors"
                  dir="ltr"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-brand-300 transition-colors"
                  dir="ltr"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© ۱۴۰۵ مدیلینک. تمامی حقوق محفوظ است.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-300 transition-colors">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="hover:text-brand-300 transition-colors">
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
