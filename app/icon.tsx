import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * فاویکون برندشده — قبل از این، سایت همان آیکون پیش‌فرض Next.js را
 * داشت (از زمان اسکلت اولیه، هرگز عوض نشده بود).
 *
 * فقط نشان هندسی است، بدون متن: در ۳۲ پیکسل هیچ حرفی خوانا نیست و
 * فونت فارسی هم برای این‌قدر ریز نیازی ندارد.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f2793f 0%, #f7a06a 100%)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M12 5v14M5 12h14"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
