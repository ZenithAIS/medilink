export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://medilinkapp.online";

export const siteName = "مدیلینک";

/**
 * آدرس پنل کلینیک (پروژه‌ی جدای medilink-app). تا وقتی DNS دامنه وصل نشده، با
 * NEXT_PUBLIC_PANEL_URL روی Vercel به آدرس موقت اشاره می‌کند.
 */
export const panelUrl =
  process.env.NEXT_PUBLIC_PANEL_URL ?? "https://app.medilinkapp.online";

/** ورود به مدیریت مدیلینک (Admin Hub در اپ). فقط یک لینک است، نه کنترلِ امنیتی؛ احرازِ ادمین در خودِ اپ انجام می‌شود. */
export const adminUrl = `${panelUrl}/admin`;

/** ثبت‌نام در پنل = شروع خودکار ۱۴ روز آزمایشی رایگان (تریگر start_clinic_trial در دیتابیس اپ). */
export const trialUrl = `${panelUrl}/signup`;
export const TRIAL_DAYS = 14;

/** شماره‌ی تماس در فرمت بین‌المللی، بدون + و بدون فاصله. مبنای لینک تلفن و واتساپ. */
const phoneE164 = "989051881129";

export const contact = {
  phone: "۰۹۰۵ ۱۸۸ ۱۱۲۹",
  phoneHref: `tel:+${phoneE164}`,
  whatsapp: `https://wa.me/${phoneE164}`,
  email: "info@dmsafir.com",
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
  { label: "خدمات", href: "/services" },
  { label: "تعرفه‌ها", href: "/pricing" },
  { label: "نتایج", href: "/clients" },
  { label: "بلاگ", href: "/blog" },
  { label: "درباره‌ی ما", href: "/about" },
  { label: "سوالات متداول", href: "/faq" },
];
