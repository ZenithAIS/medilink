export default function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex items-center justify-between cursor-pointer list-none text-base font-bold text-gray-900">
            {item.q}
            <span
              aria-hidden
              className="ms-4 shrink-0 text-sky-600 text-xl leading-none transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-gray-500 text-sm leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
