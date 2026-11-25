import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { hasSession, isAuthConfigured } from "@/lib/adminSession";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  if (isAuthConfigured() && hasSession()) redirect("/admin");
  return <LoginForm configured={isAuthConfigured()} />;
}
