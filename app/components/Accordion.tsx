export default function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="divide-y divide-cream-300 border-y border-cream-300">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex items-center justify-between cursor-pointer list-none text-base font-bold text-ink-900">
            {item.q}
            <span
              aria-hidden
              className="ms-4 shrink-0 text-brand-600 text-xl leading-none transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-ink-400 text-sm leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
