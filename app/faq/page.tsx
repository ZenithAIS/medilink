import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import Accordion from "@/app/components/Accordion";
import FinalCta from "@/app/components/FinalCta";
import { faqGroups } from "@/app/lib/faq";
import { siteUrl } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "سوالات متداول | مدیلینک",
  description:
    "پاسخ پرسش‌های رایج درباره‌ی راه‌اندازی، محصولات، امنیت داده‌ی بیمار و تعرفه‌های مدیلینک.",
  alternates: { canonical: "/faq" },
};

/* اسکیمای FAQPage برای نمایش ریچ‌اسنیپت در نتایج گوگل — بند ۶ بریف. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteUrl}/faq`,
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <main>
      <PageHero
        badge="سوالات متداول"
        title="هر چیزی که"
        highlight="ممکن است بپرسید"
        description="اگر پاسخ پرسش‌تان اینجا نبود، در جلسه‌ی دمو یا از راه تماس بپرسید."
      />

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {faqGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-3xl font-black text-gray-900 mb-6">
                {group.title}
              </h2>
              <Accordion items={group.items} />
            </div>
          ))}
        </div>
      </section>

      <FinalCta
        title="پاسخ‌تان را پیدا نکردید؟"
        description="در جلسه‌ی دمو هر پرسشی درباره‌ی کلینیک خودتان دارید مطرح کنید."
        cta="تماس با ما"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
