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
  short_description?: string | null;
};

export type CatalogFilters = {
  search?: string;
  category?: string;
  brand?: string;
  sort?: string;
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price_online: number | string;
  price_store: number | string;
  cover_image: string;
  badge?: string | null;
  short_description?: string | null;
  created_at?: string;
};

const SEARCH_SYNONYMS: Record<string, string[]> = {
  camara: ["camara", "camaras", "cámara", "cámaras", "foto", "fotos"],
  dron: ["dron", "drones", "drone", "drones profesionales"],
  lente: ["lente", "lentes", "lens", "objetivo", "objetivos"],
  instantanea: [
    "instantanea",
    "instantaneas",
    "instantánea",
    "instantáneas",
    "instax",
    "polaroid",
  ],
  accesorio: ["accesorio", "accesorios", "complemento", "complementos"],
};

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function singularize(word: string) {
  if (word.endsWith("es") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("s") && word.length > 3) return word.slice(0, -1);
  return word;
}

function levenshteinDistance(a: string, b: string) {
  const matrix = Array.from({ length: b.length + 1 }, () =>
    Array(a.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i - 1] + 1,
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function expandSearchTerms(query: string) {
  const normalized = normalizeText(query);
  const words = normalized.split(" ").filter(Boolean);

  const expanded = new Set<string>();

  for (const word of words) {
    expanded.add(word);
    expanded.add(singularize(word));

    for (const variants of Object.values(SEARCH_SYNONYMS)) {
      const normalizedVariants = variants.map((item) => normalizeText(item));
      if (
        normalizedVariants.includes(word) ||
        normalizedVariants.includes(singularize(word))
      ) {
        normalizedVariants.forEach((item) => {
          expanded.add(item);
          expanded.add(singularize(item));
        });
      }
    }
  }

  return Array.from(expanded);
}

function getProductSearchText(product: ProductRow) {
  return normalizeText(
    [
      product.name,
      product.brand,
      product.category,
      product.short_description ?? "",
      singularize(product.category ?? ""),
      singularize(product.brand ?? ""),
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function getMatchScore(product: ProductRow, query: string) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) return 1;

  const searchText = getProductSearchText(product);
  const productWords = searchText.split(" ").filter(Boolean);
  const productName = normalizeText(product.name);
  const productCategory = normalizeText(product.category);
  const productBrand = normalizeText(product.brand);

  const terms = expandSearchTerms(query);

  let score = 0;

  if (productName.includes(normalizedQuery)) score += 60;
  if (productCategory.includes(normalizedQuery)) score += 45;
  if (productBrand.includes(normalizedQuery)) score += 35;
  if (searchText.includes(normalizedQuery)) score += 25;

  for (const term of terms) {
    if (!term) continue;

    if (productName.includes(term)) score += 30;
    if (productCategory.includes(term)) score += 24;
    if (productBrand.includes(term)) score += 18;
    if (searchText.includes(term)) score += 12;

    for (const word of productWords) {
      if (word === term) {
        score += 16;
        continue;
      }

      if (Math.abs(word.length - term.length) <= 2) {
        const distance = levenshteinDistance(word, term);

        if (distance === 1) score += 8;
        else if (distance === 2 && term.length >= 6) score += 4;
      }
    }
  }

  return score;
}

function applySmartSearch(products: ProductRow[], search?: string) {
  const normalizedSearch = normalizeText(search ?? "");

  if (!normalizedSearch) return products;

  return products
    .map((product) => ({
      product,
      score: getMatchScore(product, normalizedSearch),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}

function mapCatalogProduct(item: ProductRow): CatalogProduct {
  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    category: item.category,
    brand: item.brand,
    price_online: Number(item.price_online),
    price_store: Number(item.price_store),
    image: item.cover_image,
    badge: item.badge,
    short_description: item.short_description ?? null,
  };
}

export async function getCatalogProducts(
  filters: CatalogFilters = {}
): Promise<CatalogProduct[]> {
  let query = supabase
    .from("products")
    .select(
      "id, name, slug, category, brand, price_online, price_store, cover_image, badge, short_description, created_at"
    )
    .eq("is_active", true);

  if (filters.category && filters.category !== "Todos") {
    query = query.eq("category", filters.category);
  }

  if (filters.brand && filters.brand !== "Todas") {
    query = query.eq("brand", filters.brand);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase products error:", error);
    return [];
  }

  let products = (data ?? []) as ProductRow[];

  products = applySmartSearch(products, filters.search);

  switch (filters.sort) {
    case "price-asc":
      products.sort(
        (a, b) => Number(a.price_online) - Number(b.price_online)
      );
      break;
    case "price-desc":
      products.sort(
        (a, b) => Number(b.price_online) - Number(a.price_online)
      );
      break;
    case "name-asc":
      products.sort((a, b) => a.name.localeCompare(b.name, "es"));
      break;
    default:
      products.sort((a, b) => {
        const first = a.created_at ? new Date(a.created_at).getTime() : 0;
        const second = b.created_at ? new Date(b.created_at).getTime() : 0;
        return second - first;
      });
      break;
  }

  return products.map(mapCatalogProduct);
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

  return [...new Set((data ?? []).map((item) => item.category))].sort((a, b) =>
    a.localeCompare(b, "es")
  );
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

  return [...new Set((data ?? []).map((item) => item.brand))].sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

export async function getRelatedProducts(
  category: string,
  currentSlug: string
): Promise<CatalogProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, slug, category, brand, price_online, price_store, cover_image, badge, short_description"
    )
    .eq("is_active", true)
    .eq("category", category)
    .neq("slug", currentSlug)
    .limit(4);

  if (error) {
    console.error("Supabase related products error:", error);
    return [];
  }

  return ((data ?? []) as ProductRow[]).map(mapCatalogProduct);
}