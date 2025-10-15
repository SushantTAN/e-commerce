
import { Star } from 'lucide-react';

interface StarRatingProps {
  activeStars: number;
  totalStars?: number;
  size?: number;
  className?: string;
}

export default function StarRating({ activeStars, totalStars = 5, size = 20, className }: StarRatingProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          className={`w-${size/4} h-${size/4} ${i < activeStars ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
        />
      ))}
    </div>
  );
}
