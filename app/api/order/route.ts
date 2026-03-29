import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { generateOrderId } from "@/lib/generate-order-id";
import { sendOrderPendingEmail } from "@/lib/send-order-email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      receiptType,
      nombres,
      docType,
      docNumber,
      ruc,
      razonSocial,
      direccionFiscal,
      telefono,
      email,
      departamento,
      provincia,
      distrito,
      direccion,
      referencia,
      subtotal,
      envio,
      discount,
      total,
      finalTotal,
      carrier,
      shippingMode,
      gateway,
      appliedCoupon,
      cart,
    } = body;

    const supabase = createClient();
    const orderCode = generateOrderId();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_code: orderCode,
        receipt_type: receiptType,
        nombres,
        doc_type: docType,
        doc_number: docNumber,
        ruc,
        razon_social: razonSocial,
        direccion_fiscal: direccionFiscal,
        telefono,
        email,
        departamento,
        provincia,
        distrito,
        direccion,
        referencia,
        subtotal,
        envio,
        coupon_code: appliedCoupon ?? null,
        discount: discount ?? 0,
        total: finalTotal ?? total,
        carrier,
        shipping_mode: shippingMode,
        gateway: gateway || "socio",
        status: "pending_payment",
      })
      .select("id, order_code")
      .single();

    if (orderError || !order) {
      console.error("Error insertando order:", orderError);
      return NextResponse.json(
        { ok: false, error: "No se pudo crear el pedido." },
        { status: 500 }
      );
    }

    const orderId = order.id;
    const orderCodeValue = String(order.order_code);

    let normalizedItems: Array<{
      id: string | number;
      slug?: string;
      name: string;
      qty: number;
      price: number | null;
      size?: string | null;
      color?: string | null;
      mainImage?: string | null;
    }> = [];

    if (Array.isArray(cart) && cart.length > 0) {
      normalizedItems = cart.map((item: any, index: number) => ({
        id: item.id ?? index,
        slug: item.slug ?? null,
        name: item.name ?? item.slug ?? "Producto",
        qty: Number(item.qty ?? 1),
        price: item.price != null ? Number(item.price) : 0,
        size: item.size ?? null,
        color: item.color ?? null,
        mainImage: item.mainImage ?? null,
      }));

      const itemsToInsert = normalizedItems.map((item) => ({
        order_id: orderId,
        product_slug: item.slug ?? null,
        name: item.name,
        size: item.size ?? null,
        color: item.color ?? null,
        qty: item.qty,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemsError) {
        console.error("Error insertando order_items:", itemsError);
      }
    }

    if (email) {
      await sendOrderPendingEmail({
        email,
        nombres: nombres || "Cliente",
        telefono: telefono || "",
        orderCode: orderCodeValue,
        subtotal: Number(subtotal ?? 0),
        envio: Number(envio ?? 0),
        discount: Number(discount ?? 0),
        total: Number(finalTotal ?? total ?? 0),
        couponCode: appliedCoupon ?? null,
        direccion: direccion || "",
        referencia: referencia || "",
        departamento: departamento || "",
        provincia: provincia || "",
        distrito: distrito || "",
        shippingMode: shippingMode || "",
        carrier: carrier || "",
        items: normalizedItems,
      });
    }

    return NextResponse.json({
      ok: true,
      orderId,
      orderCode: orderCodeValue,
    });
  } catch (err: any) {
    console.error("Error en /api/order:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno creando el pedido." },
      { status: 500 }
    );
  }
}