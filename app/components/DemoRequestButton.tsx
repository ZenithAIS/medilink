"use client";
import { useActionState, useId, useRef } from "react";
import { submitDemoRequest, type DemoState } from "@/app/actions/demo";

const initialState: DemoState = { status: "idle" };

export default function DemoRequestButton({ className }: { className: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [state, formAction, pending] = useActionState(submitDemoRequest, initialState);

  const fields = [
    { name: "name", label: "نام و نام خانوادگی", type: "text", placeholder: "دکتر احمدی", dir: undefined },
    { name: "whatsapp", label: "شماره واتساپ", type: "tel", placeholder: "09120000000", dir: "ltr" },
    { name: "email", label: "ایمیل", type: "email", placeholder: "name@example.com", dir: "ltr" },
  ] as const;

  return (
    <>
      <button type="button" className={className} onClick={() => dialogRef.current?.showModal()}>
        درخواست دمو
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={`${id}-title`}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 text-right text-ink-900 shadow-xl backdrop:bg-black/50"
      >
        {state.status === "success" ? (
          <div className="py-8 text-center">
            <h2 id={`${id}-title`} className="mb-2 text-xl font-black">
              درخواست شما ثبت شد
            </h2>
            <p className="mb-6 text-sm text-ink-400">کارشناسان مدیلینک به‌زودی با شما ارتباط می‌گیرند.</p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-xl border border-cream-300 px-6 py-2 text-sm font-bold text-ink-700"
            >
              بستن
            </button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 id={`${id}-title`} className="text-lg font-black">
                درخواست دمو
              </h2>
              <button
                type="button"
                aria-label="بستن"
                onClick={() => dialogRef.current?.close()}
                className="px-2 text-xl text-ink-400"
              >
                ×
              </button>
            </div>
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={`${id}-${field.name}`} className="mb-1 block text-sm font-medium text-ink-700">
                  {field.label}
                </label>
                <input
                  id={`${id}-${field.name}`}
                  name={field.name}
                  type={field.type}
                  dir={field.dir}
                  placeholder={field.placeholder}
                  required
                  disabled={pending}
                  aria-invalid={state.fieldErrors?.[field.name] ? true : undefined}
                  className="w-full rounded-xl border border-cream-300 px-4 py-3 text-sm transition-colors focus:border-brand-300 focus:outline-none disabled:opacity-60"
                />
                {state.fieldErrors?.[field.name] && (
                  <p className="mt-1 text-xs text-bad-500">{state.fieldErrors[field.name]}</p>
                )}
              </div>
            ))}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {state.status === "error" && state.message && (
              <div role="alert" className="rounded-xl border border-bad-200 bg-bad-50 px-4 py-3 text-sm text-bad-600">
                {state.message}
              </div>
            )}
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl py-3 font-bold text-white shadow-md transition-opacity gradient-primary hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "در حال ارسال..." : "ثبت درخواست"}
            </button>
          </form>
        )}
      </dialog>
    </>
  );
}
