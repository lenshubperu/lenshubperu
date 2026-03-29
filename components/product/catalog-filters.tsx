"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";

type Props = {
  categories: string[];
  brands: string[];
};

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SEARCH_HINTS = [
  "Cámaras",
  "Camaras",
  "Dron",
  "Drones",
  "Instax",
  "Instantáneas",
  "Instantaneas",
  "Lentes",
  "Accesorios",
  "Canon",
  "Sony",
  "Fujifilm",
  "DJI",
  "GoPro",
];

export default function CatalogFilters({ categories, brands }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") ?? "";
  const currentCategory = searchParams.get("category") ?? "Todos";
  const currentBrand = searchParams.get("brand") ?? "Todas";
  const currentSort = searchParams.get("sort") ?? "recent";

  const [searchValue, setSearchValue] = useState(currentSearch);
  const [openSuggestions, setOpenSuggestions] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
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
    }

    const queryString = params.toString();
    const url = queryString ? `/productos?${queryString}` : "/productos";

    startTransition(() => {
      router.push(url);
    });
  };

  const submitSearch = (value: string) => {
    updateParams({ search: value.trim() });
    setOpenSuggestions(false);
  };

  const suggestionPool = useMemo(() => {
    const unique = new Set<string>([
      ...SEARCH_HINTS,
      ...categories,
      ...brands,
    ]);

    return Array.from(unique);
  }, [categories, brands]);

  const suggestions = useMemo(() => {
    const normalizedSearch = normalizeText(searchValue);

    if (!normalizedSearch) {
      return suggestionPool.slice(0, 8);
    }

    return suggestionPool
      .filter((item) => normalizeText(item).includes(normalizedSearch))
      .slice(0, 8);
  }, [searchValue, suggestionPool]);

  useEffect(() => {
    const normalizedCurrent = normalizeText(currentSearch);
    const normalizedInput = normalizeText(searchValue);

    if (normalizedInput === normalizedCurrent) return;

    const timeout = setTimeout(() => {
      updateParams({ search: searchValue.trim() });
    }, 450);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpenSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
        <div className="relative" ref={wrapperRef}>
          <input
            type="text"
            placeholder="Buscar cámaras, drones, lentes, marcas..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setOpenSuggestions(true);
            }}
            onFocus={() => setOpenSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitSearch(searchValue);
              }

              if (e.key === "Escape") {
                setOpenSuggestions(false);
              }
            }}
            className="h-[52px] w-full rounded-full border border-black/10 bg-white px-5 pr-12 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black/20"
          />

          {searchValue && (
            <button
              type="button"
              onClick={() => {
                setSearchValue("");
                submitSearch("");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400 transition hover:text-black"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}

          {openSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 top-[calc(100%+10px)] z-30 w-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
              <div className="border-b border-black/5 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                Sugerencias
              </div>

              <div className="py-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setSearchValue(suggestion);
                      submitSearch(suggestion);
                    }}
                    className="flex w-full items-center px-4 py-3 text-left text-sm text-black transition hover:bg-neutral-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <select
          value={currentCategory}
          onChange={(e) => updateParams({ category: e.target.value })}
          className="h-[52px] rounded-full border border-black/10 bg-white px-5 text-sm outline-none transition focus:border-black/20"
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
          onChange={(e) => updateParams({ brand: e.target.value })}
          className="h-[52px] rounded-full border border-black/10 bg-white px-5 text-sm outline-none transition focus:border-black/20"
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
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="h-[52px] rounded-full border border-black/10 bg-white px-5 text-sm outline-none transition focus:border-black/20"
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