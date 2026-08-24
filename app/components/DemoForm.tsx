"use client";
import { useActionState } from "react";
import { submitLead, type LeadState } from "@/app/actions/leads";
import { CLINIC_TYPES } from "@/app/lib/clinic-types";
import { IconShield } from "./Icons";

const initialState: LeadState = { status: "idle" };

const CONTACT = [
  { title: "تلفن", value: "۰۲۱-۱۲۳۴۵۶۷۸" },
  { title: "ایمیل", value: "info@medilink.ir" },
  { title: "آدرس", value: "تهران، ایران" },
];

export default function DemoForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  const inputClass = (error?: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors disabled:opacity-60 ${
      error
        ? "border-red-300 focus:border-red-400"
        : "border-gray-200 focus:border-sky-400"
    }`;

  return (
    <section id="demo" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-6">
              راه‌های ارتباطی
            </h2>

            <dl className="space-y-4 mb-8">
              {CONTACT.map((item) => (
                <div key={item.title}>
                  <dt className="text-xs text-gray-400">{item.title}</dt>
                  <dd className="text-sm font-medium text-gray-700">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
              <IconShield className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed">
                پاسخ‌گویی در کمتر از یک روز کاری. اطلاعات شما محرمانه می‌ماند و
                در اختیار هیچ شخص ثالثی قرار نمی‌گیرد.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {state.status === "success" ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  درخواست شما ثبت شد
                </h3>
                <p className="text-gray-500 text-sm">
                  تیم مدی‌لینک در کمتر از یک روز کاری با شما تماس می‌گیرد.
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 mb-6">
                  فرم درخواست دمو رایگان
                </h3>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    <p className="mt-1 text-xs text-red-500">
                      {state.fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    <p className="mt-1 text-xs text-red-500">
                      {state.fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="clinicType"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    <p className="mt-1 text-xs text-red-500">
                      {state.fieldErrors.clinicType}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    پیام <span className="text-gray-400">(اختیاری)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="چه بخشی از کلینیک بیشترین وقت تیم شما را می‌گیرد؟"
                    rows={4}
                    disabled={pending}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors resize-none disabled:opacity-60"
                  />
                  {state.fieldErrors?.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {state.fieldErrors.message}
                    </p>
                  )}
                </div>

                {state.status === "error" && state.message && (
                  <div
                    role="alert"
                    className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3"
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
          </div>
        </div>
      </div>
    </section>
  );
}
