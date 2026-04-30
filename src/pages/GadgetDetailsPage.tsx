import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApiUrl } from '../utils/api';
import Breadcrumb from '../components/ui/Breadcrumb';
import StarRating from '../components/ui/StarRating';
import NairaPrice from '../components/ui/NairaPrice';
import VerifiedBadge from '../components/ui/VerifiedBadge';
import ReviewSummaryBar from '../components/ui/ReviewSummaryBar';
import HelpfulButton from '../components/ui/HelpfulButton';
import ReviewSubmissionModal from '../components/ui/ReviewSubmissionModal';
import { PenSquare, CheckCircle, TrendingUp, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useAuthModal } from '../context/AuthModalContext';

const GadgetDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'reviews' | 'specs'>('reviews');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSort, setReviewSort] = useState('recent'); // recent, top
  
  const [Gadget, setGadget] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, openModal } = useAuthModal();

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    fetch(getApiUrl(`/api/gadgets/${id}`))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGadget(data.data);
        } else {
          setError(data.message || 'Gadget not found');
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch gadget', err);
        setError('Error fetching gadget');
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="review-details-page bg-zinc-50/30 pb-24 animate-pulse">
         {/* Fake Breadcrumb/Hero Background */}
         <div className="h-[200px] bg-zinc-200 w-full" />
         
         <section className="container mx-auto px-4 mt-8">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-zinc-100 flex flex-col lg:flex-row gap-12 mb-8">
               {/* Fake Image */}
               <div className="lg:w-2/5 aspect-square bg-zinc-200 rounded-2xl" />
               {/* Fake Details */}
               <div className="lg:w-3/5 flex flex-col pt-4 gap-4">
                  <div className="w-32 h-6 bg-zinc-200 rounded-full" />
                  <div className="w-3/4 h-12 bg-zinc-200 rounded" />
                  <div className="w-full h-8 bg-zinc-200 rounded mt-4" />
                  <div className="w-full h-8 bg-zinc-200 rounded" />
                  <div className="w-full h-32 bg-zinc-200 rounded mt-auto" />
               </div>
            </div>
         </section>
      </div>
    );
  }

  if (error || !Gadget) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <h1 className="text-4xl font-black text-dark mb-4">Gadget Not Found</h1>
        <p className="text-muted font-medium mb-8">We couldn't find the gadget you're looking for.</p>
        <Link to="/gadgets" className="primary-btn flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Gadgets
        </Link>
      </div>
    );
  }

  const GadgetReviews = Gadget.reviews || [];

  // Derive distribution
  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  GadgetReviews.forEach((r: any) => ratingCounts[r.rating as keyof typeof ratingCounts]++);
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    percentage: GadgetReviews.length > 0 ? Math.round((ratingCounts[star as keyof typeof ratingCounts] / GadgetReviews.length) * 100) : 0
  }));

  const sortedReviews = [...GadgetReviews].sort((a, b) => {
    if (reviewSort === 'top') return (b.helpfulCount || 0) - (a.helpfulCount || 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Safely parse specs if they are a string
  let parsedSpecs: Record<string, string> = {};
  if (Gadget.specs) {
    if (typeof Gadget.specs === 'string') {
      try { parsedSpecs = JSON.parse(Gadget.specs); } catch(e) {}
    } else {
      parsedSpecs = Gadget.specs;
    }
  }

  // Use prices object (NigerianPrices) or originalPrice
  const priceObj = Gadget.prices; // single object, not array
  const averagePrice = priceObj?.average || Gadget.originalPrice || 0;

  return (
    <div className="review-details-page bg-zinc-50/30 pb-24">
      <Breadcrumb title={Gadget.name} items={[{ name: 'Gadgets', path: '/gadgets' }, { name: Gadget.name, path: '#' }]} />

      <section className="container mx-auto px-4 mt-8">
        {/* Main Gadget Hero */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-zinc-100 flex flex-col lg:flex-row gap-12 mb-8">
          
          {/* Image Gallery */}
          <div className="lg:w-2/5 flex flex-col gap-6">
            <div className="bg-zinc-50 p-12 rounded-2xl flex items-center justify-center aspect-square">
               <img src={Gadget.image} alt={Gadget.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
          </div>

          {/* Core Info & Trust Signals */}
          <div className="lg:w-3/5 flex flex-col pt-4">
             {Gadget.badges && Gadget.badges.length > 0 && (
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-widest self-start mb-4">
                  ⭐ {Gadget.badges[0]}
               </div>
             )}
             
             <h1 className="text-4xl lg:text-5xl font-black text-dark tracking-tight leading-tight mb-4">{Gadget.name}</h1>
             
             {/* Main Rating Ribbon */}
             <div className="flex items-center gap-4 flex-wrap pb-6 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                 <span className="text-3xl font-black text-dark leading-none">{Gadget.avgRating ?? 0}</span>
                 <StarRating rating={Gadget.avgRating ?? 0} size={24} />
              </div>
                <span className="text-muted font-bold">({GadgetReviews.length} User Reviews)</span>
                {GadgetReviews.length > 50 && (
                   <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                     <TrendingUp size={14} /> Highly Discussed
                   </span>
                )}
             </div>

             <p className="text-lg text-muted my-6 leading-relaxed">
                {Gadget.description}
             </p>

             {/* Pricing Card */}
             <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 mt-auto">
               <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                 Current Market Prices (Avg)
               </h3>
               {priceObj ? (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {priceObj.jumia && (
                     <div className="flex flex-col">
                       <span className="text-xs font-bold text-muted mb-1 flex items-center gap-1">Jumia <CheckCircle size={12} className="text-emerald-500" /></span>
                       <NairaPrice amount={priceObj.jumia} className="text-xl text-dark" />
                     </div>
                   )}
                   {priceObj.konga && (
                     <div className="flex flex-col">
                       <span className="text-xs font-bold text-muted mb-1 flex items-center gap-1">Konga <CheckCircle size={12} className="text-emerald-500" /></span>
                       <NairaPrice amount={priceObj.konga} className="text-xl text-dark" />
                     </div>
                   )}
                   {priceObj.slot && (
                     <div className="flex flex-col">
                       <span className="text-xs font-bold text-muted mb-1 flex items-center gap-1">Slot <CheckCircle size={12} className="text-emerald-500" /></span>
                       <NairaPrice amount={priceObj.slot} className="text-xl text-dark" />
                     </div>
                   )}
                   <div className="flex flex-col border-l border-zinc-200 pl-4">
                     <span className="text-xs font-bold text-muted mb-1">Average</span>
                     <NairaPrice amount={averagePrice} className="text-2xl text-primary" />
                   </div>
                 </div>
               ) : (
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted mb-1">Estimated Original Price</span>
                    <NairaPrice amount={Gadget.originalPrice || 0} className="text-2xl text-primary" />
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Aggregated Pros and Cons Box */}
        {(Gadget.pros?.length > 0 || Gadget.cons?.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {Gadget.pros && Gadget.pros.length > 0 && (
              <div className="bg-emerald-50 rounded-2xl p-6 lg:p-8 border border-emerald-100">
                <h3 className="flex items-center gap-2 text-emerald-800 font-bold mb-6">
                   <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle size={18} /></div>
                   What Users Love (Pros)
                </h3>
                <ul className="flex flex-col gap-4">
                  {Gadget.pros.map((pro: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-emerald-900 font-medium">
                      <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500" /> {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {Gadget.cons && Gadget.cons.length > 0 && (
              <div className="bg-red-50 rounded-2xl p-6 lg:p-8 border border-red-100">
                <h3 className="flex items-center gap-2 text-red-800 font-bold mb-6">
                   <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><AlertTriangle size={18} /></div>
                   What Users Dislike (Cons)
                </h3>
                <ul className="flex flex-col gap-4">
                  {Gadget.cons.map((con: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-red-900 font-medium">
                      <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-red-500" /> {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* UGC Review Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
          {/* Header & Tabs */}
          <div className="flex border-b border-zinc-100">
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-6 text-lg font-bold text-center border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-dark'}`}
            >
              User Reviews ({GadgetReviews.length})
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-6 text-lg font-bold text-center border-b-2 transition-colors ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-dark'}`}
            >
              Technical Specs
            </button>
          </div>

          <div className="p-8 lg:p-12">
            {activeTab === 'specs' && (
              <div className="animate-in fade-in max-w-3xl mx-auto">
                {Object.keys(parsedSpecs).length > 0 ? (
                  <ul className="flex flex-col gap-4">
                    {Object.entries(parsedSpecs).map(([k, v]) => (
                      <li key={k} className="flex items-center justify-between py-4 border-b border-zinc-100 last:border-0">
                        <span className="font-bold text-dark">{k}</span>
                        <span className="text-muted font-medium bg-zinc-50 px-4 py-2 rounded-xl">{v}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-muted font-medium py-8">No technical specifications available for this gadget.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
               <div className="animate-in fade-in">
                 
                 {/* Summary & Write Review Toolbar */}
                 <div className="flex flex-col xl:flex-row gap-8 justify-between items-center bg-zinc-50 rounded-2xl p-8 mb-12">
                    <ReviewSummaryBar 
                     averageRating={Gadget.avgRating ?? 0} 
                     totalReviews={GadgetReviews.length} 
                     ratingDistribution={ratingDistribution} 
                   />
                    
                    <div className="flex flex-col items-center xl:items-end flex-shrink-0 w-full xl:w-auto">
                      <h4 className="text-lg font-black text-dark mb-2">Share your experience</h4>
                      <p className="text-muted font-medium text-sm text-center xl:text-right mb-6">Help other Nigerians make better buying decisions.</p>
                      <button 
                        onClick={() => {
                          if (!user) {
                            openModal('login');
                          } else {
                            setIsReviewModalOpen(true);
                          }
                        }}
                        className="w-full xl:w-auto bg-dark text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary transition-colors hover:-translate-y-1 duration-300 shadow-md"
                      >
                        <PenSquare size={20} /> Write a Review
                      </button>
                    </div>
                 </div>

                 {/* Filters */}
                 <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                    <h5 className="font-bold text-dark text-lg">Reviews Feed</h5>
                    <select 
                      value={reviewSort}
                      onChange={(e) => setReviewSort(e.target.value)}
                      className="bg-white border border-zinc-200 text-dark font-bold text-sm px-4 py-2 rounded-lg outline-none cursor-pointer hover:border-primary transition-colors"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="top">Top Helpful Options</option>
                    </select>
                 </div>

                 {/* Reviews Feed */}
                 <div className="flex flex-col gap-10">
                   {sortedReviews.length > 0 ? sortedReviews.map((review: any) => (
                     <div key={review.id} className="flex flex-col md:flex-row gap-6 border-b border-zinc-100 pb-10 last:border-0 last:pb-0">
                       
                       {/* User Info Column */}
                       <div className="md:w-1/4 flex flex-col gap-3">
                         <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xl">
                             {review.user?.name?.charAt(0) || review.author?.charAt(0) || 'U'}
                           </div>
                           <div className="flex flex-col">
                             <Link to={`/user/${review.userId || review.authorId}`} className="font-black text-dark leading-tight hover:text-primary transition-colors">
                               {review.user?.name || review.author || 'Anonymous'}
                             </Link>
                             <span className="text-xs font-bold text-muted">{new Date(review.createdAt || review.date).toLocaleDateString()}</span>
                           </div>
                         </div>
                         {review.isVerifiedPurchase && <VerifiedBadge className="mt-2" />}
                       </div>

                       {/* Review Content Column */}
                       <div className="md:w-3/4 flex flex-col">
                         <div className="flex items-center gap-3 mb-3">
                           <StarRating rating={review.rating} size={16} />
                           {review.title && <h6 className="font-black text-dark text-lg">{review.title}</h6>}
                         </div>
                         
                         <p className="text-muted leading-relaxed mb-6 font-medium text-[15px]">
                           {review.comment || review.content}
                         </p>

                         {/* Specific Review Pros/Cons */}
                         {(review.pros || review.cons) && (
                           <div className="flex flex-wrap gap-6 mb-6 bg-zinc-50 p-4 rounded-xl">
                             {review.pros && review.pros.length > 0 && (
                               <div className="flex-1 min-w-[200px]">
                                 <span className="text-xs font-bold text-emerald-600 block mb-2 uppercase tracking-widest">Pros</span>
                                 <ul className="text-sm font-medium text-dark flex flex-col gap-1">
                                   {review.pros.map((p: string, i: number) => <li key={i} className="flex items-start gap-2"><span className="text-emerald-500 mt-1">+</span> {p}</li>)}
                                 </ul>
                               </div>
                             )}
                             {review.cons && review.cons.length > 0 && (
                               <div className="flex-1 min-w-[200px]">
                                 <span className="text-xs font-bold text-red-600 block mb-2 uppercase tracking-widest">Cons</span>
                                 <ul className="text-sm font-medium text-dark flex flex-col gap-1">
                                   {review.cons.map((c: string, i: number) => <li key={i} className="flex items-start gap-2"><span className="text-red-500 mt-1">-</span> {c}</li>)}
                                 </ul>
                               </div>
                             )}
                           </div>
                         )}

                         {/* Actions */}
                         <div className="flex items-center gap-4 mt-auto">
                           <HelpfulButton initialCount={review.helpfulCount || 0} />
                           {/* Add Reply/Report UI here later */}
                         </div>
                       </div>
                     </div>
                   )) : (
                     <div className="text-center py-12">
                       <p className="text-muted font-medium">No reviews yet for this Gadget. Be the first to share your thoughts!</p>
                     </div>
                   )}
                 </div>

               </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ReviewSubmissionModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        GadgetName={Gadget.name} 
      />
    </div>
  );
};

export default GadgetDetailsPage;
