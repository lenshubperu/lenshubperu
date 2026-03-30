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

function cleanStringArray(values: string[] = []) {
  return values.map((v) => v.trim()).filter(Boolean);
}

type ProductDescriptionsInput = string[];
type ProductFeaturesInput = string[];
type ProductBoxContentInput = string[];

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
  short_description?: string;
  badge?: string;
  descriptions?: ProductDescriptionsInput;
  features?: ProductFeaturesInput;
  box_content?: ProductBoxContentInput;
}) {
  const supabase = await createClient();

  const slug = slugify(data.name);
  const sku = normalizeSku(data.sku || "");
  const descriptions = cleanStringArray(data.descriptions || []);
  const features = cleanStringArray(data.features || []);
  const boxContent = cleanStringArray(data.box_content || []);

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
    short_description: data.short_description?.trim() || null,
    sku,
    cover_image: data.cover_image || data.images[0] || null,
    badge: data.badge?.trim() || null,
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

  if (descriptions.length > 0) {
    const rows = descriptions.map((paragraph, index) => ({
      product_id: inserted.id,
      paragraph,
      position: index + 1,
    }));

    const { error: descriptionsError } = await supabase
      .from("product_descriptions")
      .insert(rows);

    if (descriptionsError) {
      console.error("Error creando descripciones:", descriptionsError);
      return {
        success: false,
        error: descriptionsError.message,
      };
    }
  }

  if (features.length > 0) {
    const rows = features.map((feature, index) => ({
      product_id: inserted.id,
      feature,
      position: index + 1,
    }));

    const { error: featuresError } = await supabase
      .from("product_features")
      .insert(rows);

    if (featuresError) {
      console.error("Error creando características:", featuresError);
      return {
        success: false,
        error: featuresError.message,
      };
    }
  }

  if (boxContent.length > 0) {
    const rows = boxContent.map((text, index) => ({
      product_id: inserted.id,
      item: text,
      position: index + 1,
    }));

    const { error: boxContentError } = await supabase
      .from("product_box_content")
      .insert(rows);

    if (boxContentError) {
      console.error("Error creando contenido de caja:", boxContentError);
      return {
        success: false,
        error: boxContentError.message,
      };
    }
  }

  revalidatePath("/admin/productos");
  revalidatePath("/productos");
  revalidatePath("/");
  revalidatePath(`/producto/${inserted.slug}`);

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
  descriptions?: ProductDescriptionsInput;
  features?: ProductFeaturesInput;
  box_content?: ProductBoxContentInput;
}) {
  const supabase = await createClient();

  const slug = slugify(data.name);
  const sku = normalizeSku(data.sku || "");
  const descriptions = cleanStringArray(data.descriptions || []);
  const features = cleanStringArray(data.features || []);
  const boxContent = cleanStringArray(data.box_content || []);

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

  const { data: currentProduct, error: currentProductError } = await supabase
    .from("products")
    .select("slug")
    .eq("id", data.id)
    .single();

  if (currentProductError) {
    console.error("Error obteniendo slug actual del producto:", currentProductError);
    return {
      success: false,
      error: currentProductError.message,
    };
  }

  const oldSlug = currentProduct?.slug;

  const payload = {
    name: data.name,
    slug,
    brand: data.brand || "Sin marca",
    category: data.category || "General",
    price_online: data.price_online,
    price_store: data.price_store,
    stock: data.stock,
    is_active: data.is_active,
    short_description: data.short_description?.trim() || null,
    sku,
    badge: data.badge?.trim() || null,
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

  const [
    deleteImagesResult,
    deleteDescriptionsResult,
    deleteFeaturesResult,
    deleteBoxContentResult,
  ] = await Promise.all([
    supabase.from("product_images").delete().eq("product_id", data.id),
    supabase.from("product_descriptions").delete().eq("product_id", data.id),
    supabase.from("product_features").delete().eq("product_id", data.id),
    supabase.from("product_box_content").delete().eq("product_id", data.id),
  ]);

  if (deleteImagesResult.error) {
    console.error("Error limpiando imágenes:", deleteImagesResult.error);
    return {
      success: false,
      error: deleteImagesResult.error.message,
    };
  }

  if (deleteDescriptionsResult.error) {
    console.error("Error limpiando descripciones:", deleteDescriptionsResult.error);
    return {
      success: false,
      error: deleteDescriptionsResult.error.message,
    };
  }

  if (deleteFeaturesResult.error) {
    console.error("Error limpiando características:", deleteFeaturesResult.error);
    return {
      success: false,
      error: deleteFeaturesResult.error.message,
    };
  }

  if (deleteBoxContentResult.error) {
    console.error("Error limpiando contenido de caja:", deleteBoxContentResult.error);
    return {
      success: false,
      error: deleteBoxContentResult.error.message,
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

  if (descriptions.length > 0) {
    const rows = descriptions.map((paragraph, index) => ({
      product_id: data.id,
      paragraph,
      position: index + 1,
    }));

    const { error: insertDescriptionsError } = await supabase
      .from("product_descriptions")
      .insert(rows);

    if (insertDescriptionsError) {
      console.error("Error guardando descripciones:", insertDescriptionsError);
      return {
        success: false,
        error: insertDescriptionsError.message,
      };
    }
  }

  if (features.length > 0) {
    const rows = features.map((feature, index) => ({
      product_id: data.id,
      feature,
      position: index + 1,
    }));

    const { error: insertFeaturesError } = await supabase
      .from("product_features")
      .insert(rows);

    if (insertFeaturesError) {
      console.error("Error guardando características:", insertFeaturesError);
      return {
        success: false,
        error: insertFeaturesError.message,
      };
    }
  }

  if (boxContent.length > 0) {
    const rows = boxContent.map((text, index) => ({
      product_id: data.id,
      item: text,
      position: index + 1,
    }));

    const { error: insertBoxContentError } = await supabase
      .from("product_box_content")
      .insert(rows);

    if (insertBoxContentError) {
      console.error("Error guardando contenido de caja:", insertBoxContentError);
      return {
        success: false,
        error: insertBoxContentError.message,
      };
    }
  }

  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${data.id}`);
  revalidatePath("/productos");
  revalidatePath("/");
  if (oldSlug) revalidatePath(`/producto/${oldSlug}`);
  revalidatePath(`/producto/${slug}`);

  return {
    success: true,
  };
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();

  const { data: currentProduct } = await supabase
    .from("products")
    .select("slug")
    .eq("id", productId)
    .single();

  const oldSlug = currentProduct?.slug;

  const [
    deleteImagesResult,
    deleteDescriptionsResult,
    deleteFeaturesResult,
    deleteBoxContentResult,
  ] = await Promise.all([
    supabase.from("product_images").delete().eq("product_id", productId),
    supabase.from("product_descriptions").delete().eq("product_id", productId),
    supabase.from("product_features").delete().eq("product_id", productId),
    supabase.from("product_box_content").delete().eq("product_id", productId),
  ]);

  if (deleteImagesResult.error) {
    console.error("Error eliminando imágenes del producto:", deleteImagesResult.error);
    return {
      success: false,
      error: deleteImagesResult.error.message,
    };
  }

  if (deleteDescriptionsResult.error) {
    console.error("Error eliminando descripciones del producto:", deleteDescriptionsResult.error);
    return {
      success: false,
      error: deleteDescriptionsResult.error.message,
    };
  }

  if (deleteFeaturesResult.error) {
    console.error("Error eliminando características del producto:", deleteFeaturesResult.error);
    return {
      success: false,
      error: deleteFeaturesResult.error.message,
    };
  }

  if (deleteBoxContentResult.error) {
    console.error("Error eliminando contenido de caja del producto:", deleteBoxContentResult.error);
    return {
      success: false,
      error: deleteBoxContentResult.error.message,
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
  revalidatePath("/productos");
  revalidatePath("/");
  if (oldSlug) revalidatePath(`/producto/${oldSlug}`);

  return {
    success: true,
  };
}