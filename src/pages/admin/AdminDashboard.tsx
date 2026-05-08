import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, MessageSquare, Package, MoreHorizontal, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { getApiUrl } from '../../utils/api';

const AdminDashboard: React.FC = () => {
   const { user } = useAuthModal();
   const [stats, setStats] = useState({
      totalUsers: 0,
      totalSellers: 0,
      totalGadgets: 0,
      totalReviews: 0,
      pendingSellerRequests: 0
   });

   const [recentReviews, setRecentReviews] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchStats = async () => {
         try {
            const response = await fetch(getApiUrl('/api/admin/stats'), {
               headers: {
                  'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
               }
            });
            const data = await response.json();
            if (data.success) {
               setStats(data.data.stats);
               setRecentReviews(data.data.recentReviews);
            } else {
               setError(data.message);
            }
         } catch (err) {
            setError('Failed to load dashboard statistics.');
         } finally {
            setIsLoading(false);
         }
      };

      fetchStats();
   }, []);

   const metrics = [
      { label: 'Total Gadgets', value: stats.totalGadgets, icon: Package, color: 'text-blue-500', bg: 'bg-blue-50', trend: 'Catalog Size' },
      { label: 'Community Reviews', value: stats.totalReviews, icon: MessageSquare, color: 'text-primary', bg: 'bg-primary/10', trend: 'Social Proof' },
      { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-green-500', bg: 'bg-green-50', trend: 'Platform Reach' },
      { label: 'Seller Partners', value: stats.totalSellers, icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-50', trend: `${stats.pendingSellerRequests} pending` },
   ];

   if (isLoading) {
      return (
         <AdminLayout>
            <div className="p-12 flex flex-col items-center justify-center min-h-[60vh]">
               <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
               <p className="text-zinc-400 font-bold animate-pulse">Initializing Dashboard...</p>
            </div>
         </AdminLayout>
      );
   }

   return (
      <AdminLayout>
         <div className="p-6 md:p-8 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
               <div>
                  <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">Command Center</h1>
                  <p className="text-zinc-500 text-sm font-medium">Welcome back, {user?.name || 'Admin'}. Here's what's happening today.</p>
               </div>
               {error && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
                     <AlertCircle size={14} /> {error}
                  </div>
               )}
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
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-2 flex items-center gap-1">
                        {m.trend}
                     </p>
                  </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               {/* Main Visual Section */}
               <div className="lg:col-span-2 space-y-10">
                  {/* Chart Area Simulation */}
                  <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                     <div className="flex items-center justify-between mb-10">
                        <div>
                           <h3 className="text-lg font-black text-zinc-900">Platform Growth</h3>
                           <p className="text-zinc-400 text-xs font-medium">Activity trends over the last 30 days.</p>
                        </div>
                        <div className="flex gap-2">
                           <span className="flex items-center gap-2 text-[10px] font-black uppercase text-primary">
                              <div className="w-2 h-2 rounded-full bg-primary" /> Active
                           </span>
                        </div>
                     </div>

                     <div className="relative h-64 w-full group">
                        <svg viewBox="0 0 1000 300" className="w-full h-full preserve-3d overflow-visible">
                           <line x1="0" y1="250" x2="1000" y2="250" stroke="#f4f4f5" strokeWidth="2" />
                           <line x1="0" y1="175" x2="1000" y2="175" stroke="#f4f4f5" strokeWidth="1" />
                           <line x1="0" y1="100" x2="1000" y2="100" stroke="#f4f4f5" strokeWidth="1" />
                           <line x1="0" y1="25" x2="1000" y2="25" stroke="#f4f4f5" strokeWidth="1" />
                           <path
                              d="M0 250 Q 150 200, 250 220 T 500 100 T 750 150 T 1000 50 V 250 H 0 Z"
                              fill="url(#adminGradient)"
                              className="opacity-20"
                           />
                           <path
                              d="M0 250 Q 150 200, 250 220 T 500 100 T 750 150 T 1000 50"
                              fill="none"
                              stroke="#0066ff"
                              strokeWidth="5"
                              strokeLinecap="round"
                              className="drop-shadow-lg"
                           />
                           <defs>
                              <linearGradient id="adminGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                 <stop offset="0%" stopColor="#0066ff" />
                                 <stop offset="100%" stopColor="transparent" />
                              </linearGradient>
                           </defs>
                        </svg>
                     </div>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                        <ShieldCheck size={32} className="text-primary mb-4" />
                        <h4 className="text-lg font-black mb-1">Verification Queue</h4>
                        <p className="text-zinc-400 text-xs font-medium mb-6">There are {stats.pendingSellerRequests} seller requests waiting for approval.</p>
                        <button className="px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-dark transition-all">Review Now</button>
                     </div>
                     <div className="bg-emerald-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                        <TrendingUp size={32} className="text-white mb-4" />
                        <h4 className="text-lg font-black mb-1">Market Sentiment</h4>
                        <p className="text-emerald-100 text-xs font-medium mb-6">User engagement is up 12.5% compared to last month.</p>
                        <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all">View Analytics</button>
                     </div>
                  </div>
               </div>

               {/* Sidebar Section */}
               <div className="space-y-8">
                  {/* Recent Activity Feed */}
                  <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 shadow-sm">
                     <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-zinc-900">Activity</h3>
                        <Clock size={18} className="text-zinc-300" />
                     </div>
                     <div className="space-y-8 relative">
                        <div className="absolute left-4 top-2 bottom-2 w-px bg-zinc-100" />
                        {recentReviews.length > 0 ? recentReviews.map((r) => (
                           <div key={r.id} className="flex gap-4 relative z-10">
                              <div className="w-8 h-8 rounded-full bg-zinc-50 border border-white ring-4 ring-white flex items-center justify-center shrink-0">
                                 <MessageSquare size={14} className="text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                 <p className="text-xs font-medium text-zinc-500 leading-relaxed truncate">
                                    <span className="font-black text-zinc-900">{r.user?.name}</span> reviewed <span className="font-bold text-primary ">{r.gadget?.name}</span>
                                 </p>
                                 <p className="text-[10px] font-bold text-zinc-300 uppercase mt-1">Recently</p>
                              </div>
                           </div>
                        )) : (
                           <p className="text-xs font-bold text-zinc-300 text-center py-4">No recent activity</p>
                        )}
                        <button className="w-full py-4 bg-zinc-50 rounded-2xl text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:bg-zinc-100 transition-colors">
                           View All Activity
                        </button>
                     </div>
                  </div>

                  {/* Pro Tips Card */}
                  <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-white">
                     <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Quick Guide</h4>
                     <div className="space-y-4">
                        {[
                           'Respond to low-rated reviews promptly.',
                           'Verify seller credentials before approval.',
                           'Monitor system logs for anomalies.'
                        ].map((tip, i) => (
                           <div key={i} className="flex gap-3 items-start">
                              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              <p className="text-xs font-medium text-zinc-400 leading-relaxed">{tip}</p>
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
