import React from 'react';
import type { Gadget } from '../../types';
import { Heart, MessageSquare, Share2, GitCompare } from 'lucide-react';

interface GadgetCardProps {
  gadget: Gadget;
}

const GadgetCard: React.FC<GadgetCardProps> = ({ gadget }) => {
  return (
    <div className="featured__item group flex flex-col h-full bg-white border border-transparent hover:border-zinc-100 p-3 transition-all">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50 rounded-sm mb-4">
        {/* Brand Label */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-zinc-900 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
            {gadget.brand}
          </span>
        </div>

        {/* Gadget Image */}
        <img 
          src={gadget.image} 
          alt={gadget.name} 
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
        <div className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold mb-1">
          {gadget.brand}
        </div>
        <h6 className="font-bold text-dark mb-2 hover:text-primary transition-colors cursor-pointer line-clamp-2 text-sm">
          {gadget.name}
        </h6>
        
        {/* <div className="flex items-center justify-center gap-4 mb-4 mt-auto">
          <span className="text-dark font-extrabold text-lg">${gadget.price.toLocaleString()}</span>
        </div> */}

        <div className="flex flex-col gap-2">
          <button className="w-full py-2.5 bg-zinc-900 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95">
             <GitCompare size={14} /> Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default GadgetCard;
