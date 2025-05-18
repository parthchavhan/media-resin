import { StarIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Interior Designer",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    content: "The resin art pieces from Media Resin Studio have transformed my clients' spaces. The craftsmanship is impeccable, and the colors are even more vibrant in person.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Art Collector",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    content: "Every piece I've purchased has become a conversation starter in my home. The attention to detail and quality of the materials used is outstanding.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Home Decor Enthusiast",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    content: "I ordered a custom river table and was blown away by the result. The communication throughout the process was excellent, and the final piece exceeded my expectations.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700 italic flex-grow">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}