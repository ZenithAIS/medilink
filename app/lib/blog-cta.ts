// پیشنهاد محصولِ مرتبط با هر مقاله برای کادر «درخواست دمو» انتهای پست.
// فقط بر اساس slug و دسته انتخاب می‌شود؛ هیچ منطق فرمی اینجا نیست.
export type BlogCta = { href: string; label: string; title: string; text: string };

const RULES: { test: RegExp; cta: BlogCta }[] = [
  {
    test: /no-show|appointment|booking|prepaid|waitlist|نوبت/i,
    cta: {
      href: "/products/appointment-automation",
      label: "نرم‌افزار نوبت‌دهی آنلاین مدیلینک",
      title: "نوبت‌دهی آنلاین و یادآوری خودکار را همین هفته راه بیندازید",
      text: "رزرو ۲۴ ساعته، یادآوری پیامکی و پر کردن خودکار جای خالی نوبت‌ها؛ در دمو روی تقویم کلینیک خودتان نشان می‌دهیم.",
    },
  },
  {
    test: /sms|reminder|loyalty|re-engage|پیامک|وفاداری/i,
    cta: {
      href: "/products/sms-automation",
      label: "سامانه‌ی پیامک خودکار کلینیک",
      title: "بیماران غیرفعال را با پیامک هوشمند برگردانید",
      text: "یادآوری چکاپ، پیام تولد و پیگیری بعد از درمان، بدون اینکه منشی دستی کاری کند.",
    },
  },
  {
    test: /(^|[-\s])ai([-\s]|$)|chatbot|voice|triage|reception|assistant|هوش|ربات|تریاژ|منشی/i,
    cta: {
      href: "/products/ai-assistant",
      label: "دستیار هوشمند و ربات پاسخ‌گوی مدیلینک",
      title: "منشی هوشمندی که ۲۴ ساعته جواب بیماران را می‌دهد",
      text: "پاسخ به سؤال‌های تکراری، ثبت نوبت و ارجاع درست بیمار؛ در دمو با سؤال‌های واقعی کلینیک شما تست می‌کنیم.",
    },
  },
  {
    test: /kpi|financial|dashboard|report|(^|[-\s])bi([-\s]|$)|multi-branch|مالی|داشبورد|گزارش/i,
    cta: {
      href: "/products/medical-bi",
      label: "داشبورد و گزارش مدیریتی کلینیک",
      title: "همه‌ی عددهای کلینیک را در یک داشبورد ببینید",
      text: "درآمد، نرخ عدم‌حضور و بار کاری هر پزشک و شعبه، لحظه‌ای و بدون فایل اکسل.",
    },
  },
  {
    test: /seo|marketing|acquisition|google|instagram|سئو|بازاریابی|جذب/i,
    cta: {
      href: "/services/medical-seo",
      label: "خدمات سئوی پزشکی مدیلینک",
      title: "بیمار جدید را از گوگل بگیرید",
      text: "سئوی محلی، گوگل مپ و محتوای پزشکی معتبر برای اینکه بیمار شما را پیدا کند، نه رقیب را.",
    },
  },
];

const DEFAULT_CTA: BlogCta = {
  href: "/products/clinic-management",
  label: "نرم‌افزار مدیریت مطب و کلینیک مدیلینک",
  title: "می‌خواهید این‌ها را در کلینیک خودتان پیاده کنید؟",
  text: "پرونده‌ی بیمار، نوبت، پرداخت و گزارش در یک پنل؛ در یک جلسه‌ی دمو نشان می‌دهیم مدیلینک کدام بخش کار شما را خودکار می‌کند.",
};

export function ctaForPost(slug: string, category = ""): BlogCta {
  const key = `${slug} ${category}`;
  return RULES.find((r) => r.test.test(key))?.cta ?? DEFAULT_CTA;
}
