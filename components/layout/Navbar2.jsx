"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100",
          isScrolled 
            ? "" 
            : ""
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <Image 
                src="/logo.png"
                alt="Media Resin Studio"
                width={80}
                height={80}
                className="w-auto h-10 lg:h-12 transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 hover:text-blue-600 text-gray-900",
                    isScrolled ? "" : ""
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Shop Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <button 
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-blue-600 text-gray-900",
                    isScrolled ? "" : ""
                  )}
                >
                  Shop
                  <ChevronDown 
                    size={16} 
                    className={cn(
                      "transition-transform duration-200",
                      isShopDropdownOpen && "rotate-180"
                    )} 
                  />
                </button>
                
                {/* Dropdown Menu */}
                <div className={cn(
                  "absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-200 origin-top-left",
                  isShopDropdownOpen 
                    ? "opacity-100 scale-100 visible" 
                    : "opacity-0 scale-95 invisible"
                )}>
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link
                href="/cart"
                className={cn(
                  "relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-100",
                  isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:bg-white/10"
                )}
                aria-label={`View cart with ${itemCount} items`}
              >
                <ShoppingBag size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-medium min-w-5 h-5 flex items-center justify-center rounded-full px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors duration-200",
                  isScrolled 
                    ? "text-gray-700 hover:bg-gray-100" 
                    : "text-white hover:bg-white/10"
                )}
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Image 
              src="/logo.png"
              alt="Media Resin Studio"
              width={60}
              height={60}
              className="w-auto h-8"
            />
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-gray-900 font-medium hover:text-blue-600 transition-colors"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Shop Categories */}
            <div className="mt-6 px-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Shop Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/cart"
              className="flex items-center justify-center w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={closeMobileMenu}
            >
              <ShoppingBag size={20} className="mr-2" />
              View Cart ({itemCount})
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}