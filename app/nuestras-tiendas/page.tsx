import Link from "next/link";
import { MapPin, Clock3, Navigation, Store } from "lucide-react";

export default function NuestrasTiendasPage() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <Store className="h-5 w-5 text-neutral-950" />
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Nuestras tiendas
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            Visítanos en nuestra tienda física y recibe atención directa para
            conocer nuestros productos, resolver tus dudas y comprar con mayor
            confianza.
          </p>
        </div>
      </section>

      {/* Información principal */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Tienda física
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                LensHubPeru
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
                Te esperamos en nuestra ubicación para brindarte una experiencia
                de compra más cercana, segura y personalizada.
              </p>

              <div className="mt-10 space-y-8">
                <div className="flex items-start gap-4 border-b border-black/10 pb-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <MapPin className="h-5 w-5 text-neutral-950" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-950">
                      Dirección
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600 sm:text-base">
                      Telares 155, referencia: a unas puertas del laboratorio
                      Dentaid Peru.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b border-black/10 pb-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <Clock3 className="h-5 w-5 text-neutral-950" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-950">
                      Horario de atención
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600 sm:text-base">
                      Lunes a sábado, de 8:00 a.m. a 5:00 p.m.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-2">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    <Navigation className="h-5 w-5 text-neutral-950" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-950">
                      Cómo llegar
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600 sm:text-base">
                      Puedes abrir la ubicación directamente en Google Maps para
                      llegar más rápido a nuestra tienda.
                    </p>

                    <Link
                      href="https://maps.app.goo.gl/7fUgt9g2EerArv549"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                    >
                      Ver ubicación en Google Maps
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel lateral limpio */}
            <div className="rounded-[2rem] border border-black/10 bg-neutral-50 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                Atención presencial
              </p>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                Compra con más confianza
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
                En nuestra tienda puedes recibir orientación directa, conocer
                mejor los productos y resolver dudas antes de finalizar tu
                compra.
              </p>

              <div className="mt-8 space-y-4 border-t border-black/10 pt-6">
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Ubicación
                  </p>
                  <p className="mt-1 text-sm text-neutral-900 sm:text-base">
                    Telares 155
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Referencia
                  </p>
                  <p className="mt-1 text-sm text-neutral-900 sm:text-base">
                    A unas puertas de laboratorio Dentaid Peru
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Horario
                  </p>
                  <p className="mt-1 text-sm text-neutral-900 sm:text-base">
                    Lunes a sábado · 8:00 a.m. – 5:00 p.m.
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