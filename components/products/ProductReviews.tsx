"use client";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface ProductReviewsProps {
  reviews?: Review[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  if (!reviews || reviews.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
      <div className="space-y-6">
        {reviews.map((rev, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="font-medium">{rev.user}</span>
              <span className="ml-4 text-yellow-500">
                {"★".repeat(rev.rating) + "☆".repeat(5 - rev.rating)}
              </span>
            </div>
            <p className="text-gray-700">{rev.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 