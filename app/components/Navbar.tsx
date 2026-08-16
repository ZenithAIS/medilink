"use client";
import { useState } from "react";

const navLinks = [
  { label: "خانه", href: "#home" },
  { label: "خدمات", href: "#services" },
  { label: "چرا مدیلینک", href: "#why-us" },
  { label: "نمونه کارها", href: "#portfolio" },
  { label: "نظرات", href: "#testimonials" },
  { label: "تماس با ما", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-black gradient-text">مدیلینک</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-sky-500 transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="gradient-primary text-white px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity shadow-md"
            >
              مشاوره رایگان
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-sky-500 transition-colors text-sm font-medium py-1"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="gradient-primary text-white px-5 py-2 rounded-full text-sm font-bold text-center"
            >
              مشاوره رایگان
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
