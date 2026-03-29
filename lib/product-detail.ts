import { supabase } from "@/utils/supabase/client";
import type { ProductDetailData } from "@/components/product/product-detail";

export async function getProductBySlug(
  slug: string
): Promise<ProductDetailData | null> {
  const { data: product, error } = await supabase
    .from("products")
    .select(
      "id, slug, category, brand, name, short_description, price_online, price_store, stock, sku, cover_image"
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !product) {
    console.error("Supabase product detail error:", error);
    return null;
  }

  const productId = product.id;

  const [
    { data: images },
    { data: colors },
    { data: features },
    { data: boxContent },
    { data: descriptions },
  ] = await Promise.all([
    supabase
      .from("product_images")
      .select("image_url, position")
      .eq("product_id", productId)
      .order("position", { ascending: true }),

    supabase
      .from("product_colors")
      .select("name, value")
      .eq("product_id", productId),

    supabase
      .from("product_features")
      .select("feature, position")
      .eq("product_id", productId)
      .order("position", { ascending: true }),

    supabase
      .from("product_box_content")
      .select("item, position")
      .eq("product_id", productId)
      .order("position", { ascending: true }),

    supabase
      .from("product_descriptions")
      .select("paragraph, position")
      .eq("product_id", productId)
      .order("position", { ascending: true }),
  ]);

  return {
    id: product.id,
    slug: product.slug,
    category: product.category,
    brand: product.brand,
    name: product.name,
    shortDescription: product.short_description ?? "",
    price_online: Number(product.price_online),
    price_store: Number(product.price_store),
    stock: product.stock ?? 0,
    sku: product.sku ?? "",
    images:
      images && images.length > 0
        ? images.map((img) => img.image_url)
        : product.cover_image
          ? [product.cover_image]
          : [],
    colors: colors?.map((color) => ({
      name: color.name,
      value: color.value,
    })),
    features: features?.map((item) => item.feature) ?? [],
    boxContent: boxContent?.map((item) => item.item) ?? [],
    description: descriptions?.map((item) => item.paragraph) ?? [],
  };
}