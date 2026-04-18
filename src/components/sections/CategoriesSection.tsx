import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryCard from '../ui/CategoryCard';
import { categories } from '../../data/products';

const CategoriesSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll distance per click
      const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="categories pt-24 pb-8 bg-white">
      <div className="container mx-auto px-4 relative group">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-dark tracking-tight mb-2">Explore Tech Categories</h2>
            <p className="text-muted font-medium text-lg mb-0">Browse thousands of gadget reviews by department.</p>
          </div>
          {/* Desktop Arrow Controls (Optional, keeping them to assist mouse users) */}
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors hover:border-primary shrink-0">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors hover:border-primary shrink-0">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        {/* hide-scrollbar class hides the default browser scrollbar for a cleaner look while maintaining native swiping */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat) => (
            <div key={cat.id} className="min-w-[280px] md:min-w-[320px] shrink-0 snap-start">
               <CategoryCard category={cat} />
            </div>
          ))}
          {/* Re-mapping for mock visual padding so it forms a scrollable track */}
          {categories.map((cat) => (
            <div key={`${cat.id}-duplicate`} className="min-w-[280px] md:min-w-[320px] shrink-0 snap-start">
               <CategoryCard category={cat} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoriesSection;
