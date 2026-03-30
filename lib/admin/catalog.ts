import { createClient } from "@/lib/supabase/server";

export async function getProductCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("category")
    .not("category", "is", null);

  if (error) {
    console.error("Error obteniendo categorías:", error);
    return [];
  }

  const unique = Array.from(
    new Set(
      (data ?? [])
        .map((item) => item.category?.trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a!.localeCompare(b!));

  return unique as string[];
}

export async function getProductBrands() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("brand")
    .not("brand", "is", null);

  if (error) {
    console.error("Error obteniendo marcas:", error);
    return [];
  }

  const unique = Array.from(
    new Set(
      (data ?? [])
        .map((item) => item.brand?.trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a!.localeCompare(b!));

  return unique as string[];
}