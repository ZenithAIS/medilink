import { FLOW_ICONS, type Product } from "@/app/lib/products";

/**
 * دیاگرام جریان کار محصول برای سکشن «نمونه استفاده» — بند ۴ بریف.
 *
 * در دسکتاپ افقی و از راست به چپ (جهت طبیعی فارسی)، در موبایل عمودی.
 * فلش‌ها با CSS ساخته می‌شوند تا متن فارسی داخل گره‌ها درست شکل بگیرد؛
 * متن فارسی داخل SVG در بعضی موتورها بد رندر می‌شود.
 */
export default function FlowDiagram({ flow }: { flow: Product["flow"] }) {
  return (
    <ol className="flex flex-col sm:flex-row items-stretch gap-3">
      {flow.map((node, i) => {
        const Icon = FLOW_ICONS[node.icon];
        const last = i === flow.length - 1;

        return (
          <li key={node.label} className="flex sm:flex-col items-center flex-1 gap-3">
            <div
              className={`w-full rounded-2xl border p-4 text-center ${
                last
                  ? "border-sky-200 bg-sky-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span
                className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${
                  last
                    ? "gradient-primary text-white"
                    : "bg-gray-50 text-sky-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="block text-sm font-bold text-gray-900">
                {node.label}
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                {node.note}
              </span>
            </div>

            {!last && (
              <span
                aria-hidden
                className="shrink-0 text-sky-300 sm:-mx-1 sm:self-center"
              >
                {/* موبایل: فلش رو به پایین — دسکتاپ: رو به چپ (ادامه‌ی جریان در RTL) */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 rotate-90 sm:rotate-0"
                >
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
