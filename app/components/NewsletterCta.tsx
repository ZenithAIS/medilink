import NewsletterForm from "./NewsletterForm";

export default function NewsletterCta() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-primary rounded-3xl px-8 py-14 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            تازه‌ترین مطالب را در ایمیل‌تان بگیرید
          </h2>
          <p className="text-white/85 max-w-xl mx-auto mb-6 leading-relaxed">
            ماهی یک ایمیل، بدون تبلیغات اضافه. هر زمان می‌توانید لغو کنید.
          </p>
          <div className="flex justify-center [&_label]:sr-only [&_form]:mt-0">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
