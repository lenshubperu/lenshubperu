import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}