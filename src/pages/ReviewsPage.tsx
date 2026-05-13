import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import ReviewCard from '../components/ui/ReviewCard';
import { ChevronRight, ChevronLeft, SlidersHorizontal, X } from 'lucide-react';
import { getApiUrl } from '../utils/api';

const ReviewsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 8;
  const categoryFilter = searchParams.get('category');
  
  const [reviewsData, setReviewsData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<any[]>([]);
  const [trendingGadgets, setTrendingGadgets] = useState<any[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsInitialLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('page', String(currentPage));
        queryParams.set('limit', String(itemsPerPage));
        if (categoryFilter && categoryFilter !== 'All Reviews') {
          queryParams.set('category', categoryFilter);
        }

        const res = await fetch(getApiUrl(`/api/reviews?${queryParams.toString()}`));
        const data = await res.json();

        if (data.success) {
          setReviewsData(data.data);
          setTotalPages(data.pagination.totalPages);
        } else {
          setReviewsData([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviewsData([]);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage, categoryFilter]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(getApiUrl('/api/categories'));
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    const fetchTrending = async () => {
      try {
        const res = await fetch(getApiUrl('/api/gadgets/trending'));
        const data = await res.json();
        if (data.success) {
          setTrendingGadgets(data.data.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching trending gadgets:', error);
      } finally {
        setIsLoadingTrending(false);
      }
    };

    fetchCategories();
    fetchTrending();
  }, []);

  const paginatedReviews = reviewsData;

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
          <Link to="/gadgets" className="flex items-center justify-between px-3 py-2 text-dark bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors mb-2 border border-zinc-200">
            Browse All Gadgets <ChevronRight size={14} />
          </Link>

          {isLoadingCategories ? (
             <div className="flex flex-col gap-2">
               {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-9 bg-zinc-50 rounded-lg animate-pulse" />)}
             </div>
          ) : (
            ['All Reviews', ...categories.map(c => c.name)].map((dept) => {
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
            })
          )}
        </ul>
      </div>

      {/* Latest Gadgets Sidebar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
        <h4 className="text-xl font-black text-dark mb-6 border-l-4 border-primary pl-4">Trending Gadgets</h4>
        <div className="flex flex-col gap-6">
          {isLoadingTrending ? (
             <div className="flex flex-col gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex gap-4 items-center animate-pulse">
                    <div className="w-16 h-16 bg-zinc-50 rounded-lg shrink-0" />
                    <div className="flex-1">
                       <div className="w-full h-4 bg-zinc-50 rounded" />
                    </div>
                  </div>
                ))}
             </div>
          ) : trendingGadgets.length === 0 ? (
            <p className="text-xs text-muted font-bold uppercase tracking-widest text-center py-4">No trending items</p>
          ) : (
            trendingGadgets.map((gadget) => (
              <Link onClick={() => setIsSidebarOpen(false)} to={`/gadgets/${gadget.slug || gadget.id}`} key={gadget.id} className="flex gap-4 items-center group">
                 <img src={gadget.image} alt={gadget.name} className="w-16 h-16 object-contain p-2 border border-zinc-100 rounded-lg group-hover:border-primary transition-colors mix-blend-multiply" />
                 <div className="flex flex-col">
                    <h6 className="text-sm font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">{gadget.name}</h6>
                 </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="reviews-page bg-zinc-50/50">
      <Breadcrumb title="The Review Feed" items={[{ name: 'Reviews', path: '/reviews' }]} />

      <section className="py-16">
        <div className="container">
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
                    <Link to="/gadgets" className="mt-4 px-6 py-2.5 bg-dark text-white rounded-lg font-bold text-sm hover:bg-primary transition-colors">
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

