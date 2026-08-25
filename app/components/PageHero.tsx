export default function PageHero({
  badge,
  title,
  highlight,
  description,
}: {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 bg-gray-50 border-b border-gray-100">
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
            {badge}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
          {title}
          {highlight && (
            <>
              <br />
              <span className="gradient-text">{highlight}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
