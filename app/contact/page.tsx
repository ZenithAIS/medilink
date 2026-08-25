import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import DemoForm from "@/app/components/DemoForm";

export const metadata: Metadata = {
  title: "تماس و درخواست دمو | مدیلینک",
  description:
    "فرم درخواست دموی رایگان مدیلینک. در کمتر از یک روز کاری با شما تماس می‌گیریم.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        badge="تماس با ما"
        title="دموی اختصاصی"
        highlight="کلینیک خود را ببینید"
        description="فرم را پر کنید تا در کمتر از یک روز کاری با شما تماس بگیریم و یک جلسه‌ی ۳۰ دقیقه‌ای متناسب با کلینیک شما برگزار کنیم."
      />
      <DemoForm />
    </main>
  );
}
