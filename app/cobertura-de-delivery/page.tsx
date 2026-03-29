import {
  MapPinned,
  Truck,
  Clock3,
  BadgeCheck,
  PackageCheck,
} from "lucide-react";

const limaOptions = [
  {
    title: "Envío regular",
    price: "S/ 12",
    time: "24 a 48 horas",
    detail: "Vía Urbano.",
  },
  {
    title: "Envío express",
    price: "S/ 20",
    time: "Mismo día",
    detail: "Disponible si el pedido se realiza antes de las 4:00 p.m.",
  },
];

const provinciaOptions = [
  {
    title: "Envío a provincia",
    price: "S/ 16",
    time: "24 a 72 horas",
    detail: "Se envía vía Shalom con entrega a domicilio.",
  },
];

export default function CoberturaDeliveryPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <Truck className="h-5 w-5 text-neutral-950" />
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Cobertura de delivery
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            Conoce nuestras opciones de envío disponibles para Lima y provincia.
            Trabajamos con procesos claros para que tu compra llegue de forma
            segura y en el menor tiempo posible.
          </p>
        </div>
      </section>

      {/* Lima */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Lima
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                Dos opciones de envío para mayor flexibilidad
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Si tu pedido es para Lima, puedes elegir entre un envío regular
                o una opción express para entregas el mismo día, según el horario
                de compra.
              </p>
            </div>

            <div className="space-y-8">
              {limaOptions.map((option) => (
                <article
                  key={option.title}
                  className="border-b border-black/10 pb-8 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-950">
                        {option.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-neutral-600 sm:text-base">
                        {option.detail}
                      </p>
                    </div>

                    <div className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-neutral-950">
                      {option.price}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-neutral-700">
                    <Clock3 className="h-4 w-4" />
                    <span>{option.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Provincia */}
      <section className="border-t border-black/10 bg-neutral-50/70">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Provincia
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                Envío a domicilio vía Shalom
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
                Para envíos a provincia contamos con una opción de despacho
                segura y práctica, con entrega a domicilio y seguimiento
                disponible.
              </p>
            </div>

            <div className="space-y-8">
              {provinciaOptions.map((option) => (
                <article
                  key={option.title}
                  className="border-b border-black/10 pb-8 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-950">
                        {option.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-neutral-600 sm:text-base">
                        {option.detail}
                      </p>
                    </div>

                    <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
                      {option.price}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-neutral-700">
                    <Clock3 className="h-4 w-4" />
                    <span>{option.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Información adicional */}
      <section className="border-t border-black/10">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <MapPinned className="h-5 w-5 text-neutral-950" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-950">
                Cobertura clara
              </h3>
              <p className="text-sm leading-7 text-neutral-600">
                Contamos con opciones específicas para Lima y provincia, con
                tiempos estimados para cada tipo de envío.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <PackageCheck className="h-5 w-5 text-neutral-950" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-950">
                Seguimiento disponible
              </h3>
              <p className="text-sm leading-7 text-neutral-600">
                Para envíos a provincia, el número de seguimiento se encuentra
                disponible para un mejor control de tu pedido.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <BadgeCheck className="h-5 w-5 text-neutral-950" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-950">
                Proceso confiable
              </h3>
              <p className="text-sm leading-7 text-neutral-600">
                Validamos y coordinamos cada pedido para ofrecer una experiencia
                de compra ordenada, segura y transparente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}