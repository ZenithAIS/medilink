/* TODO(asset): لوگوی کلینیک‌های مشتری، نسخه‌ی خاکستری یکدست — بند ۵ بریف */
const clients = [
  "کلینیک آرتا",
  "مرکز درمانی نوین",
  "کلینیک سپید",
  "پلی‌کلینیک پارسیان",
  "دندانپزشکی مهر",
];

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-gray-100 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 mb-8">
          مورد اعتماد کلینیک‌های برتر
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {clients.map((client) => (
            <li
              key={client}
              className="h-10 px-5 flex items-center rounded-lg bg-white border border-gray-200 text-sm font-medium text-gray-400 grayscale"
            >
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
