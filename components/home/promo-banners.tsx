import Image from "next/image";
import Link from "next/link";

export default function PromoBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-black text-white">
          <Image
            src="/banners/instax-banner.jpg"
            alt="Colección Instax y Fujifilm"
            fill
            priority
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

          <div className="relative z-10 flex h-full max-w-[560px] flex-col justify-end p-8 sm:p-10 lg:p-12">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">
              Nueva colección
            </p>

            <h3 className="mt-4 text-3xl font-semibold leading-[1.02] sm:text-4xl lg:text-[44px]">
              Fujifilm e Instax para cada momento.
            </h3>

            <p className="mt-5 max-w-[46ch] text-sm leading-7 text-white/80 sm:text-base">
              Cámaras instantáneas, accesorios y equipos pensados para crear,
              recordar y compartir.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/productos?category=${encodeURIComponent("Instantáneas")}`}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                Ver instantáneas
              </Link>
            </div>
          </div>
        </article>

        <article className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f7f8]">
          <Image
            src="/banners/dji-banner.jpg"
            alt="Drones y accesorios premium"
            fill
            className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/82 via-white/68 to-white/88" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                Profesional
              </p>

              <h3 className="mt-4 max-w-[10ch] text-3xl font-semibold leading-[1.04] text-black sm:text-4xl">
                Drones, lentes y accesorios premium.
              </h3>
            </div>

            <div>
              <p className="max-w-[34ch] text-sm leading-7 text-neutral-600 sm:text-base">
                Equipos modernos y confiables para elevar tu trabajo y tu
                contenido.
              </p>

              <div className="mt-6">
                <Link
                  href={`/productos?category=${encodeURIComponent("Drones")}`}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
                >
                  Ver drones
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}