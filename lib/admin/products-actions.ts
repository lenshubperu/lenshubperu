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

export async function createProduct(data: {
  name: string;
  brand: string;
  category: string;
  price_online: number;
  price_store: number;
  stock: number;
  is_active: boolean;
  cover_image: string;
}) {
  const supabase = await createClient();

  const slug = slugify(data.name);

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
    sku: null,
    cover_image: data.cover_image || null,
    badge: null,
  };

  const { data: inserted, error } = await supabase
    .from("products")
    .insert(payload)
    .select("id, name, slug")
    .single();

  if (error) {
    console.error("Error creando producto:", error);
    return {
      success: false,
      error: error.message,
    };
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
}) {
  const supabase = await createClient();

  const slug = slugify(data.name);

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
    sku: data.sku || null,
    badge: data.badge || null,
    cover_image: data.cover_image || null,
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

  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${data.id}`);

  return {
    success: true,
  };
}