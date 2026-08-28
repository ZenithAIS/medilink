/**
 * موکاپ داشبورد محصول برای Hero صفحه‌ی خانه.
 *
 * SVG درون‌خطی است، نه فایل تصویر: حجمی روی شبکه اضافه نمی‌کند، در هر
 * رزولوشنی تیز می‌ماند و رنگ‌هایش با پالت برند یکی است. اگر بعداً
 * اسکرین‌شات واقعی محصول آماده شد، این کامپوننت با <Figure> جایگزین شود.
 */
export default function DashboardMockup({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      role="img"
      aria-label="نمای داشبورد مدیلینک: شاخص‌های کلینیک، نمودار مراجعات و فهرست نوبت‌ها"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="dm-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2793f" />
          <stop offset="100%" stopColor="#8b7bd8" />
        </linearGradient>
        <linearGradient id="dm-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2793f" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f2793f" stopOpacity="0" />
        </linearGradient>
        <clipPath id="dm-round">
          <rect x="0" y="0" width="800" height="600" rx="16" />
        </clipPath>
      </defs>

      <g clipPath="url(#dm-round)">
        <rect width="800" height="600" fill="#ffffff" />

        {/* نوار مرورگر */}
        <rect width="800" height="40" fill="#f8fafc" />
        <line x1="0" y1="40" x2="800" y2="40" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="28" cy="20" r="5" fill="#e2e8f0" />
        <circle cx="46" cy="20" r="5" fill="#e2e8f0" />
        <circle cx="64" cy="20" r="5" fill="#e2e8f0" />
        <rect x="300" y="12" width="200" height="16" rx="8" fill="#eef2f7" />

        {/* ستون کناری (راست، چون رابط RTL است) */}
        <rect x="640" y="40" width="160" height="560" fill="#0f172a" />
        <rect x="664" y="64" width="76" height="12" rx="6" fill="url(#dm-brand)" />
        {[112, 152, 192, 232, 272].map((y, i) => (
          <g key={y}>
            <rect
              x="656"
              y={y - 12}
              width="128"
              height="32"
              rx="8"
              fill={i === 0 ? "#1e293b" : "transparent"}
            />
            <rect
              x="762"
              y={y - 4}
              width="14"
              height="14"
              rx="4"
              fill={i === 0 ? "#f7a06a" : "#334155"}
            />
            <rect
              x={i === 0 ? 690 : 700}
              y={y + 1}
              width={i === 0 ? 64 : 54}
              height="8"
              rx="4"
              fill={i === 0 ? "#e2e8f0" : "#475569"}
            />
          </g>
        ))}

        {/* سربرگ صفحه */}
        <rect x="440" y="72" width="120" height="14" rx="7" fill="#0f172a" />
        <rect x="474" y="98" width="86" height="8" rx="4" fill="#cbd5e1" />
        <rect x="40" y="72" width="96" height="32" rx="8" fill="url(#dm-brand)" />

        {/* کارت‌های شاخص */}
        {[
          { x: 400, label: "مراجعات", w: 52, accent: "#f2793f" },
          { x: 220, label: "نوبت‌ها", w: 44, accent: "#33a877" },
          { x: 40, label: "درآمد", w: 60, accent: "#8b7bd8" },
        ].map((c) => (
          <g key={c.x}>
            <rect
              x={c.x}
              y="132"
              width="160"
              height="88"
              rx="12"
              fill="#ffffff"
              stroke="#e2e8f0"
            />
            <rect x={c.x + 110} y="152" width="30" height="30" rx="8" fill={c.accent} opacity="0.12" />
            <circle cx={c.x + 125} cy="167" r="7" fill={c.accent} opacity="0.55" />
            <rect x={c.x + 20} y="156" width={c.w} height="8" rx="4" fill="#94a3b8" />
            <rect x={c.x + 20} y="176" width="72" height="18" rx="5" fill="#0f172a" />
            <rect x={c.x + 20} y="202" width="40" height="6" rx="3" fill="#22c55e" opacity="0.6" />
          </g>
        ))}

        {/* نمودار مراجعات */}
        <rect x="220" y="244" width="340" height="200" rx="12" fill="#ffffff" stroke="#e2e8f0" />
        <rect x="460" y="266" width="80" height="10" rx="5" fill="#0f172a" />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="244"
            y1={310 + i * 30}
            x2="536"
            y2={310 + i * 30}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}
        <path
          d="M244 400 L280 384 L316 392 L352 358 L388 366 L424 330 L460 340 L496 306 L536 296 L536 430 L244 430 Z"
          fill="url(#dm-area)"
        />
        <path
          d="M244 400 L280 384 L316 392 L352 358 L388 366 L424 330 L460 340 L496 306 L536 296"
          fill="none"
          stroke="#f2793f"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="536" cy="296" r="5" fill="#f2793f" stroke="#ffffff" strokeWidth="2.5" className="animate-blink-soft" />

        {/* فهرست نوبت‌های امروز */}
        <rect x="40" y="244" width="160" height="200" rx="12" fill="#ffffff" stroke="#e2e8f0" />
        <rect x="120" y="266" width="60" height="10" rx="5" fill="#0f172a" />
        {[300, 336, 372, 408].map((y, i) => (
          <g key={y}>
            <circle cx="168" cy={y + 8} r="10" fill="#fdeadf" />
            <circle cx="168" cy={y + 8} r="4" fill="#f2793f" opacity="0.7" />
            <rect x={i === 3 ? 96 : 84} y={y + 1} width={i === 3 ? 56 : 68} height="7" rx="3.5" fill="#334155" />
            <rect x="112" y={y + 14} width="40" height="6" rx="3" fill="#cbd5e1" />
            <rect
              x="56"
              y={y + 2}
              width="22"
              height="14"
              rx="7"
              fill={i === 0 ? "#dcfce7" : "#f1f5f9"}
            />
          </g>
        ))}

        {/* کارت ربات پاسخ‌گو */}
        <rect x="40" y="468" width="520" height="104" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
        <rect x="500" y="492" width="36" height="36" rx="10" fill="url(#dm-brand)" />
        <circle cx="512" cy="508" r="3" fill="#ffffff" />
        <circle cx="524" cy="508" r="3" fill="#ffffff" />
        <rect x="510" y="516" width="16" height="3" rx="1.5" fill="#ffffff" opacity="0.85" />
        <rect x="330" y="494" width="150" height="9" rx="4.5" fill="#334155" />
        <rect x="270" y="514" width="210" height="7" rx="3.5" fill="#cbd5e1" />
        <rect x="360" y="530" width="120" height="7" rx="3.5" fill="#cbd5e1" />
        <rect x="64" y="536" width="92" height="24" rx="12" fill="#f2793f" opacity="0.12" />
        <rect x="80" y="544" width="60" height="8" rx="4" fill="#f2793f" opacity="0.75" />
      </g>

      <rect x="0.5" y="0.5" width="799" height="599" rx="16" fill="none" stroke="#e2e8f0" />
    </svg>
  );
}
