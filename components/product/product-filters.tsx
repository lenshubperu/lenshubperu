"use client";

type ProductFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  categories: string[];
};

export default function ProductFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
}: ProductFiltersProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar producto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-[54px] w-full rounded-full border border-black/10 bg-white px-5 text-sm text-black outline-none transition focus:border-black/20"
          />
        </div>

        <div className="flex justify-start lg:justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-[54px] rounded-full border border-black/10 bg-white px-5 text-sm text-black outline-none transition focus:border-black/20"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name-asc">Nombre: A-Z</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory("Todos")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedCategory === "Todos"
              ? "bg-black text-white"
              : "border border-black/10 bg-white text-black hover:bg-neutral-50"
          }`}
        >
          Todos
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-black text-white"
                : "border border-black/10 bg-white text-black hover:bg-neutral-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}