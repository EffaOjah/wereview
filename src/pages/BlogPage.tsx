import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import BlogCard from '../components/ui/BlogCard';
import { blogPosts } from '../data/gadgets';
import { Search, ChevronRight, ChevronLeft, SlidersHorizontal, X } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 4;
  const searchQuery = searchParams.get('q') || '';
  const searchTag = searchParams.get('tag') || '';
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsInitialLoading(true);
    const timer = setTimeout(() => setIsInitialLoading(false), 600);
    return () => clearTimeout(timer);
  }, [searchQuery, searchTag]);

  // Duplicate posts for showcasing pagination and apply generic search logic
  const allPosts = useMemo(() => {
    let posts = [...blogPosts, ...blogPosts, ...blogPosts];
    if (searchQuery) {
        posts = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (searchTag) {
        posts = posts.filter(p => p.title.toLowerCase().includes(searchTag.toLowerCase()) || p.excerpt.toLowerCase().includes(searchTag.toLowerCase()));
    }
    return posts;
  }, [searchQuery, searchTag]);

  const totalPages = Math.ceil(allPosts.length / itemsPerPage);
  const paginatedPosts = allPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const setPage = (page: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (searchInputRef.current?.value) {
        next.set('q', searchInputRef.current.value);
      } else {
        next.delete('q');
      }
      next.delete('page');
      return next;
    });
  };

  const setTag = (tag: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (tag === searchTag) next.delete('tag');
      else next.set('tag', tag);
      next.delete('page');
      return next;
    });
    setIsSidebarOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-12">
      {/* Search */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
        <h4 className="text-xl font-black text-dark mb-6 border-l-4 border-primary pl-4">Search Articles</h4>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input 
            ref={searchInputRef}
            type="text" 
            defaultValue={searchQuery}
            placeholder="Search updates, reviews..." 
            className="w-full border-b border-zinc-200 py-2 outline-none focus:border-primary text-sm font-medium"
          />
          <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Tags */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
        <h4 className="text-xl font-black text-dark mb-6 border-l-4 border-primary pl-4">Topic Tags</h4>
        <div className="flex flex-wrap gap-2">
          {['Android', 'IOS', 'Laptops', 'Wearables', 'Reviews', 'Guidelines'].map((tag) => {
            const isActive = searchTag === tag;
            return (
              <button 
                key={tag} 
                onClick={() => setTag(tag)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer uppercase tracking-widest ${isActive ? 'bg-primary text-white shadow-md' : 'bg-zinc-50 border border-zinc-100 text-muted hover:bg-primary/10 hover:text-primary'}`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
        <h4 className="text-xl font-black text-dark mb-6 border-l-4 border-primary pl-4">Recently Added</h4>
        <div className="flex flex-col gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link to="#" onClick={() => setIsSidebarOpen(false)} key={post.id} className="flex gap-4 items-center group">
               <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded-xl border border-zinc-100" />
               <div className="flex flex-col">
                  <h6 className="text-sm font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">{post.title}</h6>
                  <span className="text-xs text-muted font-bold tracking-tighter mt-1">{post.date}</span>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="blog-page bg-zinc-50/30 pb-24">
      <Breadcrumb title="Editorial & Blog" items={[{ name: 'Blog', path: '/blog' }]} />

      <section className="py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-1/3 shrink-0">
              <SidebarContent />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
              <div className="fixed inset-0 z-[100] flex lg:hidden">
                <div className="bg-white w-80 h-full overflow-y-auto p-6 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black text-dark text-xl">Filters & Topics</h3>
                    <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
                  </div>
                  <SidebarContent />
                </div>
                <div className="flex-1 bg-black/40" onClick={() => setIsSidebarOpen(false)} />
              </div>
            )}


            {/* Main Content */}
            <div className="lg:w-2/3 flex flex-col gap-8">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 mb-2 flex justify-between items-center">
                 <div>
                   <h2 className="text-2xl font-black text-dark leading-tight">Platform Updates</h2>
                   <p className="text-muted text-sm font-medium mt-1">Stay up to date with the latest gadget releases and news.</p>
                 </div>
                 <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-dark text-white rounded-lg text-sm font-bold shrink-0"
                 >
                    <SlidersHorizontal size={16} /> Filters
                 </button>
               </div>

               {/* Active Filter Pills Map */}
               {(searchQuery || searchTag) && (
                 <div className="flex flex-wrap gap-2 mb-2">
                   {searchQuery && (
                     <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                       Search: "{searchQuery}"
                       <X size={12} className="cursor-pointer" onClick={() => { setSearchParams(prev => { prev.delete('q'); return prev; }); }} />
                     </span>
                   )}
                   {searchTag && (
                     <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                       Tag: {searchTag}
                       <X size={12} className="cursor-pointer" onClick={() => setTag(searchTag)} />
                     </span>
                   )}
                 </div>
               )}

               {isInitialLoading ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {Array.from({ length: 4 }).map((_, i) => (
                     <div key={i} className="flex flex-col bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm animate-pulse h-[400px]">
                        <div className="w-full h-48 bg-zinc-200" />
                        <div className="p-6 flex flex-col gap-4">
                           <div className="w-1/3 h-4 bg-zinc-200 rounded" />
                           <div className="w-full h-6 bg-zinc-200 rounded" />
                           <div className="w-3/4 h-6 bg-zinc-200 rounded" />
                           <div className="w-1/2 h-4 bg-zinc-200 rounded mt-auto" />
                        </div>
                     </div>
                   ))}
                 </div>
               ) : paginatedPosts.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-24 text-center gap-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-2 border border-zinc-100">
                      <span className="text-4xl">📰</span>
                    </div>
                    <h3 className="text-xl font-black text-dark">No articles found</h3>
                    <p className="text-muted text-sm font-medium max-w-sm">
                      We couldn't find any articles matching your search query or tag. Try adjusting your filters.
                    </p>
                    <button 
                      onClick={() => setSearchParams({})}
                      className="mt-4 px-6 py-2.5 bg-dark text-white rounded-lg font-bold text-sm hover:bg-primary transition-colors"
                    >
                      Clear All Filters
                    </button>
                 </div>
               ) : (
                 <>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {paginatedPosts.map((post, index) => (
                       <BlogCard key={`${post.id}-${index}`} post={post} />
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

export default BlogPage;
