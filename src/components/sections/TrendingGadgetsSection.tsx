import React, { useState, useMemo } from 'react';
import { gadgets } from '../../data/gadgets';
import TrendingGadgetCard from '../ui/TrendingGadgetCard';
import { Search, SlidersHorizontal, Flame } from 'lucide-react';

const TrendingGadgetsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('*');
  const [sortBy, setSortBy] = useState('hottest'); // 'hottest', 'rating', 'most-reviewed'
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = [
    { name: 'All Gadgets', value: '*' },
    { name: 'Gadgets', value: 'gadgets' },
    { name: 'Laptops', value: 'laptops' },
    { name: 'Headphones', value: 'headphones' },
    { name: 'Tablets', value: 'tablets' },
    { name: 'Cameras', value: 'cameras' },
  ];

  const filteredAndSortedGadgets = useMemo(() => {
    let result = gadgets;

    // 1. Search Filter
    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        (p.shortSummary && p.shortSummary.toLowerCase().includes(lowerQuery)) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Category Filter
    if (activeCategory !== '*') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory);
    }

    // 3. Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'most-reviewed') {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      } else {
        // 'hottest' - just an arbitrary metric based on a mix of rating and reviews
        const scoreA = (a.rating * 10) + (a.reviewCount || 0);
        const scoreB = (b.rating * 10) + (b.reviewCount || 0);
        return scoreB - scoreA;
      }
    });

    return result;
  }, [searchTerm, activeCategory, sortBy]);

  const displayedGadgets = filteredAndSortedGadgets.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedGadgets.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <section className="pt-12 pb-24 bg-zinc-50/50">
      <div className="container mx-auto px-4">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Flame size={14} /> Trending Now
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-dark leading-tight mb-4 tracking-tight">
              What everyone is reviewing.
            </h2>
            <p className="text-muted text-lg">
              Discover the most discussed, highest-rated tech of the week.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-96 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-muted" />
            </div>
            <input
              type="text"
              placeholder="Search Gadgets, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-zinc-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-dark"
            />
          </div>
        </div>

        {/* Filters and Sorting Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-6 border-b border-zinc-200">
          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => { setActiveCategory(cat.value); setVisibleCount(4); }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat.value 
                    ? 'bg-dark text-white shadow-md' 
                    : 'bg-white text-muted border border-zinc-200 hover:border-dark hover:text-dark'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 bg-white border border-zinc-200 px-4 py-2 rounded-full shadow-sm">
            <SlidersHorizontal size={16} className="text-muted" />
            <span className="text-sm font-medium text-muted">Sort by:</span>
            <select 
              className="bg-transparent text-sm font-bold text-dark outline-none cursor-pointer"
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setVisibleCount(4); }}
            >
              <option value="hottest">🔥 Hottest</option>
              <option value="rating">⭐ Top Rated</option>
              <option value="most-reviewed">💬 Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Grid Container */}
        {filteredAndSortedGadgets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedGadgets.map((gadget: any) => (
              <div key={gadget.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                <TrendingGadgetCard gadget={gadget} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4 text-muted">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">No Gadgets found</h3>
            <p className="text-muted">We couldn't find anything matching your current filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveCategory('*'); }}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={loadMore}
              className="group px-8 py-3 bg-white border-2 border-dark text-dark rounded-xl font-bold hover:bg-dark hover:text-white transition-all duration-300 shadow-sm flex items-center gap-2 active:scale-95"
            >
              Load More Gadgets
              <svg className="w-4 h-4 ml-1 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingGadgetsSection;
