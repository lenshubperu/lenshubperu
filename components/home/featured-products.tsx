"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";

type Product = {
  id: string;
  name: string;
  price_online: number;
  price_store: number;
  image: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "Fujifilm X-S20",
    price_online: 5299,
    price_store: 5150,
    image: "/products/fujifilm-xs20.png",
    badge: "Nuevo",
  },
  {
    id: "2",
    name: "Instax Mini 12",
    price_online: 399,
    price_store: 379,
    image: "/products/instax-mini-12.png",
  },
  {
    id: "3",
    name: "DJI Mini 4 Pro",
    price_online: 4599,
    price_store: 4450,
    image: "/products/dji-mini-4-pro.png",
    badge: "Top venta",
  },
  {
    id: "4",
    name: "Canon EOS R50",
    price_online: 3199,
    price_store: 3050,
    image: "/products/canon-eos-r50.png",
  },
];

export default function FeaturedProducts() {
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
            
            {/* BADGE */}
            {product.badge && (
              <span className="absolute left-0 top-0 z-10 rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white">
                {product.badge}
              </span>
            )}

            {/* IMAGEN LIBRE */}
            <div className="flex h-[220px] items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={260}
                height={260}
                className="w-auto max-h-full object-contain transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* INFO */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-black">
                {product.name}
              </h3>

              <div className="mt-3">
                <p className="text-xs text-neutral-400">Precio online</p>
                <p className="text-xl font-semibold text-black">
                  S/ {product.price_online.toLocaleString("es-PE")}
                </p>
              </div>

              <p className="mt-1 text-sm text-neutral-500">
                Precio tienda:{" "}
                <span className="font-medium text-neutral-800">
                  S/ {product.price_store.toLocaleString("es-PE")}
                </span>
              </p>

              {/* BOTÓN */}
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price_online,
                    image: product.image,
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