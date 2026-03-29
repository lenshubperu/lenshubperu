import { supabase } from "@/utils/supabase/client";

export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price_online: number;
  price_store: number;
  image: string;
  badge?: string | null;
};

export type CatalogFilters = {
  search?: string;
  category?: string;
  brand?: string;
  sort?: string;
};

export async function getCatalogProducts(
  filters: CatalogFilters = {}
): Promise<CatalogProduct[]> {
  let query = supabase
    .from("products")
    .select(
      "id, name, slug, category, brand, price_online, price_store, cover_image, badge, created_at"
    )
    .eq("is_active", true);

  if (filters.category && filters.category !== "Todos") {
    query = query.eq("category", filters.category);
  }

  if (filters.brand && filters.brand !== "Todas") {
    query = query.eq("brand", filters.brand);
  }

  if (filters.search && filters.search.trim()) {
    query = query.or(
      `name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,category.ilike.%${filters.search}%`
    );
  }

  switch (filters.sort) {
    case "price-asc":
      query = query.order("price_online", { ascending: true });
      break;
    case "price-desc":
      query = query.order("price_online", { ascending: false });
      break;
    case "name-asc":
      query = query.order("name", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase products error:", error);
    return [];
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category,
    brand: item.brand,
    price_online: Number(item.price_online),
    price_store: Number(item.price_store),
    image: item.cover_image,
    badge: item.badge,
  }));
}

export async function getCatalogCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("is_active", true);

  if (error) {
    console.error("Supabase categories error:", error);
    return [];
  }

  return [...new Set((data ?? []).map((item) => item.category))].sort();
}

export async function getCatalogBrands(): Promise<string[]> {
  const { data, error } = await supabase
    .from("products")
    .select("brand")
    .eq("is_active", true);

  if (error) {
    console.error("Supabase brands error:", error);
    return [];
  }

  return [...new Set((data ?? []).map((item) => item.brand))].sort();
}

export async function getRelatedProducts(
  category: string,
  currentSlug: string
): Promise<CatalogProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, category, brand, price_online, price_store, cover_image, badge"
    )
    .eq("is_active", true)
    .eq("category", category)
    .neq("slug", currentSlug)
    .limit(4);

  if (error) {
    console.error("Supabase related products error:", error);
    return [];
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category,
    brand: item.brand,
    price_online: Number(item.price_online),
    price_store: Number(item.price_store),
    image: item.cover_image,
    badge: item.badge,
  }));
}