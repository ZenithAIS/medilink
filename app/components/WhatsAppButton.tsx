import { IconWhatsApp } from "./Icons";

/* شماره‌ی واقعی واتساپ را در NEXT_PUBLIC_WHATSAPP_NUMBER تنظیم کنید (فرمت بین‌المللی بدون +). */
const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "989120000000";
const text = encodeURIComponent(
  "سلام، برای دریافت دمو سیستم‌های مدی‌لینک تماس گرفتم."
);

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="گفتگو در واتساپ"
      className="fixed bottom-5 left-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
    >
      <IconWhatsApp className="w-7 h-7" />
    </a>
  );
}
