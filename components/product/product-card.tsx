"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price_online: number;
  price_store: number;
  image: string;
  badge?: string | null;
};

export default function ProductCard({
  product,
}: {
  product: CatalogProduct;
}) {
  const { addItem } = useCart();

  return (
    <article className="group">
      <Link href={`/producto/${product.slug}`} className="block">
        <div className="relative flex h-[180px] items-center justify-center sm:h-[200px]">
          {product.badge && (
            <span className="absolute left-0 top-0 rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white">
              {product.badge}
            </span>
          )}

          <Image
            src={product.image}
            alt={product.name}
            width={220}
            height={220}
            className="max-h-[170px] w-auto object-contain transition duration-500 group-hover:scale-110 sm:max-h-[185px]"
          />
        </div>
      </Link>

      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
          {product.brand}
        </p>

        <Link href={`/producto/${product.slug}`}>
          <h3 className="mt-2 text-[15px] font-medium leading-tight text-black transition hover:opacity-70 sm:text-[16px]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3">
          <p className="text-[11px] text-neutral-400">Precio online</p>
          <p className="mt-1 text-lg font-semibold tracking-tight text-black sm:text-xl">
            S/ {product.price_online.toLocaleString("es-PE")}
          </p>
        </div>

        <p className="mt-1 text-[13px] text-neutral-500">
          Tienda:{" "}
          <span className="font-medium text-neutral-800">
            S/ {product.price_store.toLocaleString("es-PE")}
          </span>
        </p>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/producto/${product.slug}`}
            className="flex-1 rounded-full border border-black/10 py-2 text-center text-xs font-medium text-black transition hover:bg-neutral-50"
          >
            Ver
          </Link>

          <button
            onClick={() =>
              addItem({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price_online,
                mainImage: product.image,
                color: null,
                size: null,
              })
            }
            className="flex-1 rounded-full bg-black py-2 text-xs font-medium text-white transition hover:opacity-90"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}