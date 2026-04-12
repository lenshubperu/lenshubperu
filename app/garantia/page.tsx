import {
  ShieldCheck,
  RefreshCcw,
  ReceiptText,
  BadgeCheck,
  Clock3,
  FileText,
} from "lucide-react";

const guaranteeItems = [
  {
    title: "1 año de garantía",
    description:
      "Todos nuestros productos cuentan con 1 año de garantía para brindarte mayor confianza en tu compra.",
    icon: ShieldCheck,
  },
  {
    title: "Devolución dentro de los 7 días",
    description:
      "Aceptamos devoluciones dentro de los 7 días, sujeto a evaluación y condiciones del producto.",
    icon: RefreshCcw,
  },
  {
    title: "Boleta o factura",
    description:
      "Emitimos boleta o factura según lo que necesites al momento de realizar tu compra.",
    icon: ReceiptText,
  },
];

const supportItems = [
  "Respaldo y atención postventa.",
  "Proceso claro para consultas de garantía.",
  "Documentación de compra disponible con boleta o factura.",
];

export default function GarantiaPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <BadgeCheck className="h-5 w-5 text-neutral-950" />
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Garantía
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            Queremos que compres con confianza. Por eso te ofrecemos respaldo,
            condiciones claras y documentación formal en cada pedido.
          </p>
        </div>
      </section>

      {/* Beneficios */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {guaranteeItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                    <Icon className="h-5 w-5 text-neutral-950" />
                  </div>

                  <h2 className="text-xl font-semibold text-neutral-950">
                    {item.title}
                  </h2>

                  <p className="text-sm leading-7 text-neutral-600 sm:text-base">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Respaldo */}
      <section className="border-t border-black/10 bg-neutral-50/70">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Respaldo al cliente
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                Atención clara antes y después de tu compra
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Nuestra política de garantía busca darte tranquilidad con un
                proceso ordenado, transparente y respaldado por comprobantes de
                compra.
              </p>
            </div>

            <div className="space-y-6">
              {supportItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 border-b border-black/10 pb-5 last:border-b-0 last:pb-0"
                >
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-neutral-950" />
                  <p className="text-sm leading-7 text-neutral-700 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resumen de condiciones */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Condiciones generales
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4 border-b border-black/10 pb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <Clock3 className="h-4 w-4 text-neutral-950" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-950">
                    Garantía de 1 año
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-600 sm:text-base">
                    La cobertura aplica a nuestros productos durante un período
                    de 1 año.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-black/10 pb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <RefreshCcw className="h-4 w-4 text-neutral-950" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-950">
                    Devolución dentro de 7 días
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-600 sm:text-base">
                    Las devoluciones pueden solicitarse dentro de los 7 días,
                    según evaluación y condiciones del producto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  <FileText className="h-4 w-4 text-neutral-950" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-950">
                    Comprobante de compra
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-600 sm:text-base">
                    Emitimos boleta o factura para respaldar formalmente cada
                    compra realizada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}   