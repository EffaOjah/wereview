import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TrendingGadgetCard from '../components/ui/TrendingGadgetCard';
import { gadgets } from '../data/gadgets';
import { ChevronRight, LayoutGrid, List, Search, SlidersHorizontal, X, SearchX } from 'lucide-react';

const departments = ['Smartphones', 'Laptops & PCs', 'Audio & Headphones', 'Tablets', 'Smartwatches', 'Gaming Consoles', 'Cameras'];

const deptToCategory: Record<string, string> = {
  'Smartphones': 'gadgets',
  'Laptops & PCs': 'laptops',
  'Audio & Headphones': 'headphones',
  'Tablets': 'tablets',
  'Smartwatches': 'smartwatches',
  'Gaming Consoles': 'gaming',
  'Cameras': 'cameras',
};

const ratingOptions = [
  { label: '⭐⭐⭐⭐⭐ 5.0 only', min: 5 },
  { label: '⭐⭐⭐⭐ 4.0 & Above', min: 4 },
  { label: '⭐⭐⭐ 3.0 & Above', min: 3 },
  { label: '✅ All Ratings', min: 0 },
];

const allGadgets = [...gadgets, ...gadgets].map((p, i) => ({ ...p, _key: `${p.id}-${i}` }));

const GadgetsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Initial page load effect
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Read all active filters directly from URL params
  const searchQuery = searchParams.get('q') || '';
  const selectedDept = searchParams.get('category') || '';
  const minRating = Number(searchParams.get('rating') || 0);
  const maxPrice = Number(searchParams.get('maxPrice') || 2000000);
  const sortBy = searchParams.get('sort') || 'default';
  const currentPage = Number(searchParams.get('page') || 1);
  const itemsPerPage = viewMode === 'grid' ? 6 : 4;

  // Hero input — controlled separately, only committed on submit
  const [heroInput, setHeroInput] = useState(searchQuery);

  // Helper to update one URL param while keeping others
  const setParam = (key: string, value: string | null) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value === null || value === '' || value === '0' || value === 'default') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      
      // Reset page to 1 if we're filtering or sorting (i.e. changing anything other than page)
      if (key !== 'page') {
        next.delete('page');
      }
      
      return next;
    });
  };

  // Fake Loading Effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedDept, minRating, maxPrice, sortBy, currentPage, viewMode]);

  const handleHeroSearch = () => {
    setParam('q', heroInput.trim() || null);
    document.getElementById('Gadget-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setHeroInput('');
  };

  const hasActiveFilters = searchQuery || selectedDept || minRating > 0 || maxPrice < 2000000;

  // Combined filter + sort pipeline
  const filteredGadgets = useMemo(() => {
    let result = allGadgets;

    // 1. Search filter — name, description, category, shortSummary
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.shortSummary?.toLowerCase().includes(q) ?? false)
      );
    }

    // 2. Department filter — supports both exact display name (sidebar) and partial/key match (homepage links)
    if (selectedDept) {
      const categoryKey = deptToCategory[selectedDept]; // exact sidebar match
      result = result.filter(p => {
        if (categoryKey) return p.category === categoryKey;
        // Fallback: try to match by category key directly or partial name
        return (
          p.category.toLowerCase().includes(selectedDept.toLowerCase()) ||
          p.name.toLowerCase().includes(selectedDept.toLowerCase())
        );
      });
    }

    // 3. Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // 4. Price filter
    result = result.filter(p => (p.nigerianPrices?.average || 0) <= maxPrice);

    // 5. Sort
    return [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sortBy === 'price-low') return (a.nigerianPrices?.average || 0) - (b.nigerianPrices?.average || 0);
      if (sortBy === 'price-high') return (b.nigerianPrices?.average || 0) - (a.nigerianPrices?.average || 0);
      return 0;
    });
  }, [searchQuery, selectedDept, minRating, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredGadgets.length / itemsPerPage);
  const paginatedGadgets = filteredGadgets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const SkeletonCard = () => (
    <div className={`flex bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden animate-pulse ${viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col h-[400px]'}`}>
      <div className={`bg-zinc-200 shrink-0 ${viewMode === 'list' ? 'w-full sm:w-1/3 aspect-video sm:aspect-square' : 'aspect-[4/3] w-full'}`} />
      <div className="flex flex-col p-6 w-full gap-4">
        <div className="w-1/3 h-4 bg-zinc-200 rounded" />
        <div className="w-3/4 h-6 bg-zinc-200 rounded" />
        <div className="w-full h-10 bg-zinc-200 rounded mt-2" />
        <div className={`mt-auto pt-4 flex gap-4 ${viewMode === 'list' ? 'justify-between items-center' : 'flex-col'}`}>
          <div className="w-24 h-6 bg-zinc-200 rounded" />
          <div className={`${viewMode === 'list' ? 'w-32' : 'w-full'} h-12 bg-zinc-200 rounded`} />
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className="flex flex-col gap-10">
      {/* Department */}
      <div>
        <h4 className="text-lg font-black text-dark mb-5 border-l-4 border-primary pl-4 uppercase tracking-tight">Department</h4>
        <ul className="flex flex-col gap-2 font-bold text-sm">
          <li
            onClick={() => setParam('category', null)}
            className={`cursor-pointer flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${!selectedDept ? 'bg-primary/10 text-primary' : 'hover:text-primary'}`}
          >
            All Gadgets <ChevronRight size={14} />
          </li>
          {departments.map((dept) => (
            <li
              key={dept}
              onClick={() => { setParam('category', dept); setIsSidebarOpen(false); }}
              className={`cursor-pointer flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${selectedDept === dept ? 'bg-primary/10 text-primary' : 'hover:text-primary'}`}
            >
              {dept} <ChevronRight size={14} />
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div>
        <h4 className="text-lg font-black text-dark mb-5 border-l-4 border-primary pl-4 uppercase tracking-tight">Max Price (₦)</h4>
        <div className="flex flex-col gap-3">
          <input
            type="range"
            min="10000"
            max="2000000"
            step="50000"
            value={maxPrice}
            onChange={(e) => setParam('maxPrice', e.target.value)}
            className="w-full accent-primary"
          />
          <div className="flex justify-between items-center text-xs font-black text-dark">
            <span>₦10,000</span>
            <span className="text-primary">Up to ₦{maxPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-lg font-black text-dark mb-5 border-l-4 border-primary pl-4 uppercase tracking-tight">Min. Rating</h4>
        <ul className="flex flex-col gap-3 font-bold text-sm">
          {ratingOptions.map(({ label, min }) => (
            <li key={label} className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
              <input
                type="radio"
                name="rating"
                className="w-4 h-4 accent-primary"
                checked={minRating === min}
                onChange={() => setParam('rating', min > 0 ? String(min) : null)}
              />
              <span onClick={() => setParam('rating', min > 0 ? String(min) : null)}>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
        >
          <X size={16} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="Gadgets-page bg-white">
      {/* Page Hero - ALWAYS VISIBLE */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center gap-6">
          <p className="text-primary font-bold text-xs uppercase tracking-[4px]">GadgetHub</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Browse All Gadgets</h1>
          <p className="text-zinc-300 font-medium max-w-xl">Real ratings from real Nigerians. Find your next phone, laptop, or earbud — filtered your way.</p>

          {/* Hero Search */}
          <div className="w-full max-w-2xl mt-2">
            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-2xl h-14">
              <input
                ref={searchRef}
                type="text"
                value={heroInput}
                onChange={(e) => setHeroInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleHeroSearch()}
                placeholder="Search gadgets, brands, categories..."
                className="flex-grow h-full px-5 outline-none text-dark text-sm font-medium"
              />
              <button
                onClick={handleHeroSearch}
                className="bg-primary hover:bg-primary-hover text-white h-full px-7 font-bold text-sm transition-colors flex items-center gap-2 shrink-0"
              >
                <Search size={18} /> Search
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs tracking-widest uppercase">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-300">Gadgets</span>
          </div>
        </div>
      </section>

      {isInitialLoading ? (
        <div className="animate-pulse">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Fake Desktop Sidebar */}
                <div className="hidden lg:block lg:w-1/4 shrink-0">
                  <div className="w-full h-[600px] bg-zinc-200 rounded-xl" />
                </div>
                
                {/* Fake Main Content */}
                <div className="flex-1">
                  <div className="w-full h-14 bg-zinc-200 rounded-xl mb-8" />
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex flex-col bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden h-[400px]">
                        <div className="bg-zinc-200 aspect-[4/3] w-full shrink-0" />
                        <div className="flex flex-col p-6 w-full gap-4">
                          <div className="w-1/3 h-4 bg-zinc-200 rounded" />
                          <div className="w-3/4 h-6 bg-zinc-200 rounded" />
                          <div className="w-full h-10 bg-zinc-200 rounded mt-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <section className="py-16" id="Gadget-grid">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-1/4 shrink-0">
              <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
              <div className="fixed inset-0 z-50 flex lg:hidden">
                <div className="bg-white w-80 h-full overflow-y-auto p-6 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black text-dark text-xl">Filters</h3>
                    <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
                  </div>
                  <Sidebar />
                </div>
                <div className="flex-1 bg-black/40" onClick={() => setIsSidebarOpen(false)} />
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1">

              {/* Active filter pills */}
              {(searchQuery || selectedDept || minRating > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {searchQuery && (
                    <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                      Search: "{searchQuery}"
                      <X size={12} className="cursor-pointer" onClick={() => { setParam('q', null); setHeroInput(''); }} />
                    </span>
                  )}
                  {selectedDept && (
                    <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                      {selectedDept}
                      <X size={12} className="cursor-pointer" onClick={() => setParam('category', null)} />
                    </span>
                  )}
                  {minRating > 0 && (
                    <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                      ⭐ {minRating}+ Stars
                      <X size={12} className="cursor-pointer" onClick={() => setParam('rating', null)} />
                    </span>
                  )}
                </div>
              )}

              {/* Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-100">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-dark text-white rounded-lg text-sm font-bold"
                  >
                    <SlidersHorizontal size={16} /> Filters
                  </button>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted hidden sm:block">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setParam('sort', e.target.value)}
                      className="border border-zinc-200 text-dark font-bold text-sm px-3 py-2 rounded-lg outline-none cursor-pointer hover:border-primary transition-colors"
                    >
                      <option value="default">Default</option>
                      <option value="rating">Top Rated</option>
                      <option value="reviews">Most Reviewed</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-dark">
                    <span className="text-primary">{filteredGadgets.length}</span> gadgets found
                  </span>
                  <div className="flex items-center gap-1">
                    <button className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-zinc-100 text-dark'}`} onClick={() => setViewMode('grid')}>
                      <LayoutGrid size={16} />
                    </button>
                    <button className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-zinc-100 text-dark'}`} onClick={() => setViewMode('list')}>
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results or Empty State */}
              {isLoading ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {Array.from({ length: itemsPerPage }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : filteredGadgets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                  <SearchX size={56} className="text-zinc-200" />
                  <h3 className="text-xl font-black text-dark">No gadgets found</h3>
                  <p className="text-muted font-medium max-w-sm">
                    We couldn't find any gadgets matching "<span className="text-primary font-bold">{searchQuery}</span>". Try adjusting your search or filters.
                  </p>
                  <button
                    onClick={() => { clearAllFilters(); }}
                    className="px-6 py-3 bg-dark text-white rounded-xl font-bold text-sm hover:bg-primary transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {paginatedGadgets.map((gadget: any) => (
                    <TrendingGadgetCard key={gadget._key} gadget={gadget} viewMode={viewMode} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!isLoading && totalPages > 1 && (
                <div className="flex justify-center flex-wrap gap-2 mt-12 pt-8 border-t border-zinc-100">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    return (
                      <button 
                        key={page} 
                        onClick={() => {
                          setParam('page', String(page));
                          document.getElementById('Gadget-grid')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${page === currentPage ? 'bg-primary text-white' : 'border border-zinc-200 hover:bg-primary hover:text-white'}`}
                      >
                        {page}
                      </button>
                    )
                  })}
                  {currentPage < totalPages && (
                    <button 
                      onClick={() => {
                        setParam('page', String(currentPage + 1));
                        document.getElementById('Gadget-grid')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-zinc-200 font-bold hover:bg-primary hover:text-white transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
};

export default GadgetsPage;
