"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart, X, Search, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import CartDrawer from "@/components/cart/cart-drawer";

const QUICK_SEARCHES = [
  "Cámaras",
  "Drones",
  "Instax",
  "Lentes",
  "Canon",
  "DJI",
];

export default function Header() {
  const { count } = useCart();
  const router = useRouter();

  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!openMenu) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openMenu]);

  const goToSearch = (value?: string) => {
    const finalValue = (value ?? mobileSearch).trim();

    if (!finalValue) {
      router.push("/productos");
      setOpenMenu(false);
      return;
    }

    router.push(`/productos?search=${encodeURIComponent(finalValue)}`);
    setOpenMenu(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-lenshub-black.png"
              alt="LensHub"
              width={170}
              height={48}
              className="h-auto w-32 sm:w-40"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/productos"
              className="text-sm font-medium text-black transition hover:opacity-60"
            >
              Productos
            </Link>

            <Link
              href="/nosotros"
              className="text-sm font-medium text-black transition hover:opacity-60"
            >
              Nosotros
            </Link>

            <Link
              href="/contacto"
              className="text-sm font-medium text-black transition hover:opacity-60"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpenCart(true)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-neutral-50"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="h-5 w-5" />

              {count > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-[11px] font-medium text-white">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpenMenu(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-neutral-50 md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />

      {mounted && (
        <div
          className={`fixed inset-0 z-[80] md:hidden ${
            openMenu ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div
            onClick={() => setOpenMenu(false)}
            className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
              openMenu ? "opacity-100" : "opacity-0"
            }`}
          />

          <aside
            className={`absolute right-0 top-0 flex h-full w-[90%] max-w-sm flex-col border-l border-black/10 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out ${
              openMenu ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="border-b border-black/10 px-5 pb-5 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">
                    LensHub Perú
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-black">
                    Descubre productos y marcas
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenMenu(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-neutral-50"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 rounded-[28px] border border-black/10 bg-neutral-50/80 p-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                  <input
                    type="text"
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        goToSearch();
                      }
                    }}
                    placeholder="Buscar cámaras, drones, marcas..."
                    className="h-12 w-full rounded-full border border-black/10 bg-white pl-11 pr-20 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-black/20"
                  />

                  <button
                    type="button"
                    onClick={() => goToSearch()}
                    className="absolute right-2 top-1/2 inline-flex h-8 -translate-y-1/2 items-center justify-center rounded-full bg-black px-3 text-xs font-medium text-white transition hover:opacity-90"
                  >
                    Buscar
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_SEARCHES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => goToSearch(item)}
                      className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-black transition hover:bg-neutral-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                  Navegación
                </p>

                <nav className="space-y-2">
                  <Link
                    href="/productos"
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-4 text-base font-medium text-black transition hover:bg-neutral-50"
                  >
                    <span>Productos</span>
                    <ChevronRight className="h-4 w-4 text-neutral-400" />
                  </Link>

                  <Link
                    href="/nosotros"
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-4 text-base font-medium text-black transition hover:bg-neutral-50"
                  >
                    <span>Nosotros</span>
                    <ChevronRight className="h-4 w-4 text-neutral-400" />
                  </Link>

                  <Link
                    href="/contacto"
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-4 text-base font-medium text-black transition hover:bg-neutral-50"
                  >
                    <span>Contacto</span>
                    <ChevronRight className="h-4 w-4 text-neutral-400" />
                  </Link>
                </nav>
              </div>

              <div className="mt-6 rounded-[28px] border border-emerald-200 bg-emerald-50/70 p-4">
                <p className="text-sm font-semibold text-black">
                  Compra moderna y confiable
                </p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  Explora marcas como Canon, Fujifilm, Instax y DJI con una
                  experiencia clara, rápida y pensada para mobile.
                </p>
              </div>

              <div className="mt-4 rounded-[28px] border border-black/10 bg-neutral-50 p-4">
                <p className="text-sm font-semibold text-black">
                  ¿Qué quieres encontrar hoy?
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => goToSearch("Cámaras")}
                    className="rounded-2xl bg-white px-3 py-3 text-left text-sm font-medium text-black transition hover:bg-neutral-100"
                  >
                    Cámaras
                  </button>

                  <button
                    type="button"
                    onClick={() => goToSearch("Drones")}
                    className="rounded-2xl bg-white px-3 py-3 text-left text-sm font-medium text-black transition hover:bg-neutral-100"
                  >
                    Drones
                  </button>

                  <button
                    type="button"
                    onClick={() => goToSearch("Instax")}
                    className="rounded-2xl bg-white px-3 py-3 text-left text-sm font-medium text-black transition hover:bg-neutral-100"
                  >
                    Instax
                  </button>

                  <button
                    type="button"
                    onClick={() => goToSearch("Lentes")}
                    className="rounded-2xl bg-white px-3 py-3 text-left text-sm font-medium text-black transition hover:bg-neutral-100"
                  >
                    Lentes
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 p-5">
              <Link
                href="/productos"
                onClick={() => setOpenMenu(false)}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition hover:opacity-90"
              >
                Ver Productos
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}