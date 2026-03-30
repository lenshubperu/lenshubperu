import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("id, email, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !adminUser || !adminUser.is_active) {
    redirect("/admin/login");
  }

  return {
    user,
    adminUser,
  };
}