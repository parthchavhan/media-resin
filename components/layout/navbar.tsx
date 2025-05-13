'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, PaintBucket } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import MobileMenu from './mobile-menu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-serif font-bold">
          <PaintBucket className="h-6 w-6 text-accent" />
          <span className="hidden sm:inline">Media Resin</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-accent ${
              pathname === '/' ? 'text-accent' : 'text-foreground/80'
            }`}
          >
            Home
          </Link>
          {/* <Link
            href="/products"
            className={`text-sm font-medium transition-colors hover:text-accent ${
              pathname === '/products' ? 'text-accent' : 'text-foreground/80'
            }`}
          >
            Products
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-accent ${
              pathname === '/about' ? 'text-accent' : 'text-foreground/80'
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-accent ${
              pathname === '/contact' ? 'text-accent' : 'text-foreground/80'
            }`}
          >
            Contact
          </Link> */}
        </nav>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} />
    </header>
  );
}