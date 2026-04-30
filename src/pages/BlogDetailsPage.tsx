import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import { blogPosts } from '../data/gadgets';
import { Calendar, MessageSquare, User, Search, SlidersHorizontal, X, ChevronLeft } from 'lucide-react';

const BlogDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dynamic lookup
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsInitialLoading(true);
    const timer = setTimeout(() => setIsInitialLoading(false), 600);
    return () => clearTimeout(timer);
  }, [id]);

  const SidebarContent = () => (
    <div className="flex flex-col gap-12">
       {/* Search */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <h4 className="text-xl font-black text-dark mb-6 border-l-4 border-primary pl-4">Search Blog</h4>
          <form className="relative" onSubmit={(e) => {
            e.preventDefault();
            const q = e.currentTarget.querySelector('input')?.value;
            if (q) navigate(`/blog?q=${encodeURIComponent(q)}`);
          }}>
             <input type="text" placeholder="Search..." className="w-full border-b border-zinc-200 py-2 outline-none focus:border-primary text-sm font-medium" />
             <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"><Search size={18} /></button>
          </form>
       </div>

       {/* Recent Posts */}
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <h4 className="text-xl font-black text-dark mb-6 border-l-4 border-primary pl-4">Recent News</h4>
          <div className="flex flex-col gap-6">
             {blogPosts.slice(0, 3).map((bp) => (
                <Link to={`/blog/${bp.id}`} onClick={() => setIsSidebarOpen(false)} key={bp.id} className="flex gap-4 items-center group">
                   <img src={bp.image} alt={bp.title} className="w-20 h-20 object-cover rounded-xl border border-zinc-100" />
                   <div className="flex flex-col">
                      <h6 className="text-sm font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">{bp.title}</h6>
                      <span className="text-xs text-muted font-bold tracking-widest mt-1 uppercase">{bp.date}</span>
                   </div>
                </Link>
             ))}
          </div>
       </div>
    </div>
  );

  if (isInitialLoading) {
    return (
      <div className="blog-details-page bg-zinc-50/50 pb-24">
        <Breadcrumb title="Loading Article..." items={[{ name: 'Blog', path: '/blog' }]} />
        <div className="container py-16">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="hidden lg:block lg:w-1/3 shrink-0 opacity-50"><SidebarContent /></div>
            <div className="flex-1 flex flex-col gap-8 animate-pulse">
               <div className="w-full h-[400px] bg-zinc-200 rounded-2xl" />
               <div className="w-3/4 h-8 bg-zinc-200 rounded" />
               <div className="w-1/2 h-4 bg-zinc-200 rounded" />
               <div className="w-full h-4 bg-zinc-200 rounded mt-4" />
               <div className="w-full h-4 bg-zinc-200 rounded" />
               <div className="w-2/3 h-4 bg-zinc-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-details-page bg-zinc-50/50 pb-24">
        <Breadcrumb title="Article Not Found" items={[{ name: 'Blog', path: '/blog' }]} />
        <div className="container py-32 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border border-zinc-100 shadow-sm">
                <span className="text-5xl">🕵️‍♂️</span>
            </div>
            <h2 className="text-3xl font-black text-dark mb-4">404: Article Missing</h2>
            <p className="text-muted max-w-md mb-8 font-medium text-lg">We couldn't find the article you're looking for. It may have been removed or the link might be broken.</p>
            <Link to="/blog" className="flex items-center gap-2 px-8 py-4 bg-dark text-white rounded-xl font-bold hover:bg-primary transition-all">
                <ChevronLeft size={20} /> Back to Blog
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-details-page bg-zinc-50/30 pb-24">
      <Breadcrumb title={post.title} items={[{ name: 'Blog', path: '/blog' }, { name: 'Details', path: `/blog/${post.id}` }]} />

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
                    <h3 className="font-black text-dark text-xl">Discover</h3>
                    <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
                  </div>
                  <SidebarContent />
                </div>
                <div className="flex-1 bg-black/40" onClick={() => setIsSidebarOpen(false)} />
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
               <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 sm:p-10">
                  
                  {/* Mobile Utilities */}
                  <div className="flex justify-end mb-6 lg:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-dark text-white rounded-lg text-sm font-bold shrink-0"
                    >
                        <SlidersHorizontal size={16} /> Discover
                    </button>
                  </div>

                  <img src={post.image} alt={post.title} className="w-full h-[300px] sm:h-[450px] object-cover rounded-xl shadow-xl mb-10" />
                  
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-xs font-bold uppercase tracking-widest text-muted border-b border-zinc-100 pb-6">
                     <span className="flex items-center gap-2"><User size={14} className="text-primary" /> By Admin</span>
                     <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {post.date}</span>
                     <span className="flex items-center gap-2"><MessageSquare size={14} className="text-primary" /> {post.commentCount} Comments</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-dark mb-8 leading-tight">{post.title}</h3>
                  
                  <div className="flex flex-col gap-6 text-muted leading-relaxed ">
                     <p>Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                     
                     <blockquote className="border-l-4 border-primary pl-8 py-4 bg-light/30 rounded-r-md">
                        <p className="text-xl font-bold text-dark not-">"Technology is best when it brings people together. Our goal is to review the tech that facilitates that connection."</p>
                        <cite className="block mt-4 text-xs font-black uppercase tracking-widest text-primary">— Reviewed By GadgetHub</cite>
                     </blockquote>

                     <p>Donec sollicitudin molestie malesuada. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center py-8 border-y border-zinc-100 mt-12 gap-6">
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-dark uppercase tracking-widest">Share:</span>
                        <div className="flex gap-2">
                           <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-primary hover:text-white transition-colors">FB</span>
                           <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-primary hover:text-white transition-colors">TW</span>
                        </div>
                     </div>
                     <div className="flex gap-2 flex-wrap">
                        <span className="px-5 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-black uppercase tracking-widest">Tech</span>
                        <span className="px-5 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-black uppercase tracking-widest">Reviews</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
