import Header from "@/components/layout/header";
import { CartProvider } from "@/components/cart-provider";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}