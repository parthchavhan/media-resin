import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Media Resin Studio | Handcrafted Resin Art",
  description:
    "Beautiful, handcrafted resin art pieces and home decor items. Each piece is uniquely made with care and attention to detail.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning suppressContentEditableWarning lang="en">
      <body className={inter.className}>
        <section className="bg-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Navbar />
            <div className="">{children}</div>
            <Footer />
          </CartProvider>
        </ThemeProvider>
        </section>
      </body>
    </html>
  );
}
