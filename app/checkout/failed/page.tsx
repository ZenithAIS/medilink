import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import { contact } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "پرداخت ناموفق | مدیلینک",
  robots: { index: false, follow: false },
};

export default function CheckoutFailedPage() {
  return (
    <main>
      <PageHero
        badge="پرداخت ناموفق"
        title="پرداخت شما"
        highlight="انجام نشد"
        description="مبلغی از حساب شما کسر نشده است. می‌توانید دوباره تلاش کنید یا با پشتیبانی تماس بگیرید."
      />
      <section className="py-16 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Link
            href="/checkout"
            className="inline-block gradient-primary text-white py-3 px-8 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            تلاش دوباره
          </Link>
          <p className="text-xs text-ink-400">
            سوالی دارید؟{" "}
            <a href={contact.phoneHref} className="text-brand-600 hover:underline" dir="ltr">
              {contact.phone}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
