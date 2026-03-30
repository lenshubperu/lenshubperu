import { createClient } from "@/lib/supabase/server";

export type AdminProduct = {
  id: string;
  name: string;
  slug: string | null;
  brand: string | null;
  category: string | null;
  price_online: number;
  price_store: number | null;
  stock: number;
  is_active: boolean;
  is_featured: boolean | null;
  short_description: string | null;
  sku: string | null;
  cover_image: string | null;
  badge: string | null;
};

export async function getProductsAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, price_online, stock, is_active, cover_image")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error productos:", error);
    return [];
  }

  return data;
}

export async function getProductAdminById(id: string): Promise<AdminProduct | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      brand,
      category,
      price_online,
      price_store,
      stock,
      is_active,
      is_featured,
      short_description,
      sku,
      cover_image,
      badge
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error obteniendo producto:", error);
    return null;
  }

  return data as AdminProduct;
}