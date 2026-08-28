"use client";
import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions/leads";
import { CLINIC_TYPES } from "@/app/lib/clinic-types";
import { IconShield } from "./Icons";
import { contact, socials } from "@/app/lib/site";
import Reveal from "./Reveal";

const initialState: LeadState = { status: "idle" };

const CONTACT = [
  { title: "تلفن و واتساپ", value: contact.phone, href: contact.phoneHref },
  { title: "ایمیل", value: contact.email, href: `mailto:${contact.email}` },
  { title: "آدرس", value: contact.address },
];

export default function DemoForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  const inputClass = (error?: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors disabled:opacity-60 ${
      error
        ? "border-bad-300 focus:border-bad-400"
        : "border-cream-300 focus:border-brand-300"
    }`;

  return (
    <section id="demo" className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <h2 className="text-2xl font-black text-ink-900 mb-6">
              راه‌های ارتباطی
            </h2>

            <dl className="space-y-4 mb-8">
              {CONTACT.map((item) => (
                <div key={item.title}>
                  <dt className="text-xs text-ink-400">{item.title}</dt>
                  <dd className="text-sm font-medium text-ink-700">
                    {item.href ? (
                      <a href={item.href} className="hover:text-brand-600" dir="ltr">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="flex flex-wrap gap-2 mb-8">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-cream-300 bg-white px-3 py-2 text-xs font-medium text-ink-700 transition-colors hover:border-brand-200 hover:text-brand-600"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-3 bg-white border border-cream-300 rounded-xl p-4">
              <IconShield className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <p className="text-sm text-ink-700 leading-relaxed">
                پاسخ‌گویی در کمتر از یک روز کاری. اطلاعات شما محرمانه می‌ماند و
                در اختیار هیچ شخص ثالثی قرار نمی‌گیرد.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="bg-white rounded-2xl p-8 shadow-sm border border-cream-200"
          >
            {state.status === "success" ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-black text-ink-900 mb-2">
                  درخواست شما ثبت شد
                </h3>
                <p className="text-ink-400 text-sm">
                  تیم مدیلینک در کمتر از یک روز کاری با شما تماس می‌گیرد.
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <h3 className="text-lg font-black text-ink-900 mb-6">
                  فرم درخواست دمو رایگان
                </h3>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-ink-700 mb-1"
                  >
                    نام و نام خانوادگی
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="دکتر احمدی"
                    required
                    disabled={pending}
                    aria-invalid={state.fieldErrors?.name ? true : undefined}
                    className={inputClass(state.fieldErrors?.name)}
                  />
                  {state.fieldErrors?.name && (
                    <p className="mt-1 text-xs text-bad-500">
                      {state.fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-ink-700 mb-1"
                  >
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
                    <p className="mt-1 text-xs text-bad-500">
                      {state.fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="clinicType"
                    className="block text-sm font-medium text-ink-700 mb-1"
                  >
                    نوع کلینیک
                  </label>
                  <select
                    id="clinicType"
                    name="clinicType"
                    required
                    defaultValue=""
                    disabled={pending}
                    aria-invalid={
                      state.fieldErrors?.clinicType ? true : undefined
                    }
                    className={inputClass(state.fieldErrors?.clinicType)}
                  >
                    <option value="" disabled>
                      انتخاب کنید
                    </option>
                    {CLINIC_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {state.fieldErrors?.clinicType && (
                    <p className="mt-1 text-xs text-bad-500">
                      {state.fieldErrors.clinicType}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-ink-700 mb-1"
                  >
                    پیام <span className="text-ink-400">(اختیاری)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="چه بخشی از کلینیک بیشترین وقت تیم شما را می‌گیرد؟"
                    rows={4}
                    disabled={pending}
                    className="w-full border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-300 transition-colors resize-none disabled:opacity-60"
                  />
                  {state.fieldErrors?.message && (
                    <p className="mt-1 text-xs text-bad-500">
                      {state.fieldErrors.message}
                    </p>
                  )}
                </div>

                {state.status === "error" && state.message && (
                  <div
                    role="alert"
                    className="bg-bad-50 border border-bad-200 text-bad-600 text-sm rounded-xl px-4 py-3"
                  >
                    {state.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full gradient-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {pending ? "در حال ارسال..." : "ثبت درخواست دمو"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
