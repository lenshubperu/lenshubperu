import {
  CreditCard,
  Smartphone,
  Landmark,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function MetodosDePagoPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* HERO */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Métodos de pago
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            En LensHubPeru ofrecemos opciones de pago seguras y prácticas para
            que completes tu compra de forma rápida, confiable y sin
            complicaciones.
          </p>
        </div>
      </section>

      {/* MÉTODOS */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 sm:grid-cols-2">
            {/* Visa */}
            <div className="space-y-4 border-b border-black/10 pb-6">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Tarjetas Visa</h2>
              </div>
              <p className="text-sm leading-7 text-neutral-600">
                Aceptamos pagos con tarjetas Visa de forma rápida y segura.
                Puedes completar tu compra en pocos pasos.
              </p>
            </div>

            {/* Mastercard */}
            <div className="space-y-4 border-b border-black/10 pb-6">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Mastercard</h2>
              </div>
              <p className="text-sm leading-7 text-neutral-600">
                Realiza tus compras con tarjetas Mastercard con total confianza
                y validación del pedido.
              </p>
            </div>

            {/* Yape */}
            <div className="space-y-4 border-b border-black/10 pb-6">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Yape</h2>
              </div>
              <p className="text-sm leading-7 text-neutral-600">
                Paga fácilmente desde tu celular y envía tu comprobante para
                confirmar tu pedido.
              </p>
            </div>

            {/* Plin */}
            <div className="space-y-4 border-b border-black/10 pb-6">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Plin</h2>
              </div>
              <p className="text-sm leading-7 text-neutral-600">
                Alternativa rápida para pagos inmediatos con validación manual
                del pedido.
              </p>
            </div>

            {/* Transferencia */}
            <div className="space-y-4 border-b border-black/10 pb-6 sm:col-span-2">
              <div className="flex items-center gap-3">
                <Landmark className="h-5 w-5" />
                <h2 className="text-lg font-semibold">
                  Transferencia bancaria
                </h2>
              </div>
              <p className="text-sm leading-7 text-neutral-600">
                También puedes realizar tu pago mediante transferencia bancaria.
                Nuestro equipo validará el depósito antes de procesar el pedido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEGURIDAD */}
      <section className="border-t border-black/10 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <ShieldCheck className="h-5 w-5 text-neutral-900" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-neutral-950">
              Compra segura
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
              Todos los pagos son gestionados con validación del pedido y
              seguimiento para garantizar una experiencia confiable y
              transparente.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5" />
              <span className="text-sm text-neutral-700">
                Validación manual de pedidos
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5" />
              <span className="text-sm text-neutral-700">
                Confirmación de pago antes del envío
              </span>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5" />
              <span className="text-sm text-neutral-700">
                Atención directa por WhatsApp o correo
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}