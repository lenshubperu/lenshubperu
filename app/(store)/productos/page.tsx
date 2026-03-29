import ProductCard from "@/components/product/product-card";
import CatalogFilters from "@/components/product/catalog-filters";
import {
  getCatalogBrands,
  getCatalogCategories,
  getCatalogProducts,
} from "@/lib/products";

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    sort?: string;
  }>;
};

export default async function ProductosPage({ searchParams }: Props) {
  const params = await searchParams;

  const [products, categories, brands] = await Promise.all([
    getCatalogProducts({
      search: params.search,
      category: params.category,
      brand: params.brand,
      sort: params.sort,
    }),
    getCatalogCategories(),
    getCatalogBrands(),
  ]);

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
            Productos
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Catálogo profesional para crear, capturar y elevar tu contenido.
          </h1>

          <p className="mt-6 max-w-[62ch] text-base leading-8 text-neutral-600 sm:text-lg">
            Explora cámaras, drones, instantáneas, lentes y accesorios con
            precios claros y una experiencia de compra moderna.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <CatalogFilters categories={categories} brands={brands} />

        <div className="mt-8 flex items-center justify-between text-sm text-neutral-500">
          <p>
            {products.length} producto{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center text-neutral-500">
            No encontramos productos con esos filtros.
          </div>
        ) : (
          <div className="mt-10 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}