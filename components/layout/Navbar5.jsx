"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const { itemCount } = useCart();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  // Scroll direction awareness for navbar visibility
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
      <header className={cn(
        "bg-white dark:bg-gray-900 shadow-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section with logo centered and mobile actions on right */}
          <div className="flex items-center justify-between py-1">
            {/* Left spacer for desktop, empty for mobile */}
            <div className="hidden lg:block w-24"></div>
            
            {/* Centered Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <Image 
                src="/logo.png"
                alt="Media Resin Studio"
                width={100}
                height={100}
                className="w-auto h-20 lg:h-22 transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Right Side Actions - Mobile Only */}
            <div className="flex items-center space-x-3 lg:hidden">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label={`View cart with ${itemCount} items`}
              >
                <ShoppingBag size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium min-w-5 h-5 flex items-center justify-center rounded-full px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Right Side Actions - Desktop Only (hidden when not scrolled) */}
            <div className="hidden lg:flex items-center space-x-3 opacity-0">
              <button className="p-2 rounded-lg">
                <Sun size={20} />
              </button>
              <button className="p-2 rounded-lg">
                <ShoppingBag size={22} />
              </button>
            </div>
          </div>

          {/* Desktop Navigation - Below Logo (hidden when scrolled) */}
          <div className="hidden lg:block border-t border-gray-100 dark:border-gray-800">
            <nav className="flex items-center justify-center space-x-8 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
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
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
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
                  "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 overflow-hidden transition-all duration-200",
                  isShopDropdownOpen 
                    ? "opacity-100 scale-100 visible" 
                    : "opacity-0 scale-95 invisible"
                )}>
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                      Categories
                    </div>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Theme Toggle and Cart */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link
                href="/cart"
                className="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label={`View cart with ${itemCount} items`}
              >
                <ShoppingBag size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium min-w-5 h-5 flex items-center justify-center rounded-full px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </nav>
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
        "fixed top-0 right-0 h-full w-80 max-w-sm bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 lg:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <Image 
              src="/logo.png"
              alt="Media Resin Studio"
              width={80}
              height={80}
              className="w-auto h-14"
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-4 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Shop Categories */}
            <div className="mt-8 px-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-4">
                Shop Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="block py-3 px-4 text-gray-700 dark:text-gray-300 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                    onClick={closeMobileMenu}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/cart"
              className="flex items-center justify-center w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
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