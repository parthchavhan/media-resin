import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg"
          alt="Resin art background"
          fill
          className="object-cover object-center brightness-[0.7]"
          priority
        />
      </div>
      
      <div className="container relative z-10 mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl md:text-6xl">
          Artisanal Handcrafted Resin Creations
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90">
          Discover unique, one-of-a-kind resin art pieces and keepsakes that bring beauty and meaning to your home and special moments.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="#products">
            <Button className="bg-accent text-white hover:bg-accent/90">
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="border-white bg-transparent text-white hover:bg-white/20">
              Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}