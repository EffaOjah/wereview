import React, { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import { getApiUrl } from '../../utils/api';

interface HelpfulButtonProps {
  initialCount: number;
  reviewId: string;
}

const HelpfulButton: React.FC<HelpfulButtonProps> = ({ initialCount, reviewId }) => {
  const [count, setCount] = useState(initialCount);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    const votedReviews = JSON.parse(localStorage.getItem('gadgethub_voted_reviews') || '[]');
    if (votedReviews.includes(reviewId)) {
      setIsHelpful(true);
    }
  }, [reviewId]);

  const handleHelpfulClick = async () => {
    if (isHelpful || isLoading) return; // Prevent multiple votes

    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl(`/api/reviews/${reviewId}/helpful`), {
        method: 'PUT'
      });
      const data = await res.json();
      
      if (data.success) {
        setCount(prev => prev + 1);
        setIsHelpful(true);
        
        // Save to local storage
        const votedReviews = JSON.parse(localStorage.getItem('gadgethub_voted_reviews') || '[]');
        if (!votedReviews.includes(reviewId)) {
          votedReviews.push(reviewId);
          localStorage.setItem('gadgethub_voted_reviews', JSON.stringify(votedReviews));
        }
      }
    } catch (err) {
      console.error('Failed to mark as helpful:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleHelpfulClick}
      disabled={isHelpful || isLoading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
        isHelpful 
          ? 'bg-primary/20 text-primary-dark border border-primary/30 shadow-sm cursor-default' 
          : 'bg-white text-muted border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300'
      } ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
    >
      <ThumbsUp size={16} className={isHelpful ? "fill-primary text-primary" : ""} />
      Helpful ({count})
    </button>
  );
};

export default HelpfulButton;
