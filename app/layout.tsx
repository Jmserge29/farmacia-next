import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
// @ts-expect-error: missing type declarations for CSS side-effect import
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FarmaShop - Tu Farmacia en Línea",
  description: "Sistema de gestión de farmacia con seguridad y logs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}