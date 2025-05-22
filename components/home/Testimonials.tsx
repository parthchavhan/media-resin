"use client";

import { StarIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Ananya Mehra",
    role: "Interior Designer",
    avatar: "https://images.pexels.com/photos/2817273/pexels-photo-2817273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "The resin art pieces from Media Resin Studio have brought a unique charm to my clients' homes. The craftsmanship is truly top-notch, and the vibrant colors add so much character to Indian interiors.",
    rating: 5
  },
  {
    id: 2,
    name: "Rohan Kapoor",
    role: "Art Collector",
    avatar: "https://images.pexels.com/photos/11091438/pexels-photo-11091438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Each piece I've bought is a work of art that draws attention in my living room. The quality and detailing are exceptional—something I haven't found easily in the Indian market.",
    rating: 4
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Home Decor Enthusiast",
    avatar: "https://images.pexels.com/photos/27454185/pexels-photo-27454185/free-photo-of-beautiful-girl-face-with-messy-hair.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "I got a custom river table made, and it turned out to be even better than I imagined. The team kept me updated throughout, and the final product has become the highlight of my home.",
    rating: 5
  }
];

export default function Testimonials() {
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
    <section className={`py-16 max-w-7xl mx-auto mt-5 ${
      isDark ? "bg-gray-800" : "bg-gray-50"
    }`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          What Our Customers Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`rounded-lg p-6 flex flex-col h-full transition-shadow duration-300 ${
                isDark
                  ? "bg-gray-900 shadow-lg shadow-gray-900/50 border border-gray-700 hover:shadow-xl hover:shadow-gray-800/50"
                  : "bg-white shadow-md hover:shadow-lg"
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-2 ring-gray-200 dark:ring-gray-600">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {testimonial.name}
                  </h3>
                  <p className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating 
                      ? "text-yellow-400 fill-yellow-400" 
                      : isDark ? "text-gray-600" : "text-gray-300"
                    } 
                  />
                ))}
              </div>
              
              <p className={`italic flex-grow leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}