import type { CSSProperties } from "react";
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
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <span
        aria-hidden
        className="animate-pulse-ring absolute inset-0 rounded-full"
        style={
          {
            "--pulse-color": "rgba(37,211,102,.45)",
            "--pulse-color-fade": "rgba(37,211,102,0)",
          } as CSSProperties
        }
      ></span>
      <IconWhatsApp className="w-7 h-7" />
    </a>
  );
}
