"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import CartDrawer from "@/components/cart/cart-drawer";

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

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
              onClick={() => setOpen(true)}
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:bg-neutral-50 md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}