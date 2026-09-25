import { createAdminClient } from "@/app/lib/supabase/admin";
import { formatToman } from "@/app/lib/packages";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createAdminClient();

  const [{ count: leadsCount }, { count: newsletterCount }, { data: orders }] =
    await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("status, amount_toman"),
    ]);

  const paidOrders = orders?.filter((o) => o.status === "paid") ?? [];
  const pendingOrders = orders?.filter((o) => o.status === "pending") ?? [];
  const revenue = paidOrders.reduce((sum, o) => sum + o.amount_toman, 0);

  return {
    leadsCount: leadsCount ?? 0,
    newsletterCount: newsletterCount ?? 0,
    paidCount: paidOrders.length,
    pendingCount: pendingOrders.length,
    revenue,
  };
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm">
      <div className="text-sm text-ink-400 mb-2">{label}</div>
      <div className="text-2xl font-black text-ink-900">{value}</div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-black text-ink-900 mb-6">داشبورد</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="درآمد پرداخت‌شده" value={formatToman(stats.revenue)} />
        <StatCard label="سفارش پرداخت‌شده" value={String(stats.paidCount)} />
        <StatCard label="سفارش در انتظار پرداخت" value={String(stats.pendingCount)} />
        <StatCard label="درخواست دمو" value={String(stats.leadsCount)} />
        <StatCard label="عضو خبرنامه" value={String(stats.newsletterCount)} />
      </div>
    </div>
  );
}
