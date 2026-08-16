"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    clinic: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
              تماس با ما
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              همین امروز
              <br />
              <span className="gradient-text">مشاوره رایگان بگیرید</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              تیم ما آماده است تا وضعیت دیجیتال کلینیک شما را بررسی کند و
              بهترین استراتژی رشد را پیشنهاد دهد.
            </p>

            <div className="space-y-4">
              {[
                { icon: "📍", title: "آدرس", value: "تهران، ایران" },
                { icon: "📞", title: "تلفن", value: "۰۲۱-۱۲۳۴۵۶۷۸" },
                { icon: "📧", title: "ایمیل", value: "info@medilink.ir" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">{item.title}</div>
                    <div className="text-sm font-medium text-gray-700">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  پیام شما دریافت شد!
                </h3>
                <p className="text-gray-500 text-sm">
                  تیم ما در اسرع وقت با شما تماس می‌گیرد.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 mb-6">
                  فرم درخواست مشاوره
                </h3>

                {[
                  { name: "name", label: "نام و نام خانوادگی", type: "text", placeholder: "دکتر احمدی" },
                  { name: "clinic", label: "نام کلینیک", type: "text", placeholder: "کلینیک زیبایی ..." },
                  { name: "phone", label: "شماره تماس", type: "tel", placeholder: "۰۹۱۲۰۰۰۰۰۰۰" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    توضیحات
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="درباره کلینیک و نیازهای خود بنویسید..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gradient-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-md"
                >
                  ارسال درخواست مشاوره
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
