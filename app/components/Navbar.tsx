"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/app/lib/site";
import LogoMark from "./LogoMark";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    return `text-sm font-medium transition-colors duration-200 ${
      active ? "text-brand-600" : "text-ink-700 hover:text-brand-600"
    }`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <LogoMark className="h-8 w-8" />
            <span className="text-2xl font-black gradient-text">مدیلینک</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="gradient-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-md"
            >
              درخواست دمو رایگان
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-ink-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={isOpen}
          >
            <div className="w-6 h-0.5 bg-ink-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-ink-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-ink-700"></div>
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkClass(link.href)} py-1`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="gradient-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold text-center"
              onClick={() => setIsOpen(false)}
            >
              درخواست دمو رایگان
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
