"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/lib/admin/products-actions";
import type { AdminProduct } from "@/lib/admin/products";

type Props = {
  product: AdminProduct;
};

export default function EditProductForm({ product }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: product.name || "",
    brand: product.brand || "",
    category: product.category || "",
    price_online: String(product.price_online ?? 0),
    price_store: String(product.price_store ?? product.price_online ?? 0),
    stock: String(product.stock ?? 0),
    is_active: product.is_active ?? true,
    short_description: product.short_description || "",
    sku: product.sku || "",
    badge: product.badge || "",
    cover_image: product.cover_image || "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await updateProduct({
        id: product.id,
        name: form.name,
        brand: form.brand,
        category: form.category,
        price_online: Number(form.price_online),
        price_store: Number(form.price_store),
        stock: Number(form.stock),
        is_active: form.is_active,
        short_description: form.short_description,
        sku: form.sku,
        badge: form.badge,
        cover_image: form.cover_image,
      });

      if (!res.success) {
        alert(`Error actualizando producto: ${res.error ?? "desconocido"}`);
        return;
      }

      router.refresh();
      alert("Producto actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error inesperado al actualizar el producto.");
    } finally {
      setLoading(false);
    }
  }

  const previewSrc = form.cover_image?.trim() || null;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Nombre</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Marca</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Categoría</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">SKU</label>
              <input
                type="text"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Precio online</label>
              <input
                type="number"
                required
                value={form.price_online}
                onChange={(e) => setForm({ ...form, price_online: e.target.value })}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Precio tienda</label>
              <input
                type="number"
                required
                value={form.price_store}
                onChange={(e) => setForm({ ...form, price_store: e.target.value })}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Stock</label>
              <input
                type="number"
                required
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Badge</label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
                placeholder="Nuevo"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Descripción corta</label>
            <textarea
              value={form.short_description}
              onChange={(e) =>
                setForm({ ...form, short_description: e.target.value })
              }
              rows={4}
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Imagen principal (cover_image)</label>
            <input
              type="text"
              value={form.cover_image}
              onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
              placeholder="/products/fujifilm-xs20.png o https://..."
            />
            <p className="mt-2 text-xs text-neutral-500">
              Puedes usar una ruta local o una URL completa.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_active"
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            />
            <label htmlFor="is_active" className="text-sm">
              Producto activo
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black py-2 text-white hover:bg-neutral-800 disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-medium text-neutral-800">Vista previa</p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="relative aspect-square w-full">
              {previewSrc ? (
  <img
    src={previewSrc}
    alt={form.name || "Preview"}
    className="h-full w-full object-cover"
  />
) : (
                <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                  Sin imagen
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <p className="font-medium text-neutral-900">{form.name || "Nombre del producto"}</p>
            <p className="text-sm text-neutral-500">{form.brand || "Marca"}</p>
            <p className="text-sm font-semibold text-neutral-900">
              S/ {form.price_online || "0"}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}