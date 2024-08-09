import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "By Matrizz",
  description: "powered by Etec - Itanhaém",
  icons: {icon: './favicon.ico'}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

      <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${lexend.className}`}>{children}</body>
    </html>
  );
}
