/**
 * کاور برداری مقالات بلاگ.
 *
 * هر دسته‌بندی نقش‌مایه و پالت خودش را دارد تا مقالات در فهرست از هم
 * تفکیک شوند. جایگزین موقت تصویر شاخص واقعی است؛ به‌محض اینکه فیلد
 * cover در app/lib/blog.ts مقدار بگیرد، تصویر واقعی جای این را می‌گیرد.
 */

type Motif = "calendar" | "network" | "shield" | "chart";

const THEMES: Record<string, { from: string; to: string; ink: string; motif: Motif }> = {
  "مدیریت کلینیک": { from: "#f2793f", to: "#b84f22", ink: "#fdeadf", motif: "calendar" },
  "هوش مصنوعی": { from: "#8b7bd8", to: "#6f5ec4", ink: "#eef0fb", motif: "network" },
  "امنیت و حریم خصوصی": { from: "#33a877", to: "#279268", ink: "#e6f5ee", motif: "shield" },
  "تحلیل داده": { from: "#e0a13a", to: "#c2812c", ink: "#fcf2dd", motif: "chart" },
};

const FALLBACK = { from: "#f2793f", to: "#8b7bd8", ink: "#fdeadf", motif: "network" as Motif };

export default function BlogCover({
  category,
  className = "",
}: {
  category: string;
  className?: string;
}) {
  const t = THEMES[category] ?? FALLBACK;
  const id = category.replace(/[^\p{L}]/gu, "").slice(0, 12) || "default";

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`تصویر شاخص دسته‌ی ${category}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.from} />
          <stop offset="100%" stopColor={t.to} />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill={`url(#bg-${id})`} />

      {/* هاله‌های نرم پس‌زمینه */}
      <circle cx="690" cy="70" r="150" fill="#ffffff" opacity="0.07" />
      <circle cx="110" cy="440" r="190" fill="#000000" opacity="0.06" />

      <g opacity="0.9" stroke={t.ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {t.motif === "calendar" && (
          <g transform="translate(300 130)" strokeWidth="5">
            <rect x="0" y="18" width="200" height="170" rx="16" opacity="0.9" />
            <path d="M0 68 H200" opacity="0.9" />
            <path d="M52 0 V36 M148 0 V36" opacity="0.9" />
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <circle
                  key={`${r}-${c}`}
                  cx={34 + c * 44}
                  cy={100 + r * 34}
                  r="6"
                  fill={t.ink}
                  stroke="none"
                  opacity={r === 1 && c === 2 ? 1 : 0.4}
                />
              ))
            )}
            <path d="M118 134 l12 12 l24 -26" strokeWidth="6" opacity="1" />
          </g>
        )}

        {t.motif === "network" && (
          <g transform="translate(300 140)" strokeWidth="4">
            <path d="M100 20 L20 90 M100 20 L180 90 M20 90 L100 160 M180 90 L100 160 M100 20 L100 160 M20 90 L180 90" opacity="0.55" />
            {[
              [100, 20],
              [20, 90],
              [180, 90],
              [100, 160],
              [100, 90],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={i === 4 ? 22 : 13}
                fill={i === 4 ? t.ink : "#ffffff"}
                stroke="none"
                opacity={i === 4 ? 1 : 0.85}
              />
            ))}
          </g>
        )}

        {t.motif === "shield" && (
          <g transform="translate(320 125)" strokeWidth="5">
            <path d="M80 0 L160 32 V96 c0 48 -34 82 -80 96 c-46 -14 -80 -48 -80 -96 V32 Z" opacity="0.9" />
            <path d="M48 96 l22 22 l44 -48" strokeWidth="7" />
          </g>
        )}

        {t.motif === "chart" && (
          <g transform="translate(290 130)" strokeWidth="5">
            <path d="M10 190 H230 M10 190 V10" opacity="0.75" />
            {[
              [46, 120],
              [96, 74],
              [146, 100],
              [196, 40],
            ].map(([x, y], i) => (
              <rect
                key={i}
                x={x}
                y={y}
                width="30"
                height={190 - y}
                rx="6"
                fill={t.ink}
                stroke="none"
                opacity={i === 3 ? 1 : 0.55}
              />
            ))}
            <path d="M46 108 L111 62 L161 88 L211 28" strokeWidth="5" opacity="0.95" />
            <circle cx="211" cy="28" r="8" fill="#ffffff" stroke="none" />
          </g>
        )}
      </g>
    </svg>
  );
}
