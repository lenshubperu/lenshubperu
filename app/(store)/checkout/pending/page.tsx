"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type PendingItem = {
  id: string | number;
  slug?: string;
  name: string;
  qty: number;
  price: number | null;
  size?: string | null;
  color?: string | null;
  mainImage?: string | null;
};

type OrderSummary = {
  orderId: string;
  subtotal: number;
  envio: number;
  discount: number;
  total: number;
  coupon_code?: string | null;
  nombres: string;
  telefono: string;
  email: string;
  direccion: string;
  referencia?: string;
  departamento: string;
  provincia: string;
  distrito: string;
  shippingMode: string;
  carrier: string;
  items: PendingItem[];
};

export default function CheckoutPendingPage() {
  const [summary, setSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("last-order-summary");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setSummary(parsed);
    } catch {
      setSummary(null);
    }
  }, []);

  const paymentMethod = useMemo(() => "Tarjeta", []);

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
            Pago en proceso
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Tu pago está siendo revisado.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-600 sm:text-lg">
            Tu operación fue enviada correctamente, pero tu pedido todavía{" "}
            <span className="font-medium text-black">no está confirmado</span>.
            Primero tu banco debe aprobar el pago. Cuando eso ocurra, te enviaremos
            la confirmación por{" "}
            <span className="font-medium text-black">correo electrónico</span> y{" "}
            <span className="font-medium text-black">WhatsApp</span>.
          </p>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_420px]">
          <div className="space-y-12">
            <section className="border-t border-black/10 pt-8">
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                Estado actual
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <StatusCard
                  title="Pago recibido"
                  description="Tu solicitud de pago fue enviada correctamente."
                  active
                />
                <StatusCard
                  title="Tu banco está revisando tu pago"
                  description="La aprobación depende de la validación de tu entidad bancaria."
                  active
                />
                <StatusCard
                  title="Orden confirmada"
                  description="Te avisaremos por email y WhatsApp cuando el pago sea aprobado."
                />
              </div>
            </section>

            <section className="border-t border-black/10 pt-8">
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                Qué sigue ahora
              </p>

              <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-600 sm:text-[15px]">
                <p>1. Tu banco está revisando tu pago.</p>
                <p>
                  2. Una vez nos apruebe tu pago{" "}
                  <span className="font-medium text-black">
                    confirmaremos tu orden
                  </span>.
                </p>
                <p>
                  3. Te enviaremos la confirmación a tu{" "}
                  <span className="font-medium text-black">correo</span> y{" "}
                  <span className="font-medium text-black">WhatsApp</span>.
                </p>
                <p>
                  4. Después prepararemos tu pedido y continuará a despacho según
                  el método de envío elegido.
                </p>
              </div>
            </section>

            <section className="border-t border-black/10 pt-8">
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                Resumen de tu compra
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Detalles del pedido
              </h2>

              {!summary ? (
                <div className="mt-6 rounded-3xl border border-black/10 px-5 py-6 text-sm text-neutral-500">
                  No se encontró el resumen local del pedido. Si acabas de pagar,
                  vuelve al checkout y completa el flujo nuevamente.
                </div>
              ) : (
                <div className="mt-8 space-y-10">
                  <section>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      <InfoBlock label="Código de orden" value={summary.orderId} />
                      <InfoBlock label="Estado" value="Pago en proceso" />
                      <InfoBlock label="Medio de pago" value={paymentMethod} />
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-black">
                      Productos
                    </h3>

                    <div className="mt-5 space-y-5">
                      {summary.items?.map((item, index) => {
                        const lineTotal = (item.price ?? 0) * item.qty;

                        return (
                          <article
                            key={`${item.id}-${index}`}
                            className="flex items-start justify-between gap-4 border-b border-black/5 pb-5"
                          >
                            <div className="flex min-w-0 items-start gap-4">
                              <div className="relative h-16 w-16 shrink-0">
                                {item.mainImage ? (
                                  <Image
                                    src={item.mainImage}
                                    alt={item.name}
                                    fill
                                    sizes="64px"
                                    className="object-contain"
                                  />
                                ) : (
                                  <div className="h-16 w-16 rounded-xl bg-neutral-100" />
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="text-sm font-medium leading-6 text-black sm:text-[15px]">
                                  {item.name}
                                </p>

                                {(item.color || item.size) && (
                                  <p className="mt-1 text-xs text-neutral-400">
                                    {item.color ? `Color: ${item.color}` : ""}
                                    {item.color && item.size ? " · " : ""}
                                    {item.size ? `Talla: ${item.size}` : ""}
                                  </p>
                                )}

                                <p className="mt-1 text-xs text-neutral-500">
                                  Cantidad: {item.qty}
                                </p>
                              </div>
                            </div>

                            <p className="whitespace-nowrap text-sm font-semibold text-black">
                              S/ {lineTotal.toFixed(2)}
                            </p>
                          </article>
                        );
                      })}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-black">
                      Datos del cliente
                    </h3>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <InfoBlock label="Cliente" value={summary.nombres} />
                      <InfoBlock label="Teléfono" value={summary.telefono} />
                      <InfoBlock label="Correo" value={summary.email} />
                      <InfoBlock
                        label="Cupón"
                        value={summary.coupon_code || "No aplicado"}
                      />
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-black">
                      Dirección de entrega
                    </h3>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <InfoBlock
                        label="Ubicación"
                        value={`${summary.departamento}, ${summary.provincia}, ${summary.distrito}`}
                      />
                      <InfoBlock label="Dirección" value={summary.direccion} />
                      <InfoBlock
                        label="Referencia"
                        value={summary.referencia || "Sin referencia"}
                      />
                      <InfoBlock
                        label="Envío"
                        value={`${capitalize(summary.shippingMode)} · ${summary.carrier}`}
                      />
                    </div>
                  </section>
                </div>
              )}
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                Confirmación pendiente
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Tu orden aún no está confirmada
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                Tu banco está revisando tu pago. Apenas tengamos la aprobación,
                confirmaremos tu orden y te avisaremos por correo y WhatsApp.
              </p>
            </div>

            {summary && (
              <div className="mt-8 space-y-3 border-t border-black/10 pt-6">
                <SummaryRow label="Subtotal" value={`S/ ${summary.subtotal.toFixed(2)}`} />
                <SummaryRow label="Envío" value={`S/ ${summary.envio.toFixed(2)}`} />
                <SummaryRow label="Descuento" value={`- S/ ${summary.discount.toFixed(2)}`} />
                <div className="flex items-center justify-between pt-2 text-lg font-semibold text-black">
                  <span>Total pagado</span>
                  <span>S/ {summary.total.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/productos"
                className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:opacity-90"
              >
                Seguir comprando
              </Link>

              <Link
                href="/contacto"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-medium text-black transition hover:bg-neutral-50"
              >
                Contactar soporte
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function StatusCard({
  title,
  description,
  active = false,
}: {
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-black/10 px-5 py-5">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-3 w-3 rounded-full ${
            active ? "bg-black" : "bg-neutral-200"
          }`}
        />
        <p className="text-sm font-medium text-black">{title}</p>
      </div>

      <p className="mt-3 text-sm leading-7 text-neutral-500">{description}</p>
    </div>
  );
}

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-black sm:text-[15px]">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm text-neutral-500">
      <span>{label}</span>
      <span className="font-medium text-black">{value}</span>
    </div>
  );
}

function capitalize(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}