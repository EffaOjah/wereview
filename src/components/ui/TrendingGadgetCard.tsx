import React from 'react';
import type { Gadget } from '../../types';
import StarRating from './StarRating';
import { GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';
import NairaPrice from './NairaPrice';

interface TrendingGadgetCardProps {
  gadget: Gadget;
  viewMode?: 'grid' | 'list';
}

const TrendingGadgetCard: React.FC<TrendingGadgetCardProps> = ({ gadget, viewMode = 'grid' }) => {
  const isList = viewMode === 'list';
  
  return (
    <div className={`group flex h-full bg-white rounded-xl shadow-sm border border-zinc-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden ${isList ? 'flex-col sm:flex-row' : 'flex-col'}`}>
      {/* Image Section */}
      <div className={`relative bg-zinc-50 overflow-hidden flex items-center justify-center p-6 shrink-0 ${isList ? 'w-full sm:w-1/3 aspect-video sm:aspect-square' : 'aspect-[4/3]'}`}>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {gadget.badges.map((badge, idx) => (
            <span key={idx} className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">
              {badge}
            </span>
          ))}
        </div>
        
        {/* Image */}
        <img 
          src={gadget.image} 
          alt={gadget.name} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out" 
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 gap-3">
        {/* Category & Rating */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">{gadget.category?.name || gadget.category}</span>
          <div className="flex items-center gap-1.5">
            <StarRating rating={gadget.avgRating || gadget.rating || 0} size={14} />
            <span className="text-xs font-bold text-dark">({gadget.reviewCount || gadget.reviews?.length || 0})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-dark leading-tight line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">
          {gadget.name}
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted line-clamp-2 mt-1 min-h-[40px]">
          {gadget.shortSummary || gadget.description}
        </p>

        {/* Footer (Price & CTA) */}
        <div className={`mt-auto pt-4 flex gap-4 ${isList ? 'flex-row items-center justify-between border-t border-zinc-100' : 'flex-col border-t border-zinc-100'}`}>
          <div className="flex flex-col">
            <span className="text-xs text-muted font-bold uppercase tracking-widest mb-1">Market Avg</span>
            <NairaPrice amount={gadget.prices?.average || gadget.nigerianPrices?.average || 0} className="text-xl font-black text-dark leading-none" />
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <button className={`bg-zinc-100 text-dark rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 active:scale-95 duration-200 ${isList ? 'px-6 py-3' : 'flex-1 py-3'}`}>
              <GitCompare size={16} /> Compare
            </button>
            <Link 
              to={`/gadgets/${gadget.id}`}
              className={`bg-dark text-white rounded-lg font-bold text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95 duration-200 ${isList ? 'px-6 py-3 shrink-0' : 'flex-1 py-3'}`}
            >
              See Gadget
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingGadgetCard;
