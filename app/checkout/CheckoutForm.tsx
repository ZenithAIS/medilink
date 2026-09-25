"use client";

import { useActionState } from "react";
import { startCheckout, type CheckoutState } from "@/app/actions/checkout";
import type { PackageTier, SellablePackage } from "@/app/lib/packages";
import { formatToman } from "@/app/lib/packages";

const initialState: CheckoutState = { status: "idle" };

export default function CheckoutForm({
  pkg,
  tier,
}: {
  pkg: SellablePackage;
  tier: PackageTier & { amountToman: number };
}) {
  const [state, formAction, pending] = useActionState(startCheckout, initialState);

  const inputClass = (error?: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors disabled:opacity-60 ${
      error
        ? "border-bad-300 focus:border-bad-400"
        : "border-cream-300 focus:border-brand-300"
    }`;

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="packageKey" value={pkg.key} />
      <input type="hidden" name="tierKey" value={tier.key} />

      <div className="bg-cream-100 border border-cream-200 rounded-xl p-4 mb-2">
        <div className="text-xs text-ink-400 mb-1">{pkg.title}</div>
        <div className="text-base font-bold text-ink-900">{tier.label}</div>
        <div className="mt-2 text-2xl font-black gradient-text">
          {formatToman(tier.amountToman)}
          <span className="text-sm font-medium text-ink-400 mr-1">
            {tier.billing === "monthly" ? "/ ماهانه" : "/ یک‌باره"}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="contactName" className="block text-sm font-medium text-ink-700 mb-1">
          نام و نام خانوادگی
        </label>
        <input
          id="contactName"
          name="contactName"
          type="text"
          placeholder="دکتر احمدی"
          required
          disabled={pending}
          aria-invalid={state.fieldErrors?.contactName ? true : undefined}
          className={inputClass(state.fieldErrors?.contactName)}
        />
        {state.fieldErrors?.contactName && (
          <p className="mt-1 text-xs text-bad-500">{state.fieldErrors.contactName}</p>
        )}
      </div>

      <div>
        <label htmlFor="clinicName" className="block text-sm font-medium text-ink-700 mb-1">
          نام مطب یا کلینیک
        </label>
        <input
          id="clinicName"
          name="clinicName"
          type="text"
          placeholder="کلینیک دی"
          required
          disabled={pending}
          aria-invalid={state.fieldErrors?.clinicName ? true : undefined}
          className={inputClass(state.fieldErrors?.clinicName)}
        />
        {state.fieldErrors?.clinicName && (
          <p className="mt-1 text-xs text-bad-500">{state.fieldErrors.clinicName}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink-700 mb-1">
          شماره تماس
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder="۰۹۱۲۰۰۰۰۰۰۰"
          required
          disabled={pending}
          aria-invalid={state.fieldErrors?.phone ? true : undefined}
          className={inputClass(state.fieldErrors?.phone)}
        />
        {state.fieldErrors?.phone && (
          <p className="mt-1 text-xs text-bad-500">{state.fieldErrors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-1">
          ایمیل <span className="text-ink-400">(اختیاری، برای فاکتور)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="clinic@example.com"
          disabled={pending}
          dir="ltr"
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          className={inputClass(state.fieldErrors?.email)}
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs text-bad-500">{state.fieldErrors.email}</p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <div role="alert" className="bg-bad-50 border border-bad-200 text-bad-600 text-sm rounded-xl px-4 py-3">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full gradient-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "در حال اتصال به درگاه..." : "پرداخت و رفتن به درگاه"}
      </button>

      <p className="text-xs text-ink-400 text-center leading-relaxed">
        پرداخت از طریق درگاه امن زرین‌پال انجام می‌شود.
        {tier.billing === "monthly" && " این پرداخت برای دوره‌ی اول است؛ تمدید ماهانه جداگانه اطلاع‌رسانی می‌شود."}
      </p>
    </form>
  );
}
