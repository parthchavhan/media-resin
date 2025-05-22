"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { categories } from "@/lib/data";

export default function FeaturedCategories() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return ( 
    <section className={`py-16 max-w-7xl mx-auto ${
      isDark ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          Shop By Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="group"
            >
              <div className={`relative overflow-hidden rounded-lg h-80 transition-shadow duration-300 ${
                isDark 
                  ? "shadow-lg shadow-gray-800/50 hover:shadow-xl hover:shadow-gray-700/50" 
                  : "shadow-md hover:shadow-lg"
              }`}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Dynamic gradient overlay based on theme */}
                <div className={`absolute inset-0 ${
                  isDark 
                    ? "bg-gradient-to-t from-gray-900/80 via-gray-800/40 to-transparent" 
                    : "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                }`} />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    {category.description}
                  </p>
                  <span className={`inline-block py-2 px-4 backdrop-blur-sm rounded-md text-sm font-medium transition-all duration-300 ${
                    isDark
                      ? "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}>
                    Explore Collection
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}