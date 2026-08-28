/**
 * نشان هندسی برند، هم‌طرح با فاویکون (app/icon.tsx) — مربع گرد با
 * گرادیانت برند و علامت +. تا پیش از این، لوگو فقط متن «مدیلینک» بود
 * بدون هیچ نشانه‌ای، که کنار نوار ناوبری خالی به‌نظر می‌رسید.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`gradient-primary inline-flex shrink-0 items-center justify-center rounded-lg ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]">
        <path
          d="M12 5v14M5 12h14"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
