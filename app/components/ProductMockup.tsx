/**
 * موکاپ برداری Hero صفحات محصول.
 *
 * برای هر محصول یک نمای متفاوت از رابط کاربری می‌کشد تا پنج صفحه شبیه هم
 * نباشند. عمداً بدون متن خوانا است: این تصویر تبلیغاتی است، نه اسکرین‌شات
 * واقعی، و نباید چنین ادعایی بسازد. با مقداردهی `image` در
 * app/lib/products.ts، اسکرین‌شات واقعی جای این را می‌گیرد.
 */
export default function ProductMockup({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const uid = slug.replace(/[^a-z]/g, "");

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      role="img"
      aria-label="نمای نمونه از رابط کاربری محصول"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`pm-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id={`pm-area-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`pm-clip-${uid}`}>
          <rect width="800" height="600" rx="16" />
        </clipPath>
      </defs>

      <g clipPath={`url(#pm-clip-${uid})`}>
        <rect width="800" height="600" fill="#ffffff" />
        <rect width="800" height="40" fill="#f8fafc" />
        <line x1="0" y1="40" x2="800" y2="40" stroke="#e2e8f0" />
        <circle cx="28" cy="20" r="5" fill="#e2e8f0" />
        <circle cx="46" cy="20" r="5" fill="#e2e8f0" />
        <circle cx="64" cy="20" r="5" fill="#e2e8f0" />

        {/* سربرگ مشترک */}
        <rect x="580" y="72" width="180" height="14" rx="7" fill="#0f172a" />
        <rect x="620" y="98" width="140" height="8" rx="4" fill="#cbd5e1" />
        <rect x="40" y="70" width="110" height="34" rx="9" fill={`url(#pm-${uid})`} />

        {slug === "clinic-management" && (
          <g>
            {[0, 1, 2].map((c) =>
              [0, 1, 2, 3, 4].map((r) => (
                <rect
                  key={`${c}-${r}`}
                  x={40 + c * 245}
                  y={150 + r * 84}
                  width="225"
                  height="66"
                  rx="10"
                  fill={r === 0 && c === 2 ? "#f0f9ff" : "#ffffff"}
                  stroke={r === 0 && c === 2 ? "#bae6fd" : "#e2e8f0"}
                />
              ))
            )}
            {[0, 1, 2].map((c) =>
              [0, 1, 2, 3, 4].map((r) => (
                <g key={`i-${c}-${r}`}>
                  <circle cx={40 + c * 245 + 195} cy={150 + r * 84 + 33} r="13" fill="#e0f2fe" />
                  <rect x={40 + c * 245 + 30} y={150 + r * 84 + 20} width="120" height="8" rx="4" fill="#334155" />
                  <rect x={40 + c * 245 + 60} y={150 + r * 84 + 38} width="90" height="7" rx="3.5" fill="#cbd5e1" />
                </g>
              ))
            )}
          </g>
        )}

        {slug === "appointment-automation" && (
          <g>
            <rect x="40" y="150" width="720" height="410" rx="14" fill="#ffffff" stroke="#e2e8f0" />
            {[0, 1, 2, 3, 4, 5, 6].map((c) => (
              <rect key={c} x={68 + c * 98} y="176" width="72" height="10" rx="5" fill="#94a3b8" />
            ))}
            {[0, 1, 2, 3, 4].map((r) =>
              [0, 1, 2, 3, 4, 5, 6].map((c) => {
                const busy = (r + c) % 3 === 0;
                const hi = r === 2 && c === 4;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={68 + c * 98}
                    y={206 + r * 68}
                    width="72"
                    height="52"
                    rx="9"
                    fill={hi ? "#0ea5e9" : busy ? "#e0f2fe" : "#f8fafc"}
                    stroke={hi ? "#0284c7" : "#eef2f7"}
                  />
                );
              })
            )}
          </g>
        )}

        {slug === "ai-assistant" && (
          <g>
            <rect x="40" y="150" width="720" height="410" rx="14" fill="#f8fafc" stroke="#e2e8f0" />
            {[
              { y: 186, w: 300, me: false },
              { y: 262, w: 240, me: true },
              { y: 338, w: 340, me: false },
              { y: 430, w: 200, me: true },
            ].map((m, i) => (
              <g key={i}>
                <rect
                  x={m.me ? 90 : 760 - m.w - 30}
                  y={m.y}
                  width={m.w}
                  height={m.me ? 56 : 62}
                  rx="14"
                  fill={m.me ? `url(#pm-${uid})` : "#ffffff"}
                  stroke={m.me ? "none" : "#e2e8f0"}
                />
                <rect
                  x={(m.me ? 90 : 760 - m.w - 30) + 22}
                  y={m.y + 18}
                  width={m.w - 70}
                  height="8"
                  rx="4"
                  fill={m.me ? "#ffffff" : "#cbd5e1"}
                  opacity={m.me ? 0.9 : 1}
                />
                <rect
                  x={(m.me ? 90 : 760 - m.w - 30) + 22}
                  y={m.y + 34}
                  width={(m.w - 70) * 0.6}
                  height="8"
                  rx="4"
                  fill={m.me ? "#ffffff" : "#e2e8f0"}
                  opacity={m.me ? 0.65 : 1}
                />
              </g>
            ))}
            <rect x="90" y="506" width="640" height="40" rx="20" fill="#ffffff" stroke="#e2e8f0" />
            <circle cx="700" cy="526" r="13" fill={`url(#pm-${uid})`} />
          </g>
        )}

        {slug === "sms-automation" && (
          <g>
            <rect x="430" y="150" width="330" height="410" rx="14" fill="#ffffff" stroke="#e2e8f0" />
            <rect x="470" y="180" width="180" height="12" rx="6" fill="#0f172a" />
            {[0, 1, 2, 3, 4].map((r) => (
              <g key={r}>
                <rect x="460" y={220 + r * 64} width="270" height="48" rx="10" fill="#f8fafc" stroke="#eef2f7" />
                <circle cx="700" cy={220 + r * 64 + 24} r="10" fill={r < 3 ? "#22c55e" : "#cbd5e1"} opacity="0.35" />
                <rect x="500" y={220 + r * 64 + 14} width="150" height="8" rx="4" fill="#334155" />
                <rect x="540" y={220 + r * 64 + 30} width="110" height="6" rx="3" fill="#cbd5e1" />
              </g>
            ))}
            <rect x="40" y="150" width="360" height="410" rx="14" fill="#ffffff" stroke="#e2e8f0" />
            <rect x="240" y="180" width="130" height="12" rx="6" fill="#0f172a" />
            <path
              d="M70 480 L130 452 L190 462 L250 410 L310 424 L370 356"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M70 480 L130 452 L190 462 L250 410 L310 424 L370 356 L370 520 L70 520 Z"
              fill={`url(#pm-area-${uid})`}
            />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={70 + i * 105} y={220 + 0} width="90" height="70" rx="10" fill="#f8fafc" stroke="#eef2f7" />
            ))}
          </g>
        )}

        {slug === "medical-bi" && (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={40 + i * 182} y="140" width="162" height="92" rx="12" fill="#ffffff" stroke="#e2e8f0" />
                <rect x={60 + i * 182} y="164" width="54" height="8" rx="4" fill="#94a3b8" />
                <rect x={60 + i * 182} y="184" width="84" height="20" rx="6" fill="#0f172a" />
                <rect x={60 + i * 182} y="212" width="40" height="6" rx="3" fill="#22c55e" opacity="0.6" />
              </g>
            ))}
            <rect x="40" y="256" width="470" height="304" rx="14" fill="#ffffff" stroke="#e2e8f0" />
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="70" y1={320 + i * 60} x2="480" y2={320 + i * 60} stroke="#f1f5f9" />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const h = [110, 170, 140, 210, 180, 250][i];
              return (
                <rect
                  key={i}
                  x={80 + i * 66}
                  y={530 - h}
                  width="42"
                  height={h}
                  rx="8"
                  fill={i === 5 ? `url(#pm-${uid})` : "#e0f2fe"}
                />
              );
            })}
            <rect x="530" y="256" width="230" height="304" rx="14" fill="#ffffff" stroke="#e2e8f0" />
            <circle cx="645" cy="366" r="66" fill="none" stroke="#e0f2fe" strokeWidth="26" />
            <circle
              cx="645"
              cy="366"
              r="66"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="26"
              strokeDasharray="290 415"
              strokeLinecap="round"
              transform="rotate(-90 645 366)"
            />
            {[0, 1, 2].map((r) => (
              <g key={r}>
                <rect x="560" y={470 + r * 30} width="12" height="12" rx="3" fill={["#0ea5e9", "#6366f1", "#e0f2fe"][r]} />
                <rect x="584" y={473 + r * 30} width="120" height="7" rx="3.5" fill="#cbd5e1" />
              </g>
            ))}
          </g>
        )}
      </g>

      <rect x="0.5" y="0.5" width="799" height="599" rx="16" fill="none" stroke="#e2e8f0" />
    </svg>
  );
}
