import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** آیکون صفحه‌ی اصلی آیفون/آیپد؛ iOS خودش گوشه‌ها را گرد می‌کند. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f2793f 0%, #f7a06a 100%)",
        }}
      >
        <svg width="96" height="96" viewBox="0 0 24 24">
          <path
            d="M12 5v14M5 12h14"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
