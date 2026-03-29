import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Wallet,
  Lock,
  Truck,
  BadgeCheck,
  CheckCircle2,
  CircleDollarSign,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const paymentMethods = [
  {
    name: "Visa",
    description: "Pagos rápidos y seguros con tarjetas Visa.",
  },
  {
    name: "Mastercard",
    description: "Procesamiento confiable para compras nacionales.",
  },
  {
    name: "Yape",
    description: "Confirma tu compra de forma práctica desde tu celular.",
  },
  {
    name: "Plin",
    description: "Alternativa ágil para pagos inmediatos.",
  },
  {
    name: "Transferencia bancaria",
    description: "Ideal para pedidos coordinados con mayor detalle.",
  },
];

const securityItems = [
  {
    icon: Lock,
    title: "Protección de datos",
    description:
      "Tu información personal y de compra se gestiona con criterios de seguridad y confidencialidad.",
  },
  {
    icon: ShieldCheck,
    title: "Compra confiable",
    description:
      "Procesos claros, validación de pedido y seguimiento para que compres con tranquilidad.",
  },
  {
    icon: BadgeCheck,
    title: "Respaldo real",
    description:
      "Atención directa, soporte postventa y acompañamiento durante todo el proceso.",
  },
];

const steps = [
  {
    step: "01",
    title: "Elige tu producto",
    description:
      "Explora nuestras cámaras, lentes y accesorios, revisa detalles y selecciona la opción ideal para ti.",
  },
  {
    step: "02",
    title: "Agrega al carrito",
    description:
      "Confirma la cantidad, revisa tu pedido y continúa con una experiencia de compra simple y ordenada.",
  },
  {
    step: "03",
    title: "Completa tus datos",
    description:
      "Ingresa tu información de envío y contacto para procesar el pedido de forma correcta y segura.",
  },
  {
    step: "04",
    title: "Realiza el pago",
    description:
      "Paga con el método que prefieras y recibe la confirmación para continuar con la atención de tu compra.",
  },
  {
    step: "05",
    title: "Recibe tu confirmación",
    description:
      "Verificamos tu pedido, coordinamos el despacho y te mantenemos informado del siguiente paso.",
  },
];

const guarantees = [
  "Atención personalizada antes y después de tu compra.",
  "Acompañamiento en la validación del pedido y pago.",
  "Productos seleccionados con enfoque en confianza y calidad.",
  "Comunicación clara sobre envío, coordinación y soporte.",
];

export default function CompraFacilSeguraPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_45%)]" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm font-medium text-neutral-700">
              <Sparkles className="h-4 w-4" />
              Compra fácil, clara y segura
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Compra con confianza en
              <span className="block">LensHubPeru</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
              Diseñamos una experiencia de compra moderna, simple y segura para
              que elijas tus productos con tranquilidad, pagues de forma
              confiable y recibas atención real en cada etapa.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/productos"
                className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Ver productos
              </Link>

              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
              >
                Resolver dudas
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-4 border-t border-black/10 pt-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-500">
                  Métodos de pago
                </p>
                <p className="mt-1 text-base font-semibold text-neutral-900">
                  Seguros y flexibles
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-500">
                  Protección
                </p>
                <p className="mt-1 text-base font-semibold text-neutral-900">
                  Datos y proceso de compra
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-500">
                  Soporte
                </p>
                <p className="mt-1 text-base font-semibold text-neutral-900">
                  Atención y respaldo real
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTODOS DE PAGO */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Métodos de pago
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Opciones cómodas para comprar como prefieras
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Ofrecemos métodos de pago prácticos y conocidos para que tu
                experiencia sea más simple, rápida y confiable desde el primer
                clic hasta la confirmación final.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="border-b border-black/10 pb-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
                      <CreditCard className="h-5 w-5 text-neutral-900" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-950">
                      {method.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEGURIDAD */}
      <section className="border-t border-black/10 bg-neutral-50/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Seguridad
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Tu compra protegida en cada etapa
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600">
              Queremos que sientas tranquilidad al comprar. Por eso priorizamos
              procesos ordenados, protección de información y comunicación clara
              durante toda la experiencia.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {securityItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                    <Icon className="h-5 w-5 text-neutral-950" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-neutral-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Proceso de compra
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Todo pensado para que comprar sea simple
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-neutral-600">
                Sin pasos confusos, sin exceso de elementos, sin fricción
                innecesaria. Solo una experiencia clara y moderna que acompaña
                al cliente desde la elección del producto hasta la confirmación.
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((item, index) => (
                <div
                  key={item.step}
                  className="flex gap-5 border-b border-black/10 pb-8 last:border-b-0 last:pb-0"
                >
                  <div className="min-w-[60px]">
                    <span className="text-sm font-semibold tracking-[0.18em] text-neutral-400">
                      {item.step}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-neutral-950 sm:text-xl">
                        {item.title}
                      </h3>
                      {index !== steps.length - 1 && (
                        <ChevronRight className="mt-1 h-5 w-5 text-neutral-300" />
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GARANTÍA Y RESPALDO */}
      <section className="border-t border-black/10 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
                Garantía y respaldo
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Más que una compra: una experiencia con soporte
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
                En LensHubPeru buscamos que cada cliente sienta confianza antes,
                durante y después de comprar. Nuestro enfoque no es solo vender,
                sino brindar una experiencia seria, transparente y respaldada.
              </p>
            </div>

            <div className="space-y-5">
              {guarantees.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-white" />
                  <p className="text-sm leading-7 text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESUMEN FINAL */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                ¿Por qué comprar aquí?
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Una compra moderna, segura y con atención real
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
                Combinamos diseño, confianza y claridad para que tu experiencia
                sea cómoda de principio a fin. Desde los métodos de pago hasta
                el seguimiento de tu pedido, cada detalle está pensado para
                transmitir seguridad y profesionalismo.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-neutral-900" />
                <span className="text-sm font-medium text-neutral-700">
                  Pagos confiables
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CircleDollarSign className="h-5 w-5 text-neutral-900" />
                <span className="text-sm font-medium text-neutral-700">
                  Proceso claro y simple
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-neutral-900" />
                <span className="text-sm font-medium text-neutral-700">
                  Coordinación y seguimiento
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}