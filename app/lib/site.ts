export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://medilink.ir";

export const siteName = "مدیلینک";

/** شماره‌ی تماس در فرمت بین‌المللی، بدون + و بدون فاصله. مبنای لینک تلفن و واتساپ. */
const phoneE164 = "989051881128";

export const contact = {
  phone: "۰۹۰۵ ۱۸۸ ۱۱۲۸",
  phoneHref: `tel:+${phoneE164}`,
  whatsapp: `https://wa.me/${phoneE164}`,
  email: "info@dmsafir.com",
  address: "تهران، ایران",
};

export const socials = [
  {
    label: "اینستاگرام",
    handle: "medilink_agency",
    href: "https://instagram.com/medilink_agency",
  },
  {
    label: "تلگرام",
    handle: "medilinkagency",
    href: "https://t.me/medilinkagency",
  },
  {
    label: "واتساپ",
    handle: contact.phone,
    href: contact.whatsapp,
  },
];

export const navLinks = [
  { label: "محصولات", href: "/products" },
  { label: "تعرفه‌ها", href: "/pricing" },
  { label: "نتایج", href: "/clients" },
  { label: "بلاگ", href: "/blog" },
  { label: "درباره‌ی ما", href: "/about" },
  { label: "سوالات متداول", href: "/faq" },
];
