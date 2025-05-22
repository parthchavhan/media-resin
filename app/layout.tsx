import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar5';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Media Resin Studio | Handcrafted Resin Art',
  description: 'Beautiful, handcrafted resin art pieces and home decor items. Each piece is uniquely made with care and attention to detail.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <CartProvider>
          <Navbar />
          <div className="">
            {children}
          </div>
          <Footer />
        </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}