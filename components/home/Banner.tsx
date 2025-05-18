"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg",
    title: "Discover Unique Resin Art",
    subtitle: "Handcrafted pieces that bring the beauty of nature into your home",
    cta: "Shop Collection",
    link: "/categories/c1"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/5232649/pexels-photo-5232649.jpeg",
    title: "Functional Art for Your Home",
    subtitle: "Beautiful, practical pieces designed to elevate your space",
    cta: "Explore Decor",
    link: "/categories/c2"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/3246665/pexels-photo-3246665.jpeg",
    title: "Art That Inspires",
    subtitle: "Limited edition prints that make a statement",
    cta: "View Prints",
    link: "/categories/c3"
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              <h1 
                className={cn(
                  "text-3xl md:text-5xl font-bold mb-4 transform transition-all duration-700 delay-100",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
              >
                {slide.title}
              </h1>
              <p 
                className={cn(
                  "text-lg md:text-xl mb-8 max-w-xl transform transition-all duration-700 delay-200",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
              >
                {slide.subtitle}
              </p>
              <Link
                href={slide.link}
                className={cn(
                  "bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 transform delay-300",
                  currentSlide === index ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              currentSlide === index 
                ? "w-8 bg-white" 
                : "w-2 bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}