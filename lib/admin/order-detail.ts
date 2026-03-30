import { createClient } from "@/lib/supabase/server";

export type OrderDetailItem = {
  id: number;
  order_id: number;
  name: string;
  qty: number;
  price: number;
  product_slug: string | null;
  size: string | null;
  color: string | null;
};

export type OrderDetail = {
  id: number;
  created_at: string;
  updated_at: string;
  status: string;
  nombres: string;
  telefono: string;
  email: string;
  receipt_type: string;
  doc_type: string;
  doc_number: string;
  departamento: string;
  provincia: string;
  distrito: string;
  direccion: string;
  referencia: string | null;
  subtotal: number;
  envio: number;
  discount: number;
  total: number;
  gateway: string | null;
  shipping_mode: string | null;
  carrier: string | null;
  order_code: string | null;
  coupon_code: string | null;
  order_items: OrderDetailItem[] | null;
};

export async function getOrderById(id: number): Promise<OrderDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      updated_at,
      status,
      nombres,
      telefono,
      email,
      receipt_type,
      doc_type,
      doc_number,
      departamento,
      provincia,
      distrito,
      direccion,
      referencia,
      subtotal,
      envio,
      discount,
      total,
      gateway,
      shipping_mode,
      carrier,
      order_code,
      coupon_code,
      order_items (
        id,
        order_id,
        name,
        qty,
        price,
        product_slug,
        size,
        color
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error obteniendo detalle de pedido:", error);
    return null;
  }

  return data as OrderDetail;
}