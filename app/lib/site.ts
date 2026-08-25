export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://medilink.ir";

export const siteName = "مدیلینک";

export const contact = {
  phone: "۰۲۱-۱۲۳۴۵۶۷۸",
  phoneHref: "tel:+982112345678",
  email: "info@medilink.ir",
  address: "تهران، ایران",
};

export const navLinks = [
  { label: "محصولات", href: "/products" },
  { label: "تعرفه‌ها", href: "/pricing" },
  { label: "نمونه‌کارها", href: "/clients" },
  { label: "بلاگ", href: "/blog" },
  { label: "درباره‌ی ما", href: "/about" },
  { label: "سوالات متداول", href: "/faq" },
];
