"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Props = {
  categories: string[];
  brands: string[];
};

export default function CatalogFilters({ categories, brands }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") ?? "";
  const currentCategory = searchParams.get("category") ?? "Todos";
  const currentBrand = searchParams.get("brand") ?? "Todas";
  const currentSort = searchParams.get("sort") ?? "recent";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (
      value === "" ||
      value === "Todos" ||
      value === "Todas" ||
      value === "recent"
    ) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    startTransition(() => {
      router.push(`/productos?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
        <input
          type="text"
          placeholder="Buscar por nombre, marca o categoría"
          defaultValue={currentSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateParam("search", e.currentTarget.value);
            }
          }}
          className="h-[52px] rounded-full border border-black/10 px-5 text-sm outline-none transition focus:border-black/20"
        />

        <select
          value={currentCategory}
          onChange={(e) => updateParam("category", e.target.value)}
          className="h-[52px] rounded-full border border-black/10 px-5 text-sm outline-none transition focus:border-black/20"
        >
          <option value="Todos">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={currentBrand}
          onChange={(e) => updateParam("brand", e.target.value)}
          className="h-[52px] rounded-full border border-black/10 px-5 text-sm outline-none transition focus:border-black/20"
        >
          <option value="Todas">Todas las marcas</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          value={currentSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="h-[52px] rounded-full border border-black/10 px-5 text-sm outline-none transition focus:border-black/20"
        >
          <option value="recent">Más recientes</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name-asc">Nombre: A-Z</option>
        </select>
      </div>

      {isPending && (
        <p className="text-sm text-neutral-400">Actualizando productos...</p>
      )}
    </div>
  );
}