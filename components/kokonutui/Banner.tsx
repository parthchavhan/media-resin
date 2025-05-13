"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const images = [
  "/banner1.jpg",
  "/banner2.jpg",
  "/banner3.jpg"
]

export default function Banner() {
  const [idx, setIdx] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIdx((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [idx])

  const goTo = (i: number) => {
    setIdx(i)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const prev = () => goTo((idx - 1 + images.length) % images.length)
  const next = () => goTo((idx + 1) % images.length)

  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-[3/1] rounded-xl overflow-hidden mb-8">
      <Image
        src={images[idx]}
        alt={`Banner ${idx + 1}`}
        fill
        className="object-cover object-center transition-all duration-700"
        priority
      />
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/50 p-2 rounded-full hover:bg-white/90 dark:hover:bg-black/70 z-10"
        aria-label="Previous slide"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-black/50 p-2 rounded-full hover:bg-white/90 dark:hover:bg-black/70 z-10"
        aria-label="Next slide"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full ${i === idx ? "bg-zinc-900 dark:bg-white" : "bg-zinc-300 dark:bg-zinc-700"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 