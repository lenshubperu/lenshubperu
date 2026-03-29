"use client";

import Image from "next/image";

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
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Categorías destacadas</h2>
        <p className="text-gray-500 mt-2">
          Explora nuestras líneas principales.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="group rounded-2xl border border-black/10 overflow-hidden bg-white hover:shadow-xl transition duration-300"
          >
            {/* IMAGEN */}
            <div className="relative w-full h-[180px] overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />

              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>

            {/* TEXTO */}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}