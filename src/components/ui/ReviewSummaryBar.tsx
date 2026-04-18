import React from 'react';
import StarRating from './StarRating';

interface ReviewSummaryBarProps {
  ratingDistribution: { star: number; percentage: number }[];
  averageRating: number;
  totalReviews: number;
}

const ReviewSummaryBar: React.FC<ReviewSummaryBarProps> = ({ 
  ratingDistribution, 
  averageRating, 
  totalReviews 
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
      {/* Big Average Section */}
      <div className="flex flex-col items-center justify-center min-w-[200px]">
        <span className="text-6xl font-black text-dark">{averageRating.toFixed(1)}</span>
        <div className="my-2">
          <StarRating rating={averageRating} size={20} />
        </div>
        <p className="text-sm font-bold text-muted mb-0">{totalReviews} Reviews</p>
      </div>

      {/* Distribution Bars */}
      <div className="flex-grow w-full flex flex-col gap-2">
        {ratingDistribution.sort((a, b) => b.star - a.star).map(({ star, percentage }) => (
          <div key={star} className="flex items-center gap-3">
            <span className="w-12 text-sm font-bold text-dark whitespace-nowrap">{star} Star</span>
            <div className="h-2 flex-grow bg-zinc-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-10 text-sm font-bold text-muted text-right">{percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummaryBar;
