import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { formatToman } from "@/app/lib/packages";
import { contact } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "پرداخت موفق | مدیلینک",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ order?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order: orderId } = await searchParams;

  const order = orderId
    ? await createAdminClient()
        .from("orders")
        .select("package_label, amount_toman, zarinpal_ref_id, status")
        .eq("id", orderId)
        .single()
        .then((res) => res.data)
    : null;

  const paid = order?.status === "paid";

  return (
    <main>
      <PageHero
        badge={paid ? "پرداخت موفق" : "وضعیت پرداخت"}
        title={paid ? "خرید شما" : "سفارش شما"}
        highlight={paid ? "با موفقیت ثبت شد" : "ثبت شد"}
        description={
          paid
            ? "تیم مدیلینک در کمتر از یک روز کاری برای راه‌اندازی با شما تماس می‌گیرد."
            : "برای پیگیری وضعیت پرداخت با پشتیبانی مدیلینک تماس بگیرید."
        }
      />
      <section className="py-16 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {order && (
            <div className="bg-cream-100 border border-cream-200 rounded-xl p-6 mb-6 text-right">
              <div className="text-sm text-ink-400 mb-1">بسته</div>
              <div className="font-bold text-ink-900 mb-4">{order.package_label}</div>
              <div className="text-sm text-ink-400 mb-1">مبلغ</div>
              <div className="font-bold text-ink-900 mb-4">
                {formatToman(order.amount_toman)}
              </div>
              {order.zarinpal_ref_id && (
                <>
                  <div className="text-sm text-ink-400 mb-1">کد پیگیری</div>
                  <div className="font-bold text-ink-900" dir="ltr">
                    {order.zarinpal_ref_id}
                  </div>
                </>
              )}
            </div>
          )}
          <Link
            href="/"
            className="inline-block gradient-primary text-white py-3 px-8 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            بازگشت به صفحه‌ی اصلی
          </Link>
          <p className="text-xs text-ink-400 mt-6">
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
