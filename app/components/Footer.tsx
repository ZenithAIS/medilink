export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <span className="text-2xl font-black gradient-text">مدیلینک</span>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              مدیلینک یک تیم دیجیتال مارکتینگ تخصصی برای کلینیک‌های زیبایی و
              درمانی است. ما به رشد برند شما در فضای دیجیتال کمک می‌کنیم.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: "📸", label: "اینستاگرام" },
                { icon: "✈️", label: "تلگرام" },
                { icon: "💼", label: "لینکدین" },
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-sky-600 rounded-xl flex items-center justify-center text-lg transition-colors duration-200"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">لینک‌های سریع</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "خانه", href: "#home" },
                { label: "خدمات", href: "#services" },
                { label: "چرا مدیلینک", href: "#why-us" },
                { label: "نمونه کارها", href: "#portfolio" },
                { label: "نظرات", href: "#testimonials" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-sky-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">تماس با ما</h4>
            <ul className="space-y-3 text-sm">
              {[
                { icon: "📍", value: "تهران، ایران" },
                { icon: "📞", value: "۰۲۱-۱۲۳۴۵۶۷۸" },
                { icon: "📧", value: "info@medilink.ir" },
              ].map((item) => (
                <li key={item.value} className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© ۱۴۰۴ مدیلینک. تمامی حقوق محفوظ است.</p>
          <p>طراحی و توسعه با ❤️ توسط تیم مدیلینک</p>
        </div>
      </div>
    </footer>
  );
}
