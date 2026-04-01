"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import type { CatalogProduct } from "@/lib/products";

type Props = {
  products: CatalogProduct[];
};

export default function FeaturedProductsClient({ products }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h2 className="text-3xl font-semibold tracking-tight text-black">
          Productos destacados
        </h2>
        <p className="mt-2 text-neutral-500">
          Equipos seleccionados para fotografía y contenido profesional.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article key={product.id} className="group relative">
            {product.badge && (
              <span className="absolute left-0 top-0 z-10 rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white">
                {product.badge}
              </span>
            )}

            <Link href={product.slug ? `/producto/${product.slug}` : "#"}>
              <div className="flex h-[220px] items-center justify-center">
                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  width={260}
                  height={260}
                  className="max-h-full w-auto object-contain transition duration-500 group-hover:scale-110"
                />
              </div>
            </Link>

            <div className="mt-6">
              <Link href={product.slug ? `/producto/${product.slug}` : "#"}>
                <h3 className="text-lg font-medium text-black">
                  {product.name}
                </h3>
              </Link>

              <div className="mt-3">
                <p className="text-xs text-neutral-400">Precio online</p>
                <p className="text-xl font-semibold text-black">
                  S/ {Number(product.price_online).toLocaleString("es-PE")}
                </p>
              </div>

              {product.price_store !== null && (
                <p className="mt-1 text-sm text-neutral-500">
                  Precio tienda:{" "}
                  <span className="font-medium text-neutral-800">
                    S/ {Number(product.price_store).toLocaleString("es-PE")}
                  </span>
                </p>
              )}

              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price_online,
                    image: product.image || "/placeholder.png",
                  })
                }
                className="mt-5 inline-flex h-[44px] w-full items-center justify-center rounded-full border border-black text-sm font-medium text-black transition duration-300 hover:bg-black hover:text-white"
              >
                Agregar al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}