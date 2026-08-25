import ClientLogo from "./ClientLogo";
import { clients } from "@/app/lib/clients";

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-gray-100 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 mb-8">
          مورد اعتماد کلینیک‌های برتر
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {clients.slice(0, 5).map((client) => (
            <li
              key={client.name}
              className="h-10 px-5 flex items-center rounded-lg bg-white border border-gray-200 grayscale"
            >
              <ClientLogo client={client} className="h-8 w-28" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
