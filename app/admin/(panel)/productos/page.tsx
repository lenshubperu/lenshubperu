import Image from "next/image";
import Link from "next/link";
import { getProductsAdmin } from "@/lib/admin/products";

export default async function AdminProductosPage() {
  const products = await getProductsAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-500">Productos</p>
          <h1 className="text-2xl font-semibold text-neutral-950">
            Gestión de productos
          </h1>
        </div>

        <Link
          href="/admin/productos/nuevo"
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-left">
              <tr>
                <th className="px-4 py-3">Imagen</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {products.map((p: any) => (
                <tr key={p.id} className="border-b border-neutral-100">
                  <td className="px-4 py-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                      {p.cover_image ? (
  <img
    src={p.cover_image}
    alt={p.name}
    className="h-full w-full object-cover"
  />
) : null}
                    </div>
                  </td>

                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">S/ {p.price_online}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">
                    {p.is_active ? "Activo" : "Inactivo"}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/productos/${p.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <p className="p-6 text-center text-neutral-500">
              No hay productos aún
            </p>
          )}
        </div>
      </div>
    </div>
  );
}