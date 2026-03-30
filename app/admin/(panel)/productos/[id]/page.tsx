import { notFound } from "next/navigation";
import { getProductAdminById } from "@/lib/admin/products";
import EditProductForm from "@/components/admin/edit-product-form";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductAdminById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-neutral-500">Productos</p>
        <h1 className="text-2xl font-semibold text-neutral-950">
          Editar producto
        </h1>
      </div>

      <EditProductForm product={product} />
    </div>
  );
}