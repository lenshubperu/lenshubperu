import { createClient } from "@/lib/supabase/server";

export type OrderItemRow = {
  id: number;
  order_id: number;
  name: string;
  qty: number;
  price: number;
  product_slug: string | null;
  size: string | null;
  color: string | null;
};

export type OrderRow = {
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
  subtotal: number;
  envio: number;
  discount: number;
  total: number;
  gateway: string | null;
  shipping_mode: string | null;
  carrier: string | null;
  order_code: string | null;
  coupon_code: string | null;
  referencia: string | null;
  order_items: OrderItemRow[] | null;
};

export type OrdersFilters = {
  q?: string;
  status?: string;
  page?: number;
  limit?: number;
};

export type OrdersResult = {
  orders: OrderRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function normalize(value: string | null | undefined) {
  return String(value || "").trim().toLowerCase();
}

function onlyDigits(value: string | null | undefined) {
  return String(value || "").replace(/\D/g, "");
}

export async function getOrders({
  q = "",
  status = "all",
  page = 1,
  limit = 10,
}: OrdersFilters): Promise<OrdersResult> {
  const supabase = await createClient();

  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Math.min(50, Number(limit) || 10));

  let query = supabase
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
      subtotal,
      envio,
      discount,
      total,
      gateway,
      shipping_mode,
      carrier,
      order_code,
      coupon_code,
      referencia,
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
    .order("created_at", { ascending: false })
    .limit(500);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error obteniendo pedidos:", error);
    throw new Error("No se pudieron obtener los pedidos");
  }

  const allOrders = (data as OrderRow[]) ?? [];

  const rawTerm = normalize(q);
  const digitsTerm = onlyDigits(q);

  const filteredOrders = !rawTerm
    ? allOrders
    : allOrders.filter((order) => {
        const orderCode = normalize(order.order_code);
        const nombres = normalize(order.nombres);
        const email = normalize(order.email);
        const telefonoText = normalize(order.telefono);
        const telefonoDigits = onlyDigits(order.telefono);
        const docNumberText = normalize(order.doc_number);
        const docNumberDigits = onlyDigits(order.doc_number);

        const textMatch =
          orderCode.includes(rawTerm) ||
          nombres.includes(rawTerm) ||
          email.includes(rawTerm) ||
          telefonoText.includes(rawTerm) ||
          docNumberText.includes(rawTerm);

        const digitsMatch =
          digitsTerm.length > 0 &&
          (docNumberDigits === digitsTerm ||
            docNumberDigits.includes(digitsTerm) ||
            telefonoDigits === digitsTerm ||
            telefonoDigits.includes(digitsTerm) ||
            orderCode.includes(digitsTerm));

        return textMatch || digitsMatch;
      });

  const total = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit;
  const paginatedOrders = filteredOrders.slice(from, to);

  console.log(
    "ALL ORDERS RAW:",
    allOrders.map((o) => ({
      id: o.id,
      doc_number: o.doc_number,
      nombres: o.nombres,
      status: o.status,
    }))
  );

  console.log("SEARCH RAW:", q);
  console.log("SEARCH NORMALIZED:", rawTerm);
  console.log("SEARCH DIGITS:", digitsTerm);

  console.log(
    "FILTERED ORDERS:",
    filteredOrders.map((o) => ({
      id: o.id,
      doc_number: o.doc_number,
      nombres: o.nombres,
    }))
  );

  return {
    orders: paginatedOrders,
    total,
    page: safePage,
    limit: safeLimit,
    totalPages,
  };
}

export function getOrdersStats(orders: OrderRow[]) {
  return {
    totalOrders: orders.length,
    totalAmount: orders.reduce((acc, order) => acc + Number(order.total || 0), 0),
    pendingCount: orders.filter((o) => o.status === "pending_payment").length,
    paidCount: orders.filter((o) => o.status === "paid").length,
  };
}