"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <main className="min-h-screen grid place-items-center bg-cream-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-sm border border-cream-200">
        <h1 className="text-xl font-black text-ink-900 mb-1">پنل ادمین مدیلینک</h1>
        <p className="text-sm text-ink-400 mb-6">ورود مخصوص تیم مدیلینک است.</p>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-1">
              ایمیل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              dir="ltr"
              required
              disabled={pending}
              className="w-full border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-300 transition-colors disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink-700 mb-1">
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={pending}
              className="w-full border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-300 transition-colors disabled:opacity-60"
            />
          </div>

          {state?.message && (
            <div role="alert" className="bg-bad-50 border border-bad-200 text-bad-600 text-sm rounded-xl px-4 py-3">
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full gradient-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </main>
  );
}
