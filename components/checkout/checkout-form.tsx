"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/store/cart-store";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/validations/checkout-schema";
import {
  applyCouponDiscount,
  getShippingDescription,
  getShippingLabel,
  getShippingPrice,
} from "@/lib/checkout";

export default function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nombres: "",
      documentType: "dni",
      telefono: "",
      correo: "",
      departamento: "",
      provincia: "",
      distrito: "",
      direccion: "",
      referencia: "",
      shippingZone: "lima",
      shippingType: "regular",
      receiptType: "boleta",
      ruc: "",
      coupon: "",
    },
  });

  const shippingZone = form.watch("shippingZone");
  const shippingType = form.watch("shippingType");
  const receiptType = form.watch("receiptType");
  const coupon = form.watch("coupon");

  const safeShippingType =
    shippingZone === "provincia" ? "regular" : shippingType;

  const shippingPrice = useMemo(
    () => getShippingPrice(shippingZone, safeShippingType),
    [shippingZone, safeShippingType]
  );

  const couponDiscount = useMemo(
    () => applyCouponDiscount(subtotal, coupon),
    [subtotal, coupon]
  );

  const total = Math.max(subtotal + shippingPrice - couponDiscount, 0);

  const onSubmit = (values: CheckoutFormValues) => {
    const shippingLabel = getShippingLabel(
      values.shippingZone,
      values.shippingZone === "provincia" ? "regular" : values.shippingType
    );

    const productsText = items
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} = S/ ${(item.price * item.quantity).toLocaleString("es-PE")}`
      )
      .join("\n");

    const message =
      `Hola, vengo de la web y quiero finalizar mi compra.\n\n` +
      `Productos:\n${productsText}\n\n` +
      `Subtotal: S/ ${subtotal.toLocaleString("es-PE")}\n` +
      `Envío: S/ ${shippingPrice.toLocaleString("es-PE")} (${shippingLabel})\n` +
      `Descuento cupón: S/ ${couponDiscount.toLocaleString("es-PE")}\n` +
      `Total: S/ ${total.toLocaleString("es-PE")}\n\n` +
      `Datos del cliente:\n` +
      `Nombres: ${values.nombres}\n` +
      `Documento: ${values.documentType}\n` +
      `Teléfono: ${values.telefono}\n` +
      `Correo: ${values.correo}\n` +
      `Departamento: ${values.departamento}\n` +
      `Provincia: ${values.provincia}\n` +
      `Distrito: ${values.distrito}\n` +
      `Dirección: ${values.direccion}\n` +
      `Referencia: ${values.referencia || "-"}\n` +
      `Comprobante: ${values.receiptType}\n` +
      `RUC: ${values.receiptType === "factura" ? values.ruc : "-"}\n` +
      `Cupón: ${values.coupon || "-"}\n`;

    window.open(
      `https://wa.me/51928297040?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (!items.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm text-neutral-500">
          Tu carrito está vacío. Agrega productos antes de continuar.
        </p>
      </div>
    );
  }

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
            Checkout
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Finalizar compra
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600">
            Completa tus datos para generar tu pedido de forma rápida y segura.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px]"
        >
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold">Datos del cliente</h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Nombres"
                  error={form.formState.errors.nombres?.message}
                >
                  <input
                    {...form.register("nombres")}
                    className={inputClass}
                    placeholder="Tus nombres"
                  />
                </Field>

                <Field
                  label="Tipo de documento"
                  error={form.formState.errors.documentType?.message}
                >
                  <select {...form.register("documentType")} className={inputClass}>
                    <option value="dni">DNI</option>
                    <option value="ce">Carné de extranjería</option>
                    <option value="passport">Pasaporte</option>
                  </select>
                </Field>

                <Field
                  label="Teléfono"
                  error={form.formState.errors.telefono?.message}
                >
                  <input
                    {...form.register("telefono")}
                    className={inputClass}
                    placeholder="999999999"
                  />
                </Field>

                <Field
                  label="Correo"
                  error={form.formState.errors.correo?.message}
                >
                  <input
                    {...form.register("correo")}
                    className={inputClass}
                    placeholder="correo@ejemplo.com"
                  />
                </Field>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Dirección de entrega</h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Departamento"
                  error={form.formState.errors.departamento?.message}
                >
                  <input
                    {...form.register("departamento")}
                    className={inputClass}
                    placeholder="Lima"
                  />
                </Field>

                <Field
                  label="Provincia"
                  error={form.formState.errors.provincia?.message}
                >
                  <input
                    {...form.register("provincia")}
                    className={inputClass}
                    placeholder="Lima"
                  />
                </Field>

                <Field
                  label="Distrito"
                  error={form.formState.errors.distrito?.message}
                >
                  <input
                    {...form.register("distrito")}
                    className={inputClass}
                    placeholder="Miraflores"
                  />
                </Field>

                <Field
                  label="Dirección de entrega"
                  error={form.formState.errors.direccion?.message}
                >
                  <input
                    {...form.register("direccion")}
                    className={inputClass}
                    placeholder="Av. Ejemplo 123"
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Referencia (opcional)"
                    error={form.formState.errors.referencia?.message}
                  >
                    <input
                      {...form.register("referencia")}
                      className={inputClass}
                      placeholder="Frente al parque, edificio gris, etc."
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Método de envío</h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Zona de envío"
                  error={form.formState.errors.shippingZone?.message}
                >
                  <select
                    {...form.register("shippingZone")}
                    className={inputClass}
                  >
                    <option value="lima">Lima</option>
                    <option value="provincia">Provincia</option>
                  </select>
                </Field>

                <Field
                  label="Tipo de envío"
                  error={form.formState.errors.shippingType?.message}
                >
                  <select
                    {...form.register("shippingType")}
                    className={inputClass}
                    disabled={shippingZone === "provincia"}
                  >
                    <option value="regular">Envío regular</option>
                    {shippingZone === "lima" && (
                      <option value="express">Envío express</option>
                    )}
                  </select>
                </Field>
              </div>

              <div className="mt-4 text-sm leading-7 text-neutral-600">
                <p className="font-medium text-black">
                  {getShippingLabel(shippingZone, safeShippingType)}
                </p>
                <p>{getShippingDescription(shippingZone, safeShippingType)}</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Comprobante y cupón</h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Comprobante"
                  error={form.formState.errors.receiptType?.message}
                >
                  <select {...form.register("receiptType")} className={inputClass}>
                    <option value="boleta">Boleta</option>
                    <option value="factura">Factura</option>
                  </select>
                </Field>

                <Field label="Cupón" error={form.formState.errors.coupon?.message}>
                  <input
                    {...form.register("coupon")}
                    className={inputClass}
                    placeholder="Ingresa tu cupón"
                  />
                </Field>

                {receiptType === "factura" && (
                  <Field
                    label="RUC"
                    error={form.formState.errors.ruc?.message}
                  >
                    <input
                      {...form.register("ruc")}
                      className={inputClass}
                      placeholder="Número de RUC"
                    />
                  </Field>
                )}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold">Resumen del pedido</h2>
              </div>

              <div className="space-y-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 border-b border-black/5 pb-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-black">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-neutral-500">
                        Cantidad: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-black">
                      S/ {(item.price * item.quantity).toLocaleString("es-PE")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-black/10 pt-5 text-sm">
                <Row label="Subtotal" value={`S/ ${subtotal.toLocaleString("es-PE")}`} />
                <Row
                  label="Envío"
                  value={`S/ ${shippingPrice.toLocaleString("es-PE")}`}
                />
                <Row
                  label="Descuento cupón"
                  value={`S/ ${couponDiscount.toLocaleString("es-PE")}`}
                />
                <div className="flex items-center justify-between pt-2 text-base font-semibold text-black">
                  <span>Total</span>
                  <span>S/ {total.toLocaleString("es-PE")}</span>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Confirmar pedido
              </button>

              <p className="text-xs leading-6 text-neutral-400">
                Al confirmar, se abrirá WhatsApp con el resumen completo de tu pedido.
              </p>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-black">{label}</span>
      {children}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-neutral-600">
      <span>{label}</span>
      <span className="font-medium text-black">{value}</span>
    </div>
  );
}

const inputClass =
  "h-[52px] w-full rounded-2xl border border-black/10 px-4 text-sm outline-none transition focus:border-black/20";