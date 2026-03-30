import Link from "next/link";
import { getOrders, getOrdersStats } from "@/lib/admin/orders";
import OrdersFilters from "@/components/admin/orders-filters";
import OrderStatusBadge from "@/components/admin/order-status-badge";
import OrderStatusSelect from "@/components/admin/order-status-select";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  q?: string;
  status?: string;
  page?: string;
}>;

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

export default async function AdminPedidosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const q = params.q ?? "";
  const status = params.status ?? "all";
  const page = Number(params.page ?? "1") || 1;

  const { orders, total, totalPages } = await getOrders({
    q,
    status,
    page,
    limit: 10,
  });

  const stats = getOrdersStats(orders);

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-8">
        <p className="text-sm text-neutral-500">Pedidos</p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
          Gestión de pedidos
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          Busca pedidos, revisa productos comprados y controla estados desde el panel.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-neutral-500">Pedidos en vista</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-950 sm:text-3xl">
            {stats.totalOrders}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-neutral-500">Monto en vista</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-950 sm:text-3xl">
            {money(stats.totalAmount)}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-neutral-500">Pendientes</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-950 sm:text-3xl">
            {stats.pendingCount}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-neutral-500">Pagados</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-950 sm:text-3xl">
            {stats.paidCount}
          </p>
        </div>
      </section>

      <OrdersFilters q={q} status={status} />

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-semibold text-neutral-950">Lista de pedidos</h2>
          <p className="text-sm text-neutral-500">Total encontrados: {total}</p>
        </div>

        {orders.length === 0 ? (
          <div className="p-10 text-center text-sm text-neutral-500">
            No se encontraron pedidos con esos filtros.
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {orders.map((order) => (
              <article key={order.id} className="p-4 sm:p-5">
                <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr_1fr]">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-neutral-950">
                          {order.order_code || `Pedido #${order.id}`}
                        </h3>
                        <OrderStatusBadge status={order.status} />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <OrderStatusSelect
                          orderId={order.id}
                          currentStatus={order.status}
                        />

                        <Link
                          href={`/admin/pedidos/${order.id}`}
                          className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                        >
                          Ver detalle
                        </Link>
                      </div>
                    </div>

                    <div className="grid gap-2 text-sm text-neutral-700">
                      <p>
                        <span className="font-medium">Cliente:</span> {order.nombres}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {order.email}
                      </p>
                      <p>
                        <span className="font-medium">Teléfono:</span> {order.telefono}
                      </p>
                      <p>
                        <span className="font-medium">Documento:</span> {order.doc_type} -{" "}
                        {order.doc_number}
                      </p>
                      <p>
                        <span className="font-medium">Fecha:</span> {dateTime(order.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl bg-neutral-50 p-4">
                    <h4 className="text-sm font-semibold text-neutral-900">
                      Entrega y pago
                    </h4>

                    <div className="space-y-2 text-sm text-neutral-700">
                      <p>
                        <span className="font-medium">Ubicación:</span> {order.departamento},{" "}
                        {order.provincia}, {order.distrito}
                      </p>
                      <p>
                        <span className="font-medium">Dirección:</span> {order.direccion}
                      </p>
                      <p>
                        <span className="font-medium">Carrier:</span> {order.carrier || "—"}
                      </p>
                      <p>
                        <span className="font-medium">Envío:</span> {order.shipping_mode || "—"}
                      </p>
                      <p>
                        <span className="font-medium">Gateway:</span> {order.gateway || "—"}
                      </p>
                    </div>

                    <div className="border-t border-neutral-200 pt-3 text-sm text-neutral-700">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{money(order.subtotal)}</span>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <span>Envío</span>
                        <span>{money(order.envio)}</span>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <span>Descuento</span>
                        <span>{money(order.discount)}</span>
                      </div>
                      <div className="mt-2 flex justify-between text-base font-semibold text-neutral-950">
                        <span>Total</span>
                        <span>{money(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-neutral-200 p-4">
                    <h4 className="text-sm font-semibold text-neutral-900">
                      Productos comprados
                    </h4>

                    {!order.order_items || order.order_items.length === 0 ? (
                      <p className="mt-3 text-sm text-neutral-500">
                        Este pedido no tiene items registrados.
                      </p>
                    ) : (
                      <div className="mt-3 space-y-3">
                        {order.order_items.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl bg-neutral-50 p-3 text-sm"
                          >
                            <p className="font-medium text-neutral-900">{item.name}</p>

                            <div className="mt-1 space-y-1 text-neutral-600">
                              <p>Cantidad: {item.qty}</p>
                              <p>Precio: {money(item.price)}</p>
                              <p>Slug: {item.product_slug || "—"}</p>
                              <p>Talla: {item.size || "—"}</p>
                              <p>Color: {item.color || "—"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-neutral-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-sm text-neutral-500">
            Página {page} de {totalPages}
          </p>

          <div className="flex gap-2">
            <Link
              href={`/admin/pedidos?q=${encodeURIComponent(q)}&status=${encodeURIComponent(
                status
              )}&page=${Math.max(1, page - 1)}`}
              className={`inline-flex h-10 items-center justify-center rounded-xl border px-4 text-sm ${
                page <= 1
                  ? "pointer-events-none border-neutral-200 text-neutral-400"
                  : "border-neutral-300 text-neutral-700"
              }`}
            >
              Anterior
            </Link>

            <Link
              href={`/admin/pedidos?q=${encodeURIComponent(q)}&status=${encodeURIComponent(
                status
              )}&page=${Math.min(totalPages, page + 1)}`}
              className={`inline-flex h-10 items-center justify-center rounded-xl border px-4 text-sm ${
                page >= totalPages
                  ? "pointer-events-none border-neutral-200 text-neutral-400"
                  : "border-neutral-300 text-neutral-700"
              }`}
            >
              Siguiente
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}