import ProductCard, { CatalogProduct } from "@/components/product/product-card";

export default function RelatedProducts({
  products,
}: {
  products: CatalogProduct[];
}) {
  if (!products.length) return null;

  return (
    <section className="border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 sm:text-xs">
            También te puede interesar
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-[28px]">
            Productos relacionados
          </h2>
        </div>

        <div className="grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="scale-[0.96] sm:scale-100">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}