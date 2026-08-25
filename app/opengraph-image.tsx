import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "مدیلینک | سیستم‌های هوش مصنوعی و اتوماسیون کلینیکی و پزشکی";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * تصویر Open Graph برای اشتراک‌گذاری لینک در واتساپ، تلگرام و شبکه‌های
 * اجتماعی — بند ۵ بریف.
 *
 * عمداً فقط نام برند و دامنه را نشان می‌دهد: موتور رندر (satori) ترتیب
 * کلمات فارسیِ مرکب را در انتهای هر خط جابه‌جا می‌کند و جمله‌ی چندکلمه‌ای
 * غلط از آب درمی‌آید. نام تک‌کلمه‌ای و متن لاتین سالم رندر می‌شوند.
 * برای تصویر طراحی‌شده‌ی کامل، فایل آماده را در public/images/og.png
 * بگذارید و این فایل را حذف کنید.
 */
export default async function Image() {
  // ImageResponse فقط TTF/OTF می‌پذیرد، نه woff2.
  const font = await readFile(
    join(process.cwd(), "app/fonts/Shabnam-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 128 }}>مدیلینک</div>
        <div
          style={{
            fontSize: 40,
            opacity: 0.9,
            marginTop: 16,
            letterSpacing: 2,
          }}
        >
          medilink.ir
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            background: "white",
            opacity: 0.5,
            borderRadius: 3,
            marginTop: 44,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Shabnam", data: font, style: "normal", weight: 700 }],
    }
  );
}
