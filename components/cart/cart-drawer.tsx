"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, updateQty, removeItem, clear, subtotal } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-[0_10px_40px_rgba(0,0,0,0.18)] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
              Tu carrito
            </p>
            <h2 className="mt-1 text-xl font-semibold text-black">
              {items.length} producto{items.length !== 1 ? "s" : ""}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-neutral-50"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <ShoppingBag className="h-7 w-7 text-neutral-400" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-black">
              Tu carrito está vacío
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-7 text-neutral-500">
              Agrega productos para continuar con tu compra.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:opacity-90"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-6">
                {items.map((item) => (
                  <article
                    key={`${item.id}-${item.color ?? ""}-${item.size ?? ""}`}
                    className="grid grid-cols-[88px_1fr] gap-4"
                  >
                    <div className="relative flex h-[88px] items-center justify-center rounded-2xl bg-neutral-50 p-3">
                      {item.mainImage ? (
                        <Image
                          src={item.mainImage}
                          alt={item.name}
                          width={72}
                          height={72}
                          className="max-h-[72px] w-auto object-contain"
                        />
                      ) : (
                        <div className="h-[72px] w-[72px] rounded-xl bg-neutral-100" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="line-clamp-2 text-sm font-medium leading-6 text-black">
                            {item.name}
                          </h3>

                          {(item.color || item.size) && (
                            <p className="mt-1 text-xs text-neutral-400">
                              {item.color ? `Color: ${item.color}` : ""}
                              {item.color && item.size ? " · " : ""}
                              {item.size ? `Tamaño: ${item.size}` : ""}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.id, item.color ?? null, item.size ?? null)
                          }
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 transition hover:bg-neutral-50"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-4 w-4 text-neutral-500" />
                        </button>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-black">
                        S/ {((item.price ?? 0) * item.qty).toLocaleString("es-PE")}
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        S/ {(item.price ?? 0).toLocaleString("es-PE")} c/u
                      </p>

                      <div className="mt-4 inline-flex items-center rounded-full border border-black/10">
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(
                              item.id,
                              Math.max(1, item.qty - 1),
                              item.color ?? null,
                              item.size ?? null
                            )
                          }
                          className="inline-flex h-10 w-10 items-center justify-center transition hover:bg-neutral-50"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="inline-flex min-w-[36px] items-center justify-center text-sm font-medium text-black">
                          {item.qty}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQty(
                              item.id,
                              item.qty + 1,
                              item.color ?? null,
                              item.size ?? null
                            )
                          }
                          className="inline-flex h-10 w-10 items-center justify-center transition hover:bg-neutral-50"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-black/10 px-5 py-5">
              <div className="flex items-center justify-between text-sm text-neutral-500">
                <span>Subtotal</span>
                <span className="text-lg font-semibold text-black">
                  S/ {subtotal.toLocaleString("es-PE")}
                </span>
              </div>

              <p className="mt-2 text-xs leading-6 text-neutral-400">
                El precio final puede variar según envío, método de entrega o promociones aplicadas.
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-black/10 text-sm font-medium text-black transition hover:bg-neutral-50"
                >
                  Vaciar
                </button>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-black text-sm font-medium text-white transition hover:opacity-90"
                >
                  Ir a pagar
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}