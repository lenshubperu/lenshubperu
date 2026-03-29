import "./globals.css";
import Header from "@/components/layout/header";
import { CartProvider } from "@/components/cart-provider";

export const metadata = {
  title: "LensHub Perú",
  description: "Cámaras, drones y equipos profesionales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}