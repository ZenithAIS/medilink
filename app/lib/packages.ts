/**
 * بسته‌های قابل‌خرید مدیلینک — برگرفته از پروپوزال رسمی قیمت‌گذاری.
 * این تنها منبع واقعیِ قیمت‌هاست؛ صفحه‌ی تعرفه‌ها و فرایند خرید هر دو از
 * همین‌جا می‌خوانند تا عدد ناهماهنگ روی سایت نمایش داده نشود.
 *
 * amountToman صفر یا نامشخص یعنی بسته «استعلامی» است و دکمه‌ی خرید به‌جای
 * درگاه، کاربر را به فرم تماس هدایت می‌کند.
 */

export type BillingType = "one_time" | "monthly";

export type PackageTier = {
  key: string;
  label: string;
  /** تومان. null یعنی قیمت استعلامی و غیرقابل‌خرید آنلاین. */
  amountToman: number | null;
  /** برای قیمت‌های «از فلان تومان»، همین متن روی دکمه/برچسب نشان داده می‌شود. */
  priceNote?: string;
  billing: BillingType;
  description?: string;
};

export type SellablePackage = {
  key: string;
  title: string;
  /** برای لینک به صفحه‌ی محصول/خدمت مرتبط، در صورت وجود. */
  relatedHref?: string;
  note?: string;
  tiers: PackageTier[];
};

export const packages: SellablePackage[] = [
  {
    key: "clinic-automation",
    title: "اتوماسیون مطب",
    relatedHref: "/products/clinic-management",
    note: "بدون هزینه‌ی راه‌اندازی. هزینه‌ی پیامک مصرفی و دامنه جداگانه است.",
    tiers: [
      {
        key: "single-doctor",
        label: "مطب تک‌پزشک",
        amountToman: 18_000_000,
        billing: "monthly",
        description: "دسترسی کامل به پنل مدیلینک برای یک پزشک.",
      },
      {
        key: "clinic-multi",
        label: "کلینیک تا ۷ پزشک",
        amountToman: null,
        priceNote: "بر اساس تعداد پزشک",
        billing: "monthly",
        description:
          "هر پزشک نوبت، پرونده و گزارش جدای خودش را دارد. تعرفه در تماس با ما اعلام می‌شود.",
      },
    ],
  },
  {
    key: "website-design",
    title: "طراحی سایت",
    relatedHref: "/services/ai-website-design",
    tiers: [
      {
        key: "site-only",
        label: "سایت مطب",
        amountToman: 45_000_000,
        billing: "one_time",
      },
      {
        key: "site-blog",
        label: "سایت + بلاگ",
        amountToman: 78_000_000,
        billing: "one_time",
      },
      {
        key: "multi-specialty",
        label: "کلینیک چندتخصصی",
        amountToman: 135_000_000,
        priceNote: "از ۱۳۵,۰۰۰,۰۰۰ تومان",
        billing: "one_time",
        description:
          "قیمت شروع؛ بسته به تعداد تخصص و صفحات ممکن است فاکتور نهایی تعدیل شود.",
      },
    ],
  },
  {
    key: "seo-traffic",
    title: "سئو و ترافیک",
    relatedHref: "/services/medical-seo",
    note: "حداقل دوره‌ی قرارداد ۶ ماه. شامل محتوای تخصصی، سئوی فنی، بهینه‌سازی برای هوش مصنوعی و گزارش ماهانه.",
    tiers: [
      {
        key: "monthly",
        label: "پکیج ماهانه",
        amountToman: 50_000_000,
        priceNote: "از ۵۰,۰۰۰,۰۰۰ تومان",
        billing: "monthly",
      },
    ],
  },
];

export function getPackage(key: string) {
  return packages.find((p) => p.key === key);
}

export function getTier(packageKey: string, tierKey: string) {
  const pkg = getPackage(packageKey);
  return pkg?.tiers.find((t) => t.key === tierKey);
}

export function isBuyable(tier: PackageTier): tier is PackageTier & { amountToman: number } {
  return typeof tier.amountToman === "number" && tier.amountToman > 0;
}

export function formatToman(amount: number) {
  return `${amount.toLocaleString("fa-IR")} تومان`;
}

/**
 * نگاشت slug صفحه‌ی محصول/خدمت به تیرِ پیش‌فرضش برای دکمه‌ی «دریافت تعرفه»؛
 * کاربر را مستقیم به فرم خرید همان بسته می‌برد نه یک لیست عمومی.
 */
const SLUG_TO_DEFAULT_TIER: Record<string, { packageKey: string; tierKey: string }> = {
  "clinic-management": { packageKey: "clinic-automation", tierKey: "single-doctor" },
  "ai-website-design": { packageKey: "website-design", tierKey: "site-only" },
  "medical-seo": { packageKey: "seo-traffic", tierKey: "monthly" },
};

export function checkoutHrefForSlug(slug: string) {
  const mapped = SLUG_TO_DEFAULT_TIER[slug];
  return mapped ? `/checkout?package=${mapped.packageKey}&tier=${mapped.tierKey}` : "/pricing";
}
