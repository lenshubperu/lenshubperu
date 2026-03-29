"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Cámaras",
    description: "Mirrorless, compactas y profesionales",
    image: "/categories/camaras.jpg",
  },
  {
    name: "Instantáneas",
    description: "Instax Mini y accesorios",
    image: "/categories/instax.jpg",
  },
  {
    name: "Drones",
    description: "Captura aérea con DJI",
    image: "/categories/drones.jpg",
  },
  {
    name: "Lentes",
    description: "Nitidez y versatilidad para cada estilo",
    image: "/categories/lentes.jpg",
  },
];

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Categorías destacadas</h2>
        <p className="mt-2 text-gray-500">
          Explora nuestras líneas principales.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/productos?category=${encodeURIComponent(cat.name)}`}
            className="group block overflow-hidden rounded-2xl border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
          >
            {/* IMAGEN */}
            <div className="relative h-[180px] w-full overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>

            {/* TEXTO */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}