"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

const ALLOWED_STATUSES = [
  "pending_payment",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();

  const supabase = await createClient();

  const orderIdRaw = formData.get("orderId");
  const statusRaw = formData.get("status");

  const orderId = Number(orderIdRaw);
  const status = String(statusRaw || "");

  if (!orderId || Number.isNaN(orderId)) {
    throw new Error("ID de pedido inválido");
  }

  if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
    throw new Error("Estado inválido");
  }

  const { error } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    console.error("Error actualizando estado:", error);
    throw new Error("No se pudo actualizar el estado");
  }

  revalidatePath("/admin/pedidos");
}