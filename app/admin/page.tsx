import { redirect } from "next/navigation";
import AdminCalendar from "@/components/admin/AdminCalendar";
import { hasSession, isAuthConfigured } from "@/lib/adminSession";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (!isAuthConfigured() || !hasSession()) redirect("/admin/login");
  return <AdminCalendar />;
}
