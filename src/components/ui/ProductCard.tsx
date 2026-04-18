import React from 'react';
import type { Product } from '../../types';
import StarRating from './StarRating';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const timeLeft = product.dealEndTime ? useCountdown(product.dealEndTime) : null;

  return (
    <div className="featured__item group flex flex-col h-full bg-white border border-transparent hover:border-zinc-100 p-3 transition-all">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50 rounded-sm mb-4">
        {/* Badges and Stars */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-10">
          <StarRating rating={product.rating} size={12} />
          {product.badges.map((badge, idx) => (
            <span key={idx} className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
              {badge}
            </span>
          ))}
        </div>

        {/* Product Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
        />

        {/* Hover Icons */}
        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors">
            <Heart size={16} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors">
            <MessageSquare size={16} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col flex-grow text-center">
        <h6 className="font-bold text-dark mb-2 hover:text-primary transition-colors cursor-pointer line-clamp-2">
          {product.name}
        </h6>
        
        <div className="flex items-center justify-center gap-4 mb-2">
          {product.originalPrice && (
            <span className="text-muted line-through font-bold">${product.originalPrice}</span>
          )}
          <span className="text-dark font-extrabold text-lg">Now ${product.price}</span>
        </div>

        {timeLeft && (
          <div className="text-red-500 text-xs font-bold uppercase tracking-tighter mt-auto">
            Deal ends in: {String(timeLeft.h).padStart(2, '0')}h : {String(timeLeft.m).padStart(2, '0')}m : {String(timeLeft.s).padStart(2, '0')}s
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
