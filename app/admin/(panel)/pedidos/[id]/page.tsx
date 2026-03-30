import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/admin/order-detail";
import OrderStatusBadge from "@/components/admin/order-status-badge";
import OrderStatusSelect from "@/components/admin/order-status-select";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function money(value: number | string | null | undefined) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value || 0));
}

function dateTime(value: string) {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminPedidoDetallePage({
  params,
}: PageProps) {
  const { id } = await params;
  const orderId = Number(id);

  if (!orderId || Number.isNaN(orderId)) {
    notFound();
  }

  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/admin/pedidos"
              className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
            >
              ← Volver a pedidos
            </Link>

            <p className="mt-4 text-sm text-neutral-500">Detalle del pedido</p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              {order.order_code || `Pedido #${order.id}`}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <OrderStatusBadge status={order.status} />
              <span className="text-sm text-neutral-500">
                Creado: {dateTime(order.created_at)}
              </span>
            </div>
          </div>

          <OrderStatusSelect
            orderId={order.id}
            currentStatus={order.status}
          />
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-neutral-950">
              Datos del cliente
            </h2>

            <div className="mt-4 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
              <p>
                <span className="font-medium">Nombre:</span> {order.nombres}
              </p>
              <p>
                <span className="font-medium">Teléfono:</span> {order.telefono}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order.email}
              </p>
              <p>
                <span className="font-medium">Comprobante:</span>{" "}
                {order.receipt_type}
              </p>
              <p>
                <span className="font-medium">Documento:</span> {order.doc_type}
              </p>
              <p>
                <span className="font-medium">Número:</span> {order.doc_number}
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-neutral-950">
              Entrega y envío
            </h2>

            <div className="mt-4 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
              <p>
                <span className="font-medium">Departamento:</span>{" "}
                {order.departamento}
              </p>
              <p>
                <span className="font-medium">Provincia:</span> {order.provincia}
              </p>
              <p>
                <span className="font-medium">Distrito:</span> {order.distrito}
              </p>
              <p>
                <span className="font-medium">Dirección:</span> {order.direccion}
              </p>
              <p>
                <span className="font-medium">Referencia:</span>{" "}
                {order.referencia || "—"}
              </p>
              <p>
                <span className="font-medium">Carrier:</span> {order.carrier || "—"}
              </p>
              <p>
                <span className="font-medium">Modo envío:</span>{" "}
                {order.shipping_mode || "—"}
              </p>
              <p>
                <span className="font-medium">Gateway:</span> {order.gateway || "—"}
              </p>
              <p>
                <span className="font-medium">Cupón:</span>{" "}
                {order.coupon_code || "—"}
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-neutral-950">
              Productos comprados
            </h2>

            {!order.order_items || order.order_items.length === 0 ? (
              <p className="mt-4 text-sm text-neutral-500">
                Este pedido no tiene items registrados.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {order.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-medium text-neutral-950">{item.name}</p>
                        <div className="mt-2 space-y-1 text-sm text-neutral-600">
                          <p>Cantidad: {item.qty}</p>
                          <p>Slug: {item.product_slug || "—"}</p>
                          <p>Talla: {item.size || "—"}</p>
                          <p>Color: {item.color || "—"}</p>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-neutral-950">
                        {money(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-neutral-950">
              Resumen de pago
            </h2>

            <div className="mt-4 space-y-3 text-sm text-neutral-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{money(order.subtotal)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Envío</span>
                <span>{money(order.envio)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Descuento</span>
                <span>{money(order.discount)}</span>
              </div>

              <div className="border-t border-neutral-200 pt-3">
                <div className="flex items-center justify-between text-base font-semibold text-neutral-950">
                  <span>Total</span>
                  <span>{money(order.total)}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-neutral-950">
              Metadatos
            </h2>

            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p>
                <span className="font-medium">ID interno:</span> {order.id}
              </p>
              <p>
                <span className="font-medium">Código:</span>{" "}
                {order.order_code || "—"}
              </p>
              <p>
                <span className="font-medium">Creado:</span>{" "}
                {dateTime(order.created_at)}
              </p>
              <p>
                <span className="font-medium">Actualizado:</span>{" "}
                {dateTime(order.updated_at)}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}