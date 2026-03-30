import { requireAdmin } from "@/lib/auth/admin";
import AdminShell from "@/components/admin/admin-shell";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin();

  return <AdminShell email={user.email}>{children}</AdminShell>;
}