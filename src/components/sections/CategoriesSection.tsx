import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryCard from '../ui/CategoryCard';
import { useGadgets } from '../../context/GadgetContext';

const CategoriesSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { categories, isLoading } = useGadgets();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="categories-section py-12 md:py-16 bg-white overflow-hidden border-b border-zinc-50">
      <div className="container relative">
        
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-dark tracking-tight">Browse by Category</h2>
            <p className="text-zinc-500 mt-2">Explore curated categories and discover products that meet your exact needs.</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')} 
              className="w-9 h-9 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:text-dark transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="w-9 h-9 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:text-dark transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal One-Line Container */}
        {isLoading ? (
          <div className="py-8 flex justify-center items-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <p className="text-zinc-500 font-bold tracking-widest text-sm uppercase">Loading Categories...</p>
            </div>
          </div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((cat) => (
              <div key={cat.id} className="snap-start shrink-0">
                 <CategoryCard category={cat} />
              </div>
            ))}
            {/* Duplicate to ensure enough width for scroll if list is short */}
            {categories.length > 0 && categories.length < 6 && categories.map((cat) => (
              <div key={`${cat.id}-dup`} className="snap-start shrink-0">
                 <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        )}

      </div>
      
      {/* CSS to hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;
