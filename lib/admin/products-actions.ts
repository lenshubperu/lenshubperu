"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeSku(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function isValidSku(value: string) {
  return /^[A-Z0-9_-]+$/.test(value);
}

export async function createProduct(data: {
  name: string;
  brand: string;
  category: string;
  price_online: number;
  price_store: number;
  stock: number;
  is_active: boolean;
  cover_image: string;
  images: string[];
  sku: string;
}) {
  const supabase = await createClient();

  const slug = slugify(data.name);
  const sku = normalizeSku(data.sku || "");

  if (!sku) {
    return {
      success: false,
      error: "El SKU es obligatorio",
    };
  }

  if (!isValidSku(sku)) {
    return {
      success: false,
      error: "El SKU solo puede contener letras, números, guiones y guion bajo",
    };
  }

  const { data: existingSku, error: existingSkuError } = await supabase
    .from("products")
    .select("id")
    .eq("sku", sku)
    .maybeSingle();

  if (existingSkuError) {
    console.error("Error validando SKU:", existingSkuError);
    return {
      success: false,
      error: existingSkuError.message,
    };
  }

  if (existingSku) {
    return {
      success: false,
      error: "Ya existe un producto con ese SKU",
    };
  }

  const payload = {
    name: data.name,
    slug,
    brand: data.brand || "Sin marca",
    category: data.category || "General",
    price_online: data.price_online,
    price_store: data.price_store,
    stock: data.stock,
    is_active: data.is_active,
    is_featured: false,
    short_description: null,
    sku,
    cover_image: data.cover_image || data.images[0] || null,
    badge: null,
  };

  const { data: inserted, error } = await supabase
    .from("products")
    .insert(payload)
    .select("id, name, slug, cover_image, sku")
    .single();

  if (error || !inserted) {
    console.error("Error creando producto:", error);
    return {
      success: false,
      error: error?.message || "No se pudo crear el producto",
    };
  }

  if (data.images.length > 0) {
    const rows = data.images.map((imageUrl, index) => ({
      product_id: inserted.id,
      image_url: imageUrl,
      position: index + 1,
    }));

    const { error: imagesError } = await supabase
      .from("product_images")
      .insert(rows);

    if (imagesError) {
      console.error("Error creando imágenes:", imagesError);
      return {
        success: false,
        error: imagesError.message,
      };
    }
  }

  revalidatePath("/admin/productos");

  return {
    success: true,
    product: inserted,
  };
}

export async function updateProduct(data: {
  id: string;
  name: string;
  brand: string;
  category: string;
  price_online: number;
  price_store: number;
  stock: number;
  is_active: boolean;
  short_description: string;
  sku: string;
  badge: string;
  cover_image: string;
  images: string[];
}) {
  const supabase = await createClient();

  const slug = slugify(data.name);
  const sku = normalizeSku(data.sku || "");

  if (!sku) {
    return {
      success: false,
      error: "El SKU es obligatorio",
    };
  }

  if (!isValidSku(sku)) {
    return {
      success: false,
      error: "El SKU solo puede contener letras, números, guiones y guion bajo",
    };
  }

  const { data: existingSku, error: existingSkuError } = await supabase
    .from("products")
    .select("id")
    .eq("sku", sku)
    .neq("id", data.id)
    .maybeSingle();

  if (existingSkuError) {
    console.error("Error validando SKU:", existingSkuError);
    return {
      success: false,
      error: existingSkuError.message,
    };
  }

  if (existingSku) {
    return {
      success: false,
      error: "Ya existe otro producto con ese SKU",
    };
  }

  const payload = {
    name: data.name,
    slug,
    brand: data.brand || "Sin marca",
    category: data.category || "General",
    price_online: data.price_online,
    price_store: data.price_store,
    stock: data.stock,
    is_active: data.is_active,
    short_description: data.short_description || null,
    sku,
    badge: data.badge || null,
    cover_image: data.cover_image || data.images[0] || null,
  };

  const { error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", data.id);

  if (error) {
    console.error("Error actualizando producto:", error);
    return {
      success: false,
      error: error.message,
    };
  }

  const { error: deleteImagesError } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", data.id);

  if (deleteImagesError) {
    console.error("Error limpiando imágenes:", deleteImagesError);
    return {
      success: false,
      error: deleteImagesError.message,
    };
  }

  if (data.images.length > 0) {
    const rows = data.images.map((imageUrl, index) => ({
      product_id: data.id,
      image_url: imageUrl,
      position: index + 1,
    }));

    const { error: insertImagesError } = await supabase
      .from("product_images")
      .insert(rows);

    if (insertImagesError) {
      console.error("Error guardando imágenes:", insertImagesError);
      return {
        success: false,
        error: insertImagesError.message,
      };
    }
  }

  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${data.id}`);

  return {
    success: true,
  };
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();

  const { error: deleteImagesError } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", productId);

  if (deleteImagesError) {
    console.error("Error eliminando imágenes del producto:", deleteImagesError);
    return {
      success: false,
      error: deleteImagesError.message,
    };
  }

  const { error: deleteProductError } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (deleteProductError) {
    console.error("Error eliminando producto:", deleteProductError);
    return {
      success: false,
      error: deleteProductError.message,
    };
  }

  revalidatePath("/admin/productos");

  return {
    success: true,
  };
}