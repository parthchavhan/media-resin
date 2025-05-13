'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="gallery-wrapper">
      <div className="gallery-main">
        <Image
          src="https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
          alt="Product image"
          width={600}
          height={600}
          priority
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="gallery-thumbnails">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              "gallery-thumbnail",
              activeImage === index && "active"
            )}
            onClick={() => setActiveImage(index)}
          >
            <Image
              src="https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg"
              alt={`Thumbnail ${index + 1}`}
              width={150}
              height={150}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}