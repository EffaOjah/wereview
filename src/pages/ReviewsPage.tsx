import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import ReviewCard from '../components/ui/ReviewCard';
import NairaPrice from '../components/ui/NairaPrice';
import { reviews, products } from '../data/products';
import { ChevronRight, ChevronLeft, SlidersHorizontal, X } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 8;
  const categoryFilter = searchParams.get('category');
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Trigger loading state on initial mount or category change
  useEffect(() => {
    setIsInitialLoading(true);
    const timer = setTimeout(() => setIsInitialLoading(false), 600);
    return () => clearTimeout(timer);
  }, [categoryFilter]);
  
  // Filter reviews by product category if selected
  const allReviews = useMemo(() => {
    let filtered = reviews;
    const category = searchParams.get('category');
    
    if (category) {
      filtered = reviews.filter(r => {
        const prod = products.find(p => p.id === r.productId);
        return prod && prod.category?.toLowerCase() === category.toLowerCase();
      });
    }
    
    // Duplicate for mock pagination showcase
    return [...filtered, ...filtered, ...filtered];
  }, [searchParams]);
  
  const totalPages = Math.ceil(allReviews.length / itemsPerPage);
  const paginatedReviews = allReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const setPage = (page: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
        <h4 className="text-xl font-black text-dark mb-6 border-l-4 border-primary pl-4 border-l-primary">Filter Feed</h4>
        <ul className="flex flex-col gap-2 font-bold text-sm">
          <Link to="/products" className="flex items-center justify-between px-3 py-2 text-dark bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors mb-2 border border-zinc-200">
            Browse All Gadgets <ChevronRight size={14} />
          </Link>

          {['All Reviews', 'Gadgets', 'Accessories', 'Tablets', 'Cameras', 'Smartwatches'].map((dept) => {
            const activeDept = searchParams.get('category') || 'All Reviews';
            const isActive = activeDept === dept;
            
            return (
              <li 
                key={dept} 
                onClick={() => {
                  setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    if (dept === 'All Reviews') {
                      next.delete('category');
                    } else {
                      next.set('category', dept);
                    }
                    next.delete('page'); // reset to page 1
                    return next;
                  });
                  setIsSidebarOpen(false);
                }}
                className={`cursor-pointer flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-zinc-500 hover:text-primary hover:bg-zinc-50'}`}
              >
                {dept} {isActive && <ChevronRight size={14} />}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Latest Products Sidebar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
        <h4 className="text-xl font-black text-dark mb-6 border-l-4 border-primary pl-4">Trending Gadgets</h4>
        <div className="flex flex-col gap-6">
          {products.slice(0, 4).map((product) => (
            <Link onClick={() => setIsSidebarOpen(false)} to={`/reviews/${product.id}`} key={product.id} className="flex gap-4 items-center group">
               <img src={product.image} alt={product.name} className="w-16 h-16 object-contain p-2 border border-zinc-100 rounded-lg group-hover:border-primary transition-colors mix-blend-multiply" />
               <div className="flex flex-col">
                  <h6 className="text-sm font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">{product.name}</h6>
                  <NairaPrice amount={product.price * 1500} className="text-primary font-bold text-sm mt-1" />
               </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="reviews-page bg-zinc-50/50">
      <Breadcrumb title="The Review Feed" items={[{ name: 'Reviews', path: '/reviews' }]} />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-1/4 shrink-0">
              <SidebarContent />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
              <div className="fixed inset-0 z-[100] flex lg:hidden">
                <div className="bg-white w-80 h-full overflow-y-auto p-6 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black text-dark text-xl">Filters</h3>
                    <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
                  </div>
                  <SidebarContent />
                </div>
                <div className="flex-1 bg-black/40" onClick={() => setIsSidebarOpen(false)} />
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-8">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 mb-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div>
                   <h2 className="text-2xl font-black text-dark leading-tight">Latest Community Reviews</h2>
                   <p className="text-muted text-sm font-medium mt-1">See what real Nigerians are saying about the hottest tech right now.</p>
                 </div>
                 <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-dark text-white rounded-lg text-sm font-bold shrink-0"
                 >
                    <SlidersHorizontal size={16} /> Filters
                 </button>
               </div>

               {isInitialLoading ? (
                 <div className="grid grid-cols-1 gap-6">
                   {Array.from({ length: 4 }).map((_, i) => (
                     <div key={i} className="flex flex-col md:flex-row bg-[#f9f8f8] p-6 rounded-sm border border-zinc-100 gap-6 animate-pulse">
                        <div className="w-full md:w-32 h-32 bg-zinc-200 shrink-0" />
                        <div className="flex-1 flex flex-col gap-4 py-2">
                           <div className="w-1/2 h-6 bg-zinc-200 rounded" />
                           <div className="w-1/4 h-3 bg-zinc-200 rounded" />
                           <div className="w-full h-12 bg-zinc-200 rounded mt-auto" />
                        </div>
                     </div>
                   ))}
                 </div>
               ) : paginatedReviews.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-20 text-center gap-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-2 border border-zinc-100">
                      <span className="text-4xl">📭</span>
                    </div>
                    <h3 className="text-xl font-black text-dark">No reviews found</h3>
                    <p className="text-muted text-sm font-medium max-w-sm">
                      We don't have any community reviews for <span className="text-primary font-bold">{categoryFilter}</span> yet.
                    </p>
                    <Link to="/products" className="mt-4 px-6 py-2.5 bg-dark text-white rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                      Browse Gadgets
                    </Link>
                 </div>
               ) : (
                 <>
                   <div className="grid grid-cols-1 gap-6">
                     {paginatedReviews.map((review, index) => (
                       <ReviewCard key={`${review.id}-${index}`} review={review} />
                     ))}
                   </div>

                   {/* Pagination */}
                   {totalPages > 1 && (
                     <div className="flex justify-center flex-wrap gap-2 mt-8 py-8 border-t border-zinc-100">
                        {currentPage > 1 && (
                          <button 
                            onClick={() => setPage(currentPage - 1)}
                            className="w-10 h-10 rounded-lg flex items-center justify-center border border-zinc-200 font-bold hover:bg-primary hover:text-white transition-colors"
                          >
                            <ChevronLeft size={16} />
                          </button>
                        )}
                        
                        {Array.from({ length: totalPages }).map((_, i) => {
                          const page = i + 1;
                          return (
                            <button 
                              key={page}
                              onClick={() => setPage(page)}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${page === currentPage ? 'bg-primary text-white shadow-md' : 'border border-zinc-200 hover:bg-primary hover:text-white bg-white'}`}
                            >
                              {page}
                            </button>
                          );
                        })}

                        {currentPage < totalPages && (
                          <button 
                            onClick={() => setPage(currentPage + 1)}
                            className="w-10 h-10 rounded-lg flex items-center justify-center border border-zinc-200 font-bold hover:bg-primary hover:text-white transition-colors"
                          >
                            <ChevronRight size={16} />
                          </button>
                        )}
                     </div>
                   )}
                 </>
               )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsPage;
