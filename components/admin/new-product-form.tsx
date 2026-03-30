"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/admin/products-actions";
import ProductGalleryUploader from "@/components/admin/product-gallery-uploader";

type Props = {
  categories: string[];
  brands: string[];
};

function normalizeList(values: string[]) {
  return values.map((v) => v.trim()).filter(Boolean);
}

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
    is_active: true,
    images: [] as string[],
    short_description: "",
    sku: "",
    badge: "",
  });

  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [boxContent, setBoxContent] = useState<string[]>([""]);

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
      alert("SKU inválido. Solo letras, números, guiones y guion bajo.");
      setLoading(false);
      return;
    }

    try {
      const res = await createProduct({
        name: form.name.trim(),
        brand: form.brand.trim(),
        category: form.category.trim(),
        price_online: Number(form.price_online),
        price_store: Number(form.price_store || form.price_online),
        stock: Number(form.stock),
        is_active: form.is_active,
        cover_image: form.images[0] || "",
        images: form.images,
        sku,
        short_description: form.short_description.trim(),
        badge: form.badge.trim(),
        descriptions: normalizeList(descriptions),
        features: normalizeList(features),
        box_content: normalizeList(boxContent),
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
      className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
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
          <label className="text-sm font-medium">SKU</label>
          <input
            type="text"
            required
            value={form.sku}
            onChange={(e) =>
              setForm({
                ...form,
                sku: e.target.value.toUpperCase().replace(/\s+/g, ""),
              })
            }
            className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2"
            placeholder="Ej: INSTAX-MINI-12-PINK"
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
        <label className="text-sm font-medium">Descripción</label>
        <div className="mt-3 space-y-3">
          {descriptions.map((desc, index) => (
            <div key={index} className="space-y-2">
              <textarea
                value={desc}
                onChange={(e) => {
                  const copy = [...descriptions];
                  copy[index] = e.target.value;
                  setDescriptions(copy);
                }}
                rows={4}
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                placeholder={`Párrafo ${index + 1}`}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const copy = descriptions.filter((_, i) => i !== index);
                    setDescriptions(copy.length ? copy : [""]);
                  }}
                  className="rounded-xl border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Eliminar párrafo
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setDescriptions([...descriptions, ""])}
            className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
          >
            + Agregar párrafo
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Características completas</label>
        <div className="mt-3 space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const copy = [...features];
                  copy[index] = e.target.value;
                  setFeatures(copy);
                }}
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                placeholder={`Característica ${index + 1}`}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const copy = features.filter((_, i) => i !== index);
                    setFeatures(copy.length ? copy : [""]);
                  }}
                  className="rounded-xl border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Eliminar característica
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setFeatures([...features, ""])}
            className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
          >
            + Agregar característica
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Contenido de la caja</label>
        <div className="mt-3 space-y-3">
          {boxContent.map((item, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const copy = [...boxContent];
                  copy[index] = e.target.value;
                  setBoxContent(copy);
                }}
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                placeholder={`Contenido ${index + 1}`}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const copy = boxContent.filter((_, i) => i !== index);
                    setBoxContent(copy.length ? copy : [""]);
                  }}
                  className="rounded-xl border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Eliminar item
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setBoxContent([...boxContent, ""])}
            className="rounded-xl border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
          >
            + Agregar item
          </button>
        </div>
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