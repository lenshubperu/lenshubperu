import { getProductBrands, getProductCategories } from "@/lib/admin/catalog";
import NewProductForm from "@/components/admin/new-product-form";

export default async function NuevoProductoPage() {
  const categories = await getProductCategories();
  const brands = await getProductBrands();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-neutral-500">Productos</p>
        <h1 className="text-2xl font-semibold text-neutral-950">
          Nuevo producto
        </h1>
      </div>

      <NewProductForm categories={categories} brands={brands} />
    </div>
  );
}