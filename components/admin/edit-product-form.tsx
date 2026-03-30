"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct, deleteProduct } from "@/lib/admin/products-actions";
import type { AdminProduct } from "@/lib/admin/products";
import ProductGalleryUploader from "@/components/admin/product-gallery-uploader";

type Props = {
  product: AdminProduct;
};

export default function EditProductForm({ product }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    images: (product.product_images || []).map((img) => img.image_url),
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const sku = form.sku.trim();
    const skuRegex = /^[A-Za-z0-9_-]+$/;

    if (!sku) {
      alert("El SKU es obligatorio");
      setLoading(false);
      return;
    }

    if (!skuRegex.test(sku)) {
      alert("SKU inválido");
      setLoading(false);
      return;
    }

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
        sku: sku,
        badge: form.badge,
        cover_image: form.images[0] || "",
        images: form.images,
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

  async function handleDelete() {
    const ok = confirm(
      "¿Seguro que quieres eliminar esta publicación? También se eliminarán sus imágenes registradas."
    );
    if (!ok || deleting) return;

    setDeleting(true);

    try {
      const res = await deleteProduct(product.id);

      if (!res.success) {
        alert(`Error eliminando producto: ${res.error ?? "desconocido"}`);
        return;
      }

      router.replace("/admin/productos");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error inesperado al eliminar.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
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
            onChange={(e) =>
              setForm({
                ...form,
                sku: e.target.value.toUpperCase().replace(/\s+/g, ""),
              })
            }
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
        <label className="text-sm font-medium">Galería de imágenes</label>
        <div className="mt-3">
          <ProductGalleryUploader
            images={form.images}
            onChange={(images) => setForm({ ...form, images })}
          />
        </div>
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

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-black py-2 text-white hover:bg-neutral-800 disabled:opacity-60"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-xl border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-60"
        >
          {deleting ? "Eliminando..." : "Eliminar publicación"}
        </button>
      </div>
    </form>
  );
}