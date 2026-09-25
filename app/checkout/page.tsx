import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";
import CheckoutForm from "./CheckoutForm";
import { packages, getPackage, getTier, isBuyable, formatToman } from "@/app/lib/packages";
import { contact } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "خرید بسته | مدیلینک",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ package?: string; tier?: string }> };

function PackagePicker() {
  return (
    <main>
      <PageHero
        badge="خرید آنلاین"
        title="کدام بسته را"
        highlight="می‌خواهید بخرید؟"
        description="یکی از بسته‌ها را انتخاب کنید تا به فرم پرداخت بروید."
      />
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {packages.map((pkg) => (
            <div key={pkg.key}>
              <h2 className="text-xl font-black text-ink-900 mb-4">{pkg.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pkg.tiers.map((tier) => (
                  <div
                    key={tier.key}
                    className="border border-cream-300 rounded-xl p-5 flex flex-col bg-cream-50"
                  >
                    <div className="font-bold text-ink-900 mb-1">{tier.label}</div>
                    <div className="text-sm text-ink-400 mb-4">
                      {isBuyable(tier)
                        ? `${formatToman(tier.amountToman)}${
                            tier.billing === "monthly" ? " / ماهانه" : ""
                          }`
                        : tier.priceNote ?? "استعلامی"}
                    </div>
                    {isBuyable(tier) ? (
                      <Link
                        href={`/checkout?package=${pkg.key}&tier=${tier.key}`}
                        className="mt-auto text-center gradient-primary text-white py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                      >
                        خرید
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="mt-auto text-center border-2 border-cream-300 text-ink-700 py-2.5 rounded-xl font-bold text-sm hover:border-brand-300 hover:text-brand-600 transition-colors"
                      >
                        درخواست استعلام قیمت
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { package: packageKey, tier: tierKey } = await searchParams;

  if (!packageKey || !tierKey) {
    return <PackagePicker />;
  }

  const pkg = getPackage(packageKey);
  const tier = getTier(packageKey, tierKey);

  if (!pkg || !tier || !isBuyable(tier)) {
    return (
      <main>
        <PageHero
          badge="خرید آنلاین"
          title="این بسته آنلاین"
          highlight="قابل خرید نیست"
          description="برای این مورد، ابتدا با تیم مدیلینک تماس بگیرید تا تعرفه‌ی دقیق را اعلام کنیم."
        />
        <div className="py-16 text-center space-y-4">
          <Link
            href="/contact"
            className="inline-block gradient-primary text-white py-3 px-8 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            رفتن به فرم تماس
          </Link>
          <div>
            <Link href="/checkout" className="text-sm text-ink-400 hover:text-brand-600">
              مشاهده‌ی همه‌ی بسته‌ها
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        badge="خرید آنلاین"
        title="تکمیل خرید"
        highlight={pkg.title}
        description="اطلاعات زیر را کامل کنید تا به درگاه پرداخت زرین‌پال منتقل شوید."
      />
      <section className="py-16 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="bg-white rounded-2xl p-8 shadow-sm border border-cream-200">
            <CheckoutForm pkg={pkg} tier={tier} />
          </Reveal>
          <p className="text-center text-xs text-ink-400 mt-6">
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
