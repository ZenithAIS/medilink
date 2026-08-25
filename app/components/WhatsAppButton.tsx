import { IconWhatsApp } from "./Icons";
import { contact } from "@/app/lib/site";

const text = encodeURIComponent(
  "سلام، برای دریافت دمو سیستم‌های مدیلینک تماس گرفتم."
);

export default function WhatsAppButton() {
  return (
    <a
      href={`${contact.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="گفتگو در واتساپ"
      className="fixed bottom-5 left-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
    >
      <IconWhatsApp className="w-7 h-7" />
    </a>
  );
}
