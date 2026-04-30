import React from 'react';
import { Link } from 'react-router-dom';
import type { Review } from '../../types';
import { gadgets } from '../../data/gadgets';
import StarRating from './StarRating';
import { MessageSquare, Calendar, ChevronRight } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const Gadget = gadgets.find(p => p.id === review.GadgetId);
  const title = review.title || (Gadget ? `Review for ${Gadget.name}` : 'Customer Review');
  const image = review.image || (Gadget?.image) || '/img/latest-Gadget/lp-1.png';

  return (
    <div className="flex flex-col md:flex-row bg-[#f9f8f8] p-6 rounded-sm border border-transparent hover:border-zinc-200 transition-all gap-6 group">
      {/* Gadget Image */}
      <div className="w-full md:w-32 flex-shrink-0 flex items-center justify-center bg-white p-2 border border-zinc-100 shadow-sm mix-blend-multiply">
        <img 
          src={image} 
          alt={title} 
          className="max-w-full max-h-32 object-contain" 
        />
      </div>

      {/* Review Content */}
      <div className="flex-grow flex flex-col">
        {/* Title */}
        <div className="flex justify-between items-start gap-4 mb-2">
           <h5 className="font-black text-dark text-lg group-hover:text-primary transition-colors line-clamp-1">{title}</h5>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-start gap-6 text-xs text-muted font-bold uppercase tracking-wider mb-4 mt-1">
          <span className="flex items-center gap-1.5"><MessageSquare size={14} className="text-primary" /> {review.helpfulCount || 0} Helpful</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {review.date}</span>
        </div>

        {/* Text */}
        <p className="text-muted leading-relaxed mb-4 text-sm  font-medium">
          "{review.comment}"
        </p>

        {/* Footer Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <StarRating rating={review.rating} />
            <Link to={`/user/${review.authorId}`} className="text-xs font-bold text-dark mt-1 hover:text-primary transition-colors cursor-pointer">
              - By {review.author} 
            </Link> 
            {review.isVerifiedPurchase && <span className="text-emerald-500 text-[10px] font-bold">(Verified Buyer)</span>}
          </div>
          {Gadget && (
            <Link to={`/gadgets/${Gadget.id}`} className="primary-btn text-xs px-6 py-2 flex items-center justify-center gap-1 whitespace-nowrap">
               Read Full Review <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
