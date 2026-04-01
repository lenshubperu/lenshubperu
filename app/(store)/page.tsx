import CategoriesSection from "@/components/home/categories-section";
import FeaturedProducts from "@/components/home/featured-products";
import Hero from "@/components/home/hero";
import PromoBanners from "@/components/home/promo-banners";
import Footer from "@/components/layout/footer";

// 🔥 IMPORTANTE: evita cache (clave para random)
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <main className="bg-white">
        <Hero />
        <CategoriesSection />
        <PromoBanners />
        <FeaturedProducts />
      </main>
      <Footer />
    </>
  );
}