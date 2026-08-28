"use client";
import { useActionState } from "react";
import {
  subscribeNewsletter,
  type NewsletterState,
} from "@/app/actions/newsletter";

const initialState: NewsletterState = { status: "idle" };

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState
  );

  return (
    <form action={formAction} className="mt-6 max-w-sm">
      <label
        htmlFor="newsletter"
        className="block text-sm font-medium text-white mb-2"
      >
        عضویت در خبرنامه
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter"
          name="email"
          type="email"
          required
          disabled={pending}
          placeholder="ایمیل شما"
          className="flex-1 min-w-0 bg-ink-900 border border-ink-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-ink-400 focus:outline-none focus:border-brand-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={pending}
          className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {pending ? "..." : "عضویت"}
        </button>
      </div>
      {state.message && (
        <p
          role="status"
          className={`mt-2 text-xs ${
            state.status === "success" ? "text-brand-300" : "text-bad-400"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
