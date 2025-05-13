'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';

// Mock review data
const initialReviews = [
  {
    id: 1,
    name: 'Aanya Sharma',
    rating: 5,
    comment: 'Absolutely beautiful! The Varmala Preservation Frame perfectly captured the essence of our wedding day. The quality is exceptional and the customer service was top-notch.',
    date: '2025-01-15',
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    rating: 4,
    comment: 'The resin clock is stunning and makes a beautiful statement piece in my living room. Shipping was a bit slow but the product quality made up for it.',
    date: '2025-01-08',
  },
];

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (newReview.trim() === '' || rating === 0) {
      toast({
        title: 'Error',
        description: 'Please provide both a rating and a review comment.',
        variant: 'destructive',
      });
      return;
    }

    const review = {
      id: Date.now(),
      name: 'You',
      rating,
      comment: newReview,
      date: new Date().toISOString().split('T')[0],
    };

    setReviews([review, ...reviews]);
    setNewReview('');
    setRating(0);
    
    toast({
      title: 'Review submitted',
      description: 'Thank you for sharing your feedback!',
    });
  };

  return (
    <div className="my-12">
      <h2 className="mb-6 text-2xl font-semibold">Customer Reviews</h2>
      
      <div className="mb-8 rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-lg font-medium">Write a Review</h3>
        
        <div className="mb-4 flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="cursor-pointer"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              {star <= (hoveredRating || rating) ? (
                <StarFilledIcon className="h-6 w-6 text-accent" />
              ) : (
                <StarIcon className="h-6 w-6 text-accent/40" />
              )}
            </span>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {rating > 0 ? `You rated this ${rating} out of 5` : 'Select a rating'}
          </span>
        </div>
        
        <Textarea
          placeholder="Share your experience with this product..."
          className="mb-4 min-h-[100px]"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        
        <Button 
          className="bg-accent hover:bg-accent/90"
          onClick={handleSubmitReview}
        >
          Submit Review
        </Button>
      </div>
      
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="rounded-lg border bg-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-accent/20 text-accent">
                      {review.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < review.rating ? (
                        <StarFilledIcon className="h-4 w-4 text-accent" />
                      ) : (
                        <StarIcon className="h-4 w-4 text-accent/40" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            No reviews yet. Be the first to share your experience!
          </div>
        )}
      </div>
    </div>
  );
}