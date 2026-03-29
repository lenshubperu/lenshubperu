"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-provider";
import ProductGallery from "@/components/product/product-gallery";

export type ProductColor = {
  name: string;
  value: string;
};

export type ProductDetailData = {
  id: string;
  slug: string;
  category: string;
  brand: string;
  name: string;
  shortDescription: string;
  price_online: number;
  price_store: number;
  stock: number;
  sku: string;
  images: string[];
  colors?: ProductColor[];
  features: string[];
  boxContent: string[];
  description: string[];
};

export default function ProductDetail({
  product,
}: {
  product: ProductDetailData;
}) {
  const { addItem } = useCart();

  const hasColors = Boolean(product.colors && product.colors.length > 0);
  const [selectedColor, setSelectedColor] = useState(
    hasColors ? product.colors![0].name : ""
  );

  const selectedColorObj = useMemo(() => {
    if (!hasColors) return null;
    return product.colors!.find((color) => color.name === selectedColor) ?? null;
  }, [hasColors, product.colors, selectedColor]);

  const isAvailable = product.stock > 0;

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery images={product.images} alt={product.name} />

          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
              {product.brand}
            </p>

            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-base leading-8 text-neutral-600 sm:text-lg">
              {product.shortDescription}
            </p>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">
                Precio online
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight">
                S/ {product.price_online.toLocaleString("es-PE")}
              </p>

              <p className="mt-2 text-base text-neutral-500">
                Precio tienda:{" "}
                <span className="font-medium text-neutral-800">
                  S/ {product.price_store.toLocaleString("es-PE")}
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500">
              <span>
                Stock:{" "}
                <span className={isAvailable ? "text-black" : "text-red-600"}>
                  {isAvailable ? `${product.stock} disponible(s)` : "Agotado"}
                </span>
              </span>

              <span>
                SKU: <span className="text-neutral-800">{product.sku}</span>
              </span>
            </div>

            {hasColors && (
              <div className="mt-10">
                <p className="text-sm font-medium text-black">Colores</p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {product.colors!.map((color) => {
                    const isSelected = selectedColor === color.name;

                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-black/10 hover:border-black/20"
                        }`}
                      >
                        <span
                          className="inline-block h-4 w-4 rounded-full border border-black/10"
                          style={{ backgroundColor: color.value }}
                        />
                        {color.name}
                      </button>
                    );
                  })}
                </div>

                {selectedColorObj && (
                  <p className="mt-3 text-sm text-neutral-500">
                    Color seleccionado:{" "}
                    <span className="font-medium text-neutral-800">
                      {selectedColorObj.name}
                    </span>
                  </p>
                )}
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={!isAvailable}
                onClick={() =>
                  addItem({
  id: product.id,
  slug: product.slug,
  name: product.name,
  price: product.price_online,
  mainImage: product.images[0] ?? null,
  color: hasColors ? selectedColor : null,
  size: null,
})
                }
                className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-black px-8 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAvailable ? "Agregar al carrito" : "Producto agotado"}
              </button>

              <a
                href={`https://wa.me/51928297040?text=${encodeURIComponent(
                  `Hola, vengo de la web y quiero comprar: ${product.name}${
                    selectedColor ? ` - Color: ${selectedColor}` : ""
                  }`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-black/10 px-8 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-50"
              >
                Comprar por WhatsApp
              </a>
            </div>

            <div className="mt-10 space-y-3 text-sm leading-7 text-neutral-600">
              <p>Compra online con precio especial y atención rápida.</p>
              <p>Producto original con respaldo y garantía.</p>
              <p>Atención online y presencial en Lima, Perú.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                Descripción
              </p>

              <div className="mt-5 space-y-5 text-[15px] leading-8 text-neutral-600 sm:text-base">
                {product.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="space-y-14">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                  Características completas
                </p>

                <ul className="mt-5 space-y-3 text-sm leading-7 text-neutral-700">
                  {product.features.map((feature) => (
                    <li key={feature} className="border-b border-black/5 pb-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                  Contenido de la caja
                </p>

                <ul className="mt-5 space-y-3 text-sm leading-7 text-neutral-700">
                  {product.boxContent.map((item) => (
                    <li key={item} className="border-b border-black/5 pb-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}