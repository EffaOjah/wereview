import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, MessageSquare, Package, ArrowUpRight, MoreHorizontal, Star, Clock } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';
import AdminLayout from '../../components/admin/AdminLayout';
import type { Gadget, Review, User } from '../../types';
import { gadgets } from '../../data/gadgets';

const AdminDashboard: React.FC = () => {
   const { user } = useAuthModal();
   const [stats, setStats] = useState({
      Gadgets: 0,
      reviews: 0,
      users: 0,
      growth: '+12.5%'
   });

   const [recentReviews, setRecentReviews] = useState<Review[]>([]);
   const [topGadgets, setTopGadgets] = useState<Gadget[]>([]);

   useEffect(() => {
      // Pull counts from localStorage
      const savedGadgets = localStorage.getItem('gadgethub_gadgets');
      const savedReviews = localStorage.getItem('gadgethub_reviews');
      const savedUsers = localStorage.getItem('gadgethub_users');

      const gadgetsList: Gadget[] = savedGadgets ? JSON.parse(savedGadgets) : [];
      const reviewsList: Review[] = savedReviews ? JSON.parse(savedReviews) : [];
      const usersList: User[] = savedUsers ? JSON.parse(savedUsers) : [];

      setStats({
         Gadgets: gadgetsList.length,
         reviews: reviewsList.length,
         users: usersList.length,
         growth: '+12.5%'
      });

      setRecentReviews(reviewsList.slice(0, 5));
      setTopGadgets(gadgets.slice(0, 4));
   }, []);

   const metrics = [
      { label: 'Total Gadgets', value: stats.Gadgets, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+4 new today' },
      { label: 'Verified Deals', value: stats.reviews, icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/10', trend: '+18% this week' },
      { label: 'Active Members', value: stats.users, icon: Users, color: 'text-green-500', bg: 'bg-green-50', trend: '+24 new joins' },
      { label: 'Average Engagement', value: '4.8', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50', trend: 'High activity' },
   ];

   return (
      <AdminLayout>
         <div className="p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
               <div>
                  <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">Command Center</h1>
                  <p className="text-zinc-500 text-sm font-medium">Welcome back, {user?.name || 'Admin'}. Here's what's happening today.</p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400">
                     Last updated: 2 mins ago
                  </div>
               </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
               {metrics.map((m) => (
                  <div key={m.label} className="bg-white border border-zinc-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                     <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${m.bg} ${m.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                           <m.icon size={24} />
                        </div>
                        <button className="text-zinc-300 hover:text-zinc-900"><MoreHorizontal size={20} /></button>
                     </div>
                     <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">{m.label}</p>
                     <h3 className="text-2xl font-black text-zinc-900">{m.value}</h3>
                     <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mt-2 flex items-center gap-1">
                        <ArrowUpRight size={12} /> {m.trend}
                     </p>
                  </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Main Visual Section */}
               <div className="lg:col-span-2 space-y-10">
                  {/* Chart Area */}
                  <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                     <div className="flex items-center justify-between mb-10">
                        <div>
                           <h3 className="text-lg font-black text-zinc-900">Platform Growth</h3>
                           <p className="text-zinc-400 text-xs font-medium">Engagement trends over the last 30 days.</p>
                        </div>
                        <div className="flex gap-2">
                           <span className="flex items-center gap-2 text-[10px] font-black uppercase text-primary">
                              <div className="w-2 h-2 rounded-full bg-primary" /> Reviews
                           </span>
                           <span className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-300 ml-4">
                              <div className="w-2 h-2 rounded-full bg-zinc-200" /> Users
                           </span>
                        </div>
                     </div>

                     {/* Simulated Chart SVG */}
                     <div className="relative h-64 w-full group">
                        <svg viewBox="0 0 1000 300" className="w-full h-full preserve-3d overflow-visible">
                           {/* Grid lines */}
                           <line x1="0" y1="250" x2="1000" y2="250" stroke="#f4f4f5" strokeWidth="2" />
                           <line x1="0" y1="175" x2="1000" y2="175" stroke="#f4f4f5" strokeWidth="1" />
                           <line x1="0" y1="100" x2="1000" y2="100" stroke="#f4f4f5" strokeWidth="1" />
                           <line x1="0" y1="25" x2="1000" y2="25" stroke="#f4f4f5" strokeWidth="1" />

                           {/* Area path */}
                           <path
                              d="M0 250 Q 150 200, 250 220 T 500 100 T 750 150 T 1000 50 V 250 H 0 Z"
                              fill="url(#gradient)"
                              className="opacity-20"
                           />

                           {/* Line path */}
                           <path
                              d="M0 250 Q 150 200, 250 220 T 500 100 T 750 150 T 1000 50"
                              fill="none"
                              stroke="#0066ff"
                              strokeWidth="5"
                              strokeLinecap="round"
                              className="drop-shadow-lg"
                           />

                           <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                 <stop offset="0%" stopColor="#0066ff" />
                                 <stop offset="100%" stopColor="transparent" />
                              </linearGradient>
                           </defs>
                        </svg>

                        {/* Floating tooltip simulation */}
                        <div className="absolute top-1/4 right-1/4 bg-zinc-900 text-white p-3 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                           <p className="text-[8px] font-black uppercase text-zinc-500 mb-1">Peak Activity</p>
                           <p className="text-xs font-bold">+85 Reviews</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-6 gap-4 mt-8">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                           <span key={day} className="text-center text-[10px] font-black text-zinc-300 uppercase">{day}</span>
                        ))}
                     </div>
                  </div>

                  {/* Top Gadgets Table */}
                  <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 shadow-sm">
                     <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-zinc-900">Trending Gadgets</h3>
                        <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All Gadgets</button>
                     </div>
                     <div className="space-y-6">
                        {topGadgets.map((p: any, _idx: number) => (
                           <div key={p.id} className="flex items-center justify-between group">
                              <div className="flex items-center gap-4">
                                 <span className="text-xs font-black text-zinc-300 w-4">0{_idx + 1}</span>
                                 <img src={p.image} className="w-12 h-12 rounded-xl object-cover border border-zinc-100" alt={p.name} />
                                 <div>
                                    <p className="text-sm font-bold text-zinc-900 leading-none mb-1">{p.name}</p>
                                    <p className="text-[10px] text-zinc-400 font-medium">{p.category}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="flex items-center justify-end gap-1 text-primary mb-1">
                                    <Star size={12} className="fill-primary" />
                                    <span className="text-xs font-black text-zinc-900">{p.rating}</span>
                                 </div>
                                 <p className="text-[10px] font-bold text-zinc-400 uppercase">{p.reviewCount} Reviews</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Sidebar Section */}
               <div className="space-y-8">
                  {/* Activity Feed */}
                  <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 shadow-sm">
                     <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-zinc-900">Activity</h3>
                        <Clock size={18} className="text-zinc-300" />
                     </div>
                     <div className="space-y-8 relative">
                        <div className="absolute left-4 top-2 bottom-2 w-px bg-zinc-100" />
                        {recentReviews.map((r) => (
                           <div key={r.id} className="flex gap-4 relative z-10">
                              <div className="w-8 h-8 rounded-full bg-zinc-50 border border-white ring-4 ring-white flex items-center justify-center shrink-0">
                                 <MessageSquare size={14} className="text-primary" />
                              </div>
                              <div>
                                 <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                                    <span className="font-black text-zinc-900">{r.author}</span> reviewed <span className="font-bold text-primary ">"{r.title}"</span>
                                 </p>
                                 <p className="text-[10px] font-bold text-zinc-300 uppercase mt-1">{r.date}</p>
                              </div>
                           </div>
                        ))}
                        <button className="w-full py-4 bg-zinc-50 rounded-2xl text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:bg-zinc-100 transition-colors">
                           Load More History
                        </button>
                     </div>
                  </div>

                  {/* Quick Actions Card */}
                  <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-8">
                     <h4 className="text-sm font-black text-zinc-900 mb-6">Pro Tips</h4>
                     <div className="space-y-4">
                        {[
                           'Respond to 1-star reviews to increase trust.',
                           'Check for flagged content twice daily.',
                           'Update your hero banners for holiday sales.'
                        ].map((tip, i) => (
                           <div key={i} className="flex gap-3 items-start">
                              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              <p className="text-xs font-medium text-zinc-600 leading-relaxed">{tip}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </AdminLayout>
   );
};

export default AdminDashboard;
