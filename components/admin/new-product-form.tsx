"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/admin/products-actions";
import ProductImageUploader from "@/components/admin/product-image-uploader";

type Props = {
  categories: string[];
  brands: string[];
};

export default function NewProductForm({ categories, brands }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: brands[0] ?? "",
    category: categories[0] ?? "",
    price_online: "",
    price_store: "",
    stock: "",
    cover_image: "",
    is_active: true,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await createProduct({
        name: form.name,
        brand: form.brand,
        category: form.category,
        price_online: Number(form.price_online),
        price_store: Number(form.price_store || form.price_online),
        stock: Number(form.stock),
        cover_image: form.cover_image,
        is_active: form.is_active,
      });

      if (!res.success) {
        alert(`Error creando producto: ${res.error ?? "desconocido"}`);
        return;
      }

      router.replace("/admin/productos");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error inesperado al crear el producto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
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
          <select
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
          >
            <option value="">Selecciona marca</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
            <option value="Sin marca">Sin marca</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Categoría</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
          >
            <option value="">Selecciona categoría</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Precio online</label>
          <input
            type="number"
            required
            value={form.price_online}
            onChange={(e) =>
              setForm({ ...form, price_online: e.target.value })
            }
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Precio tienda</label>
          <input
            type="number"
            value={form.price_store}
            onChange={(e) =>
              setForm({ ...form, price_store: e.target.value })
            }
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
      </div>

      <div>
        <label className="text-sm font-medium">Imagen principal</label>

        <div className="mt-3">
          <ProductImageUploader
            value={form.cover_image}
            onChange={(url) => setForm({ ...form, cover_image: url })}
          />
        </div>

        <input
          type="text"
          value={form.cover_image}
          onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
          className="mt-3 w-full rounded-xl border border-neutral-300 px-3 py-2"
          placeholder="URL final de la imagen"
        />
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
        {loading ? "Creando..." : "Crear producto"}
      </button>
    </form>
  );
}