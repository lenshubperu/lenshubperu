import Link from "next/link";
import {
  Clock3,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#0f0f10] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* GRID PRINCIPAL */}
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          {/* MARCA + CONTACTO */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              LensHub Perú
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
              Cámaras, drones y equipos profesionales con una experiencia de compra moderna y confiable.
            </p>

            <div className="mt-6 space-y-4 text-sm text-white/80">
              <a
                href="https://wa.me/51928297040?text=Hola,%20vengo%20de%20la%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:opacity-80"
              >
                <FaWhatsapp className="mt-0.5 h-5 w-5 text-green-400" />
                <span>Atención por WhatsApp</span>
              </a>

              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 text-white/55" />
                <span>Lun - Sáb 9:00 am a 6:00 pm</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-white/55" />
                <span>ventas@lenshubperu.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-white/55" />
                <span>Lima, Perú</span>
              </div>
            </div>

            {/* REDES */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white"
              >
                <FaFacebookF className="h-4 w-4 text-white/70 group-hover:text-black" />
              </a>

              <a
                href="#"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white"
              >
                <FaInstagram className="h-4 w-4 text-white/70 group-hover:text-black" />
              </a>

              <a
                href="#"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white"
              >
                <FaYoutube className="h-4 w-4 text-white/70 group-hover:text-black" />
              </a>
            </div>
          </div>

          {/* SOBRE NOSOTROS */}
          <div>
            <h4 className="text-lg font-semibold">Sobre nosotros</h4>

            <div className="mt-5 space-y-4 text-sm text-white/75">
              <Link href="/nosotros" className="block hover:text-white">
                ¿Quiénes somos?
              </Link>
              <Link href="/contacto" className="block hover:text-white">
                Canales de atención
              </Link>
              <Link href="/compra-facil-y-segura" className="block hover:text-white">
                Compra fácil y seguro
              </Link>
              <Link href="/metodos-de-pago" className="block hover:text-white">
                Métodos de pago
              </Link>
            </div>
          </div>

          {/* INFORMACIÓN */}
          <div>
            <h4 className="text-lg font-semibold">Te informamos</h4>

            <div className="mt-5 space-y-4 text-sm text-white/75">
              <Link href="/nuestras-tiendas" className="block hover:text-white">
                Nuestras tiendas
              </Link>
              <Link href="/cobertura-de-delivery" className="block hover:text-white">
                Cobertura de delivery
              </Link>
              <Link href="/garantia" className="block hover:text-white">
                Garantía
              </Link>
              <Link href="/terminos-y-condiciones" className="block hover:text-white">
                Términos y condiciones
              </Link>
              <Link href="/politica-de-privacidad" className="block hover:text-white">
                Políticas de privacidad
              </Link>
            </div>
          </div>

          {/* DESTACADOS */}
          <div>
            <h4 className="text-lg font-semibold">Destacados</h4>

            <div className="mt-5 space-y-4 text-sm text-white/75">
              <p>Envíos a todo el Perú</p>
              <p>Compra online segura</p>
              <p>Soporte rápido por WhatsApp</p>
              <p>Productos originales</p>
            </div>
          </div>
        </div>

        {/* MÉTODOS DE PAGO */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <p className="text-white/70">Compra segura con:</p>

          <div className="mt-4 flex flex-wrap gap-3">
            {[
              "Visa",
              "MasterCard",
              "American Express",
              "Yape",
              "Plin",
              "PagoEfectivo",
              "Mercado Pago",
            ].map((method) => (
              <span
                key={method}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
            <p>© 2026 LensHub Perú. Todos los derechos reservados.</p>

            <div className="flex gap-5">
              <Link href="/contacto" className="hover:text-white">
                Tiendas
              </Link>
              <Link href="/contacto" className="hover:text-white">
                Atención
              </Link>
              <Link href="/contacto" className="hover:text-white">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}