import { createAdminClient } from "@/app/lib/supabase/admin";
import { formatToman } from "@/app/lib/packages";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  paid: "پرداخت‌شده",
  pending: "در انتظار پرداخت",
  failed: "ناموفق",
  canceled: "لغوشده",
};

const STATUS_CLASS: Record<string, string> = {
  paid: "bg-good-50 text-good-600",
  pending: "bg-cream-200 text-ink-700",
  failed: "bg-bad-50 text-bad-600",
  canceled: "bg-bad-50 text-bad-600",
};

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, package_label, amount_toman, billing_type, status, contact_name, clinic_name, phone, email, zarinpal_ref_id, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="text-2xl font-black text-ink-900 mb-6">سفارش‌ها</h1>

      {error && (
        <div className="bg-bad-50 border border-bad-200 text-bad-600 text-sm rounded-xl px-4 py-3 mb-4">
          خطا در خواندن سفارش‌ها: {error.message}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[900px] text-right">
          <thead>
            <tr className="border-b border-cream-200 bg-cream-100 text-xs text-ink-400">
              <th className="p-3 font-bold">تاریخ</th>
              <th className="p-3 font-bold">بسته</th>
              <th className="p-3 font-bold">مبلغ</th>
              <th className="p-3 font-bold">وضعیت</th>
              <th className="p-3 font-bold">مشتری</th>
              <th className="p-3 font-bold">کلینیک</th>
              <th className="p-3 font-bold">تماس</th>
              <th className="p-3 font-bold">کد پیگیری</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {orders?.map((order) => (
              <tr key={order.id} className="text-sm">
                <td className="p-3 text-ink-400 whitespace-nowrap">
                  {new Date(order.created_at).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-3 text-ink-900 font-medium">{order.package_label}</td>
                <td className="p-3 text-ink-700 whitespace-nowrap">
                  {formatToman(order.amount_toman)}
                  {order.billing_type === "monthly" && (
                    <span className="text-xs text-ink-400"> /ماه</span>
                  )}
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      STATUS_CLASS[order.status] ?? "bg-cream-200 text-ink-700"
                    }`}
                  >
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                </td>
                <td className="p-3 text-ink-700">{order.contact_name}</td>
                <td className="p-3 text-ink-700">{order.clinic_name}</td>
                <td className="p-3 text-ink-700 whitespace-nowrap" dir="ltr">
                  {order.phone}
                </td>
                <td className="p-3 text-ink-400 whitespace-nowrap" dir="ltr">
                  {order.zarinpal_ref_id ?? "—"}
                </td>
              </tr>
            ))}
            {orders?.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-ink-400">
                  هنوز سفارشی ثبت نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
