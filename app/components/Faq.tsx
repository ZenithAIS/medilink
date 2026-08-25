import Link from "next/link";
import Accordion from "./Accordion";
import { faqGroups } from "@/app/lib/faq";

/* سکشن صفحه‌ی خانه: پرتکرارترین پرسش‌ها؛ فهرست کامل در /faq است. */
const highlights = [
  ...faqGroups[0].items.slice(0, 2),
  ...faqGroups[1].items.slice(0, 1),
  ...faqGroups[2].items.slice(0, 1),
  ...faqGroups[3].items.slice(0, 1),
];

export default function Faq() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            سوالات متداول
          </h2>
        </div>

        <Accordion items={highlights} />

        <p className="text-center mt-8">
          <Link
            href="/faq"
            className="text-sky-600 font-bold text-sm hover:underline"
          >
            مشاهده‌ی همه‌ی سوالات
          </Link>
        </p>
      </div>
    </section>
  );
}
