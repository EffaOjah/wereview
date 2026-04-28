import React from 'react';
import { gadgets, reviews } from '../../data/gadgets';
import ReviewCard from '../ui/ReviewCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LatestGadgets: React.FC = () => {
  return (
    <section className="latest-Gadget spad bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Latest Gadgets Slider */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
              <h4 className="text-2xl font-black text-dark tracking-tight uppercase">Latest Gadgets</h4>
              <div className="flex gap-2">
                 <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-all"><ChevronLeft size={16} /></button>
                 <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-all"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {gadgets.slice(0, 3).map((Gadget) => (
                <div key={Gadget.id} className="border-b border-zinc-50 pb-6 last:border-0 last:pb-0">
                  <div className="flex gap-6 items-center">
                    <div className="w-24 h-24 flex-shrink-0 bg-light p-2 rounded-sm border border-zinc-100">
                      <img src={Gadget.image} alt={Gadget.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <h6 className="font-bold text-dark hover:text-primary transition-colors cursor-pointer text-sm mb-1 line-clamp-2">{Gadget.name}</h6>
                      <p className="text-xs text-muted mb-2 line-clamp-1">{Gadget.description}</p>
                      <div className="flex items-center gap-4">
                         <span className="text-primary font-bold text-base">${Gadget.price}</span>
                         {Gadget.originalPrice && <span className="text-muted line-through text-xs">${Gadget.originalPrice}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Gadgets Section */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
              <h4 className="text-2xl font-black text-dark tracking-tight uppercase">Review Gadgets</h4>
              <div className="flex gap-2">
                 <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-all"><ChevronLeft size={16} /></button>
                 <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-all"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {reviews.slice(0, 2).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestGadgets;
