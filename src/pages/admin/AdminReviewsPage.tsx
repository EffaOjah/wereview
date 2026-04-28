import React, { useState, useEffect } from 'react';
import { Search, Trash2, Star, CheckCircle, Flag, MessageCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { reviews as initialReviews, gadgets } from '../../data/gadgets';
import type { Review } from '../../types';

const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Flagged'>('All');

  useEffect(() => {
    const savedReviews = localStorage.getItem('gadgethub_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(initialReviews);
      localStorage.setItem('gadgethub_reviews', JSON.stringify(initialReviews));
    }
  }, []);

  const getGadgetName = (productId: string) => {
    const gadget = gadgets.find(p => p.id === productId);
    return gadget ? gadget.name : 'Unknown Gadget';
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updated = reviews.filter(r => r.id !== id);
      setReviews(updated);
      localStorage.setItem('gadgethub_reviews', JSON.stringify(updated));
    }
  };

  const handleFlag = (id: string) => {
    const updated = reviews.map(r => 
      r.id === id ? { ...r, isFlagged: !r.isFlagged } : r
    );
    setReviews(updated);
    localStorage.setItem('gadgethub_reviews', JSON.stringify(updated));
  };

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = r.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          getGadgetName(r.GadgetId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === 'All' || r.rating === selectedRating;
    const matchesStatus = filterStatus === 'All' || r.isFlagged;
    
    return matchesSearch && matchesRating && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">Review Moderation</h1>
            <p className="text-zinc-500 text-sm font-medium">Monitor community feedback and moderate flagged content.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold border border-primary/20">
               {reviews.length} Total Reviews
             </div>
             <div className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
               {reviews.filter(r => r.isFlagged).length} Flagged
             </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by author, Gadget, or comment..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/30 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value === 'All' ? 'All' : Number(e.target.value))}
              className="px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/30 focus:bg-white transition-all text-sm font-bold text-zinc-600"
            >
              <option value="All">All Ratings</option>
              {[5, 4, 3, 2, 1].map(r => (
                <option key={r} value={r}>{r} Stars</option>
              ))}
            </select>
            <button 
              onClick={() => setFilterStatus(filterStatus === 'All' ? 'Flagged' : 'All')}
              className={`flex items-center gap-2 px-4 py-3 border rounded-2xl text-sm font-bold transition-all ${
                filterStatus === 'Flagged' 
                ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20' 
                : 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <Flag size={18} className={filterStatus === 'Flagged' ? 'fill-white' : ''} />
              Flagged Only
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
           {filteredReviews.map((review) => (
            <div 
              key={review.id} 
              className={`bg-white border rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden group ${
                review.isFlagged ? 'border-red-200 bg-red-50/10' : 'border-zinc-200'
              }`}
            >
              {review.isFlagged && (
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
              )}
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Author Info */}
                <div className="md:w-48 shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-black text-zinc-400 text-sm">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-900 leading-none mb-1">{review.author}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{review.date}</p>
                    </div>
                  </div>
                  {review.isVerifiedPurchase && (
                    <div className="flex items-center gap-1.5 text-green-600">
                      <CheckCircle size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Verified</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                       <div className="flex gap-0.5">
                         {[...Array(5)].map((_, i) => (
                           <Star 
                             key={i} 
                             size={14} 
                             className={i < review.rating ? 'fill-primary text-primary' : 'text-zinc-200'} 
                           />
                         ))}
                       </div>
                       <span className="text-xs font-bold text-zinc-400 ml-2">on</span>
                       <span className="text-xs font-black text-zinc-900 hover:text-primary transition-colors cursor-pointer">
                         {getGadgetName(review.GadgetId)}
                       </span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-black text-zinc-900 mb-2">{review.title}</h4>
                  <p className="text-zinc-600 text-sm font-medium leading-relaxed mb-6">
                    "{review.comment}"
                  </p>

                  <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest">
                     <div className="flex items-center gap-2 text-green-600">
                        <span className="text-zinc-400">Pros:</span>
                        {review.pros?.length ? review.pros.join(', ') : 'None listed'}
                     </div>
                     <div className="flex items-center gap-2 text-red-500">
                        <span className="text-zinc-400">Cons:</span>
                        {review.cons?.length ? review.cons.join(', ') : 'None listed'}
                     </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-center justify-center gap-3 border-t md:border-t-0 md:border-l border-zinc-100 pt-4 md:pt-0 md:pl-6">
                  <button 
                    onClick={() => handleFlag(review.id)}
                    className={`p-3 rounded-2xl transition-all flex flex-col items-center gap-1 w-full md:w-20 ${
                      review.isFlagged 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                      : 'bg-zinc-50 text-zinc-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                    title={review.isFlagged ? 'Unflag Review' : 'Flag for Review'}
                  >
                    <Flag size={18} className={review.isFlagged ? 'fill-white' : ''} />
                    <span className="text-[8px] font-bold">FLAG</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="p-3 bg-zinc-50 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-2xl transition-all flex flex-col items-center gap-1 w-full md:w-20"
                    title="Delete permanently"
                  >
                    <Trash2 size={18} />
                    <span className="text-[8px] font-bold">DELETE</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="p-20 text-center bg-white border border-zinc-200 rounded-[3rem]">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                <MessageCircle size={24} className="text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">No reviews found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReviewsPage;


