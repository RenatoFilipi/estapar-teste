import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], fallback: ["system-ui", "arial"] });

export const metadata: Metadata = {
  title: "Estapar teste",
  description: "Renato Filipi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
