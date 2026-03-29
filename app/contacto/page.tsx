import { Mail, MapPin, Building2, Clock3 } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ContactoPage() {
  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
              Canales de atención
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              Estamos listos para ayudarte a encontrar el equipo ideal.
            </h1>

            <p className="mt-6 max-w-[58ch] text-base leading-8 text-neutral-600 sm:text-lg">
              En LensHubPeru te atendemos de forma clara, rápida y profesional.
              Si deseas comprar, cotizar o resolver una duda, puedes escribirnos
              directamente por WhatsApp o por correo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/51928297040?text=Hola%2C%20vengo%20de%20la%20web%20y%20quiero%20informaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-black px-7 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                <FaWhatsapp className="text-base" />
                Escribir por WhatsApp
              </a>

              <a
                href="mailto:ventas@lenshubperu.com"
                className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full border border-black/10 px-7 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-50"
              >
                <Mail className="h-4 w-4" />
                Enviar correo
              </a>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
                  <FaWhatsapp className="text-lg text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold">WhatsApp</h2>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  Nuestro canal principal para compras, consultas y atención
                  rápida.
                </p>
                <p className="mt-3 text-sm font-medium text-black">
                  928 297 040
                </p>
              </div>

              <div>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
                  <Mail className="h-5 w-5 text-neutral-700" />
                </div>
                <h2 className="text-lg font-semibold">Correo</h2>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  Para consultas más detalladas o coordinación adicional.
                </p>
                <p className="mt-3 text-sm font-medium text-black">
                  ventas@lenshubperu.com
                </p>
              </div>

              <div>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
                  <MapPin className="h-5 w-5 text-neutral-700" />
                </div>
                <h2 className="text-lg font-semibold">Dirección</h2>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  Telares 155, referencia: a unas puertas de laboratorio Dentaid
                  Peru.
                </p>
                <p className="mt-3 text-sm font-medium text-black">
                  Lima, Perú
                </p>
              </div>

              <div>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
                  <Clock3 className="h-5 w-5 text-neutral-700" />
                </div>
                <h2 className="text-lg font-semibold">Atención</h2>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  Te responderemos con la mayor rapidez posible por nuestros
                  canales oficiales.
                </p>
                <p className="mt-3 text-sm font-medium text-black">
                  Atención online y presencial
                </p>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-neutral-50">
              <div className="border-b border-black/10 px-6 py-5">
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                  Información comercial
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  LensHubPeru
                </h2>
              </div>

              <div className="space-y-6 px-6 py-6">
                <div className="flex items-start gap-4">
                  <Building2 className="mt-0.5 h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-500">Razón social</p>
                    <p className="mt-1 text-sm font-medium leading-7 text-black">
                      DIGITAL HUB &amp; CO PERU S.A.C.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Building2 className="mt-0.5 h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-500">RUC</p>
                    <p className="mt-1 text-sm font-medium text-black">
                      20605303251
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-500">Dirección</p>
                    <p className="mt-1 text-sm font-medium leading-7 text-black">
                      Telares 155, ref. a unas puertas de laboratorio Dentaid
                      Peru
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-black px-5 py-5 text-white">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/60">
                    Compra rápida
                  </p>
                  <p className="mt-3 text-lg font-semibold">
                    Escríbenos por WhatsApp
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/75">
                    Te ayudamos con información, disponibilidad, precios y
                    proceso de compra.
                  </p>

                  <a
                    href="https://wa.me/51928297040?text=Hola%2C%20vengo%20de%20la%20web%20y%20quiero%20informaci%C3%B3n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-100"
                  >
                    <FaWhatsapp className="text-base" />
                    928 297 040
                  </a>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">Redes</p>
                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href="#"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition hover:bg-black hover:text-white"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="text-base" />
                    </a>

                    <a
                      href="https://wa.me/51928297040?text=Hola%2C%20vengo%20de%20la%20web%20y%20quiero%20informaci%C3%B3n"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-700 transition hover:bg-black hover:text-white"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp className="text-base" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}