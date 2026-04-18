import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, interactive = false, onRate, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= fullStars;
        const isHalf = !isFilled && starIndex === fullStars + 1 && hasHalfStar;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate && onRate(starIndex)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 active:scale-95 transition-transform' : 'cursor-default'}`}
          >
            {isFilled ? (
              <Star size={size} fill="#f5a623" color="#f5a623" />
            ) : isHalf ? (
              <StarHalf size={size} fill="#f5a623" color="#f5a623" />
            ) : (
              <Star size={size} color="#e5e5e5" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
