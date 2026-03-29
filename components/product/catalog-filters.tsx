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
  "Drones",
  "Instax",
  "Instantáneas",
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
      router.replace(url);
    });
  };

  const submitSearch = (value: string) => {
    updateParams({ search: value.trim() });
    setOpenSuggestions(false);
  };

  const suggestionPool = useMemo(() => {
    return Array.from(new Set([...SEARCH_HINTS, ...categories, ...brands]));
  }, [categories, brands]);

  const suggestions = useMemo(() => {
    const normalizedSearch = normalizeText(searchValue);

    if (normalizedSearch.length < 2) return [];

    return suggestionPool
      .filter((item) => normalizeText(item).includes(normalizedSearch))
      .slice(0, 6);
  }, [searchValue, suggestionPool]);

  useEffect(() => {
    const normalizedCurrent = normalizeText(currentSearch);
    const normalizedInput = normalizeText(searchValue);

    if (normalizedInput === normalizedCurrent) return;

    const timeout = setTimeout(() => {
      updateParams({ search: searchValue.trim() });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue, currentSearch, searchParams]);

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
    <div className="space-y-3 sm:space-y-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.25fr_0.85fr_0.85fr_0.85fr]">
        <div className="relative z-20" ref={wrapperRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cámaras, drones, marcas..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value.trim().length >= 2) {
                  setOpenSuggestions(true);
                } else {
                  setOpenSuggestions(false);
                }
              }}
              onFocus={() => {
                if (searchValue.trim().length >= 2 && suggestions.length > 0) {
                  setOpenSuggestions(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitSearch(searchValue);
                }

                if (e.key === "Escape") {
                  setOpenSuggestions(false);
                }
              }}
              className="h-[46px] w-full rounded-full border border-black/10 bg-white px-4 pr-20 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:border-black/20 sm:h-[50px] sm:px-5"
            />

            {searchValue && (
              <button
                type="button"
                onClick={() => {
                  setSearchValue("");
                  setOpenSuggestions(false);
                  submitSearch("");
                }}
                className="absolute right-11 top-1/2 -translate-y-1/2 text-xs text-neutral-400 transition hover:text-black"
                aria-label="Limpiar búsqueda"
              >
                Limpiar
              </button>
            )}

            <button
              type="button"
              onClick={() => submitSearch(searchValue)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-medium text-black transition hover:bg-neutral-50"
            >
              Ir
            </button>
          </div>

          {openSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] max-h-56 overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-[0_16px_50px_rgba(0,0,0,0.10)]">
              <div className="border-b border-black/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                Sugerencias
              </div>

              <div className="py-1.5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setSearchValue(suggestion);
                      submitSearch(suggestion);
                    }}
                    className="flex w-full items-center px-4 py-2.5 text-left text-sm text-black transition hover:bg-neutral-50"
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
          className="h-[46px] rounded-full border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-black/20 sm:h-[50px] sm:px-5"
        >
          <option value="Todos">Categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={currentBrand}
          onChange={(e) => updateParams({ brand: e.target.value })}
          className="h-[46px] rounded-full border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-black/20 sm:h-[50px] sm:px-5"
        >
          <option value="Todas">Marcas</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        <select
          value={currentSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="h-[46px] rounded-full border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-black/20 sm:h-[50px] sm:px-5"
        >
          <option value="recent">Recientes</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
          <option value="name-asc">Nombre A-Z</option>
        </select>
      </div>

      {isPending && (
        <p className="text-xs text-neutral-400 sm:text-sm">
          Actualizando productos...
        </p>
      )}
    </div>
  );
}