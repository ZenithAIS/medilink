import type { ReactNode } from "react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { siteName } from "@/app/lib/site";

const NAV = [
  { href: "/admin", label: "داشبورد" },
  { href: "/admin/orders", label: "سفارش‌ها" },
  { href: "/admin/leads", label: "درخواست‌های دمو" },
  { href: "/admin/newsletter", label: "خبرنامه" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-100">
      <header className="bg-white border-b border-cream-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-black text-ink-900">{siteName} · ادمین</span>
            <nav className="flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-ink-700 hover:bg-cream-100 hover:text-brand-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-ink-400 hover:text-bad-500 transition-colors"
            >
              خروج
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</main>
    </div>
  );
}
