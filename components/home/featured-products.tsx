import { getRandomFeaturedProducts } from "@/lib/products"; // o tu ruta real
import FeaturedProductsClient from "./featured-products-client";

export default async function FeaturedProducts() {
  const products = await getRandomFeaturedProducts(4);

  if (!products.length) return null;

  return <FeaturedProductsClient products={products} />;
}