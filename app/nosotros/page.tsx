import Image from "next/image";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <Image
                src="/logo-lenshub-black.png"
                alt="LensHub Perú"
                width={180}
                height={54}
                className="h-auto w-36 sm:w-44"
                priority
              />
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-neutral-500">
              Sobre nosotros
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              Tecnología para crear, capturar y contar mejor cada historia.
            </h1>

            <p className="mt-6 max-w-[52ch] text-base leading-8 text-neutral-600 sm:text-lg">
              En LensHub Perú seleccionamos cámaras, drones, instantáneas,
              lentes y accesorios pensados para personas que crean contenido,
              emprenden o simplemente quieren capturar momentos con mejor nivel.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/productos"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-black px-7 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Ver productos
              </Link>

              <a
                href="https://wa.me/51928297040?text=Hola%2C%20vengo%20de%20la%20web%20y%20quiero%20comprar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-black/10 px-7 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-50"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 hidden h-32 w-32 rounded-full bg-neutral-100 lg:block" />
            <div className="absolute -bottom-6 right-10 hidden h-24 w-24 rounded-full bg-neutral-200 lg:block" />

            <div className="relative overflow-hidden rounded-[2rem] bg-neutral-100">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/about/lenshub-about.jpg"
                  alt="LensHub Perú"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
              Nuestra visión
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Una tienda que combine tecnología, confianza y buena experiencia.
            </h2>
          </div>

          <div className="space-y-6 text-[15px] leading-8 text-neutral-600 sm:text-base">
            <p>
              No buscamos ser solo un catálogo de productos. Queremos que
              comprar una cámara, un drone o un accesorio se sienta claro,
              moderno y confiable desde el primer vistazo.
            </p>

            <p>
              Por eso trabajamos una selección cuidada de equipos, precios
              transparentes y una atención directa que te ayude a elegir mejor,
              ya sea que compres online o en tienda.
            </p>

            <p>
              En LensHub priorizamos productos originales, una presentación
              limpia y una experiencia de marca que se sienta tan bien como el
              equipo que estás comprando.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                Lo que nos define
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h3 className="text-lg font-semibold">Productos originales</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    Equipos seleccionados para fotografía, video, contenido y
                    uso profesional.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Precios claros</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    Mostramos precio online y precio en tienda de forma directa,
                    sin vueltas.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Atención rápida</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    Soporte por WhatsApp y acompañamiento antes, durante y
                    después de la compra.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Compra segura</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    Una experiencia simple, ordenada y pensada para generar
                    confianza.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Envíos y recojo</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    Online y presencial en Lima, con opciones prácticas para tu
                    compra.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Marca moderna</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">
                    Cuidamos tanto el producto como la forma en que lo
                    presentamos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 rounded-[2rem] bg-black px-8 py-10 text-white sm:px-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                LensHub Perú
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                El equipo correcto cambia la forma en que creas.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                Descubre nuestra selección y encuentra el producto ideal para tu
                próximo proyecto, contenido o momento.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/productos"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                Ver productos
              </Link>

              <a
                href="https://wa.me/51928297040?text=Hola%2C%20vengo%20de%20la%20web%20y%20quiero%20comprar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}