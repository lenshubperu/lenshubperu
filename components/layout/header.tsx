"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import CartDrawer from "@/components/cart/cart-drawer";

export default function Header() {
  const { count } = useCart();
  const router = useRouter();

  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");

  const goToSearch = () => {
    const value = mobileSearch.trim();

    if (!value) {
      router.push("/productos");
      setOpenMenu(false);
      return;
    }

    router.push(`/productos?search=${encodeURIComponent(value)}`);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (!openMenu) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openMenu]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur-md">
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
              className="text-sm font-medium text-black transition hover:opacity-70"
            >
              Productos
            </Link>

            <Link
              href="/nosotros"
              className="text-sm font-medium text-black transition hover:opacity-70"
            >
              Nosotros
            </Link>

            <Link
              href="/contacto"
              className="text-sm font-medium text-black transition hover:opacity-70"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpenCart(true)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:bg-neutral-50"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:bg-neutral-50 md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />

      {openMenu && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Cerrar menú"
            onClick={() => setOpenMenu(false)}
          />

          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Menú
              </span>

              <button
                type="button"
                onClick={() => setOpenMenu(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto px-5 py-5">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Buscar
                </p>

                <div className="flex gap-2">
                  <div className="relative flex-1">
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
                      placeholder="Buscar productos..."
                      className="h-12 w-full rounded-full border border-black/10 bg-white pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-black/20"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={goToSearch}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Ir
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Navegación
                </p>

                <nav className="space-y-2">
                  <Link
                    href="/productos"
                    onClick={() => setOpenMenu(false)}
                    className="block rounded-2xl border border-black/10 px-4 py-4 text-base font-medium text-black transition hover:bg-neutral-50"
                  >
                    Productos
                  </Link>

                  <Link
                    href="/nosotros"
                    onClick={() => setOpenMenu(false)}
                    className="block rounded-2xl border border-black/10 px-4 py-4 text-base font-medium text-black transition hover:bg-neutral-50"
                  >
                    Nosotros
                  </Link>

                  <Link
                    href="/contacto"
                    onClick={() => setOpenMenu(false)}
                    className="block rounded-2xl border border-black/10 px-4 py-4 text-base font-medium text-black transition hover:bg-neutral-50"
                  >
                    Contacto
                  </Link>
                </nav>
              </div>

              <div className="rounded-3xl border border-black/10 bg-neutral-50 p-4">
                <p className="text-sm font-medium text-black">
                  Encuentra cámaras, drones, lentes y más.
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  Busca rápido por marca, categoría o producto.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}