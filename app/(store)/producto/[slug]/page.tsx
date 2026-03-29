import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/product-detail";
import RelatedProducts from "@/components/product/related-products";
import { getCatalogProducts, getRelatedProducts } from "@/lib/products";
import { getProductBySlug } from "@/lib/product-detail";

export async function generateStaticParams() {
  const products = await getCatalogProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.slug);

  return (
    <>
      <ProductDetail product={product} />
      <RelatedProducts products={relatedProducts} />
    </>
  );
}