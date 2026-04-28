import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  User as UserIcon, 
  Star, 
  Settings, 
  LogOut, 
  Camera, 
  LayoutDashboard, 
  Heart, 
  History,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Trash2,
  Edit3,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useAuthModal } from '../context/AuthModalContext';
import { gadgets } from '../data/gadgets';
import TrendingGadgetCard from '../components/ui/TrendingGadgetCard';
import StarRating from '../components/ui/StarRating';
import ReviewSubmissionModal from '../components/ui/ReviewSubmissionModal';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';

type TabType = 'dashboard' | 'reviews' | 'saved' | 'settings';

const ProfilePage: React.FC = () => {
  const { user, logout, openModal } = useAuthModal();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Mock User Stats
  const stats = [
    { label: 'Total Reviews', value: '45', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Helpful Votes', value: '1,204', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Saved Gadgets', value: '12', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Days Active', value: '284', icon: History, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  // Mock Saved Gadgets
  const savedGadgets = gadgets.slice(0, 3).map((p, i) => ({ ...p, _key: `saved-${p.id}-${i}` }));

  // Mock Published Reviews
  const [myReviews, setMyReviews] = useState([
    {
      id: 'mr1',
      GadgetName: 'Samsung Galaxy A54 5G',
      rating: 5,
      date: 'Oct 12, 2025',
      comment: 'Still the best mid-range I’ve used in Nigeria. The battery backup is simply unmatched for its price bracket.',
      helpful: 84,
      pros: ['Great battery', 'Smooth screen'],
      cons: ['Slow charging']
    },
    {
      id: 'mr2',
      GadgetName: 'Oraimo Freepods 4',
      rating: 4,
      date: 'Sept 5, 2025',
      comment: 'Love the ANC! Perfect for blocking out generator noise while working from home.',
      helpful: 12,
      pros: ['Active noise cancellation', 'Good bass'],
      cons: ['Bulky case']
    }
  ]);

  const [reviewSortBy, setReviewSortBy] = useState('newest');
  
  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const [bio, setBio] = useState('Tech reviewer and gadget enthusiast. I focus on real-world performance for the Nigerian market.');
  const [socialLinks, setSocialLinks] = useState([
    { platform: 'Twitter', url: 'https://twitter.com/effa_ojah' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/effa-ojah' },
    { platform: 'YouTube', url: 'https://youtube.com/@effa' }
  ]);

  const handleSocialChange = (index: number, field: string, value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setSocialLinks(newLinks);
  };

  const handleEditClick = (review: any) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (review: any) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateReview = (updatedData: any) => {
    setMyReviews(prev => prev.map(rev => 
      rev.id === selectedReview.id 
      ? { ...rev, ...updatedData, date: 'Updated Just Now' } 
      : rev
    ));
    setIsEditModalOpen(false);
    setSelectedReview(null);
  };

  const handleConfirmDelete = () => {
    setMyReviews(prev => prev.filter(rev => rev.id !== selectedReview.id));
    setIsDeleteModalOpen(false);
    setSelectedReview(null);
  };

  const sortedReviews = useMemo(() => {
    let result = [...myReviews];
    if (reviewSortBy === 'rating') return result.sort((a, b) => b.rating - a.rating);
    if (reviewSortBy === 'helpful') return result.sort((a, b) => b.helpful - a.helpful);
    // Sort by date (assuming parseable format for mock)
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [reviewSortBy]);

  if (!user) {
    return (
      <div className="profile-page bg-zinc-50/50 min-h-[70vh] flex flex-col items-center justify-center p-4">
         <div className="max-w-md w-full bg-white rounded-3xl p-12 text-center shadow-sm border border-zinc-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 rounded-full bg-zinc-50 flex items-center justify-center mx-auto mb-6 text-zinc-300">
               <UserIcon size={40} />
            </div>
            <h2 className="text-3xl font-black text-dark mb-4">Account Access</h2>
            <p className="text-muted font-medium mb-8">Login to manage your reviews, track your helpful votes, and see your saved gadgets.</p>
            <button 
              onClick={() => openModal('login')}
              className="primary-btn w-full py-4 shadow-lg"
            >
              Sign In to Account
            </button>
            <p className="mt-6 text-sm font-bold text-muted uppercase tracking-widest">
              Don't have an account? <button onClick={() => openModal('signup')} className="text-primary hover:underline">Join Now</button>
            </p>
         </div>
      </div>
    );
  }

  return (
    <div className="profile-page bg-zinc-50/30 pb-20">
      
      {/* Mobile Profile Header (Visible only on mobile/tablet) */}
      <div className="lg:hidden bg-white border-b border-zinc-100 pt-10 pb-6 text-center">
        <div className="container mx-auto px-4">
           <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-50 mx-auto mb-4 group shadow-sm">
              <img 
                 src="/img/featured/user-08.jpg" 
                 alt={user.name} 
                 className="w-full h-full object-cover"
              />
           </div>
           <h5 className="text-xl font-black text-dark mb-1">{user.name}</h5>
           <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-[2px]">
             <ShieldCheck size={14} /> Verified Reviewer
           </div>
        </div>
      </div>

      {/* Sticky Mobile Nav (Visible only on mobile/tablet) */}
      <div className="lg:hidden sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100 overflow-x-auto scrollbar-hide py-3">
        <nav className="flex items-center gap-1 px-4 min-w-max">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'reviews', label: 'Reviews', icon: MessageSquare, badge: myReviews.length },
            { id: 'saved', label: 'Saved', icon: Heart, badge: savedGadgets.length },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${
                activeTab === tab.id 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'text-muted hover:bg-zinc-50 hover:text-dark'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-lg border leading-none ${
                  activeTab === tab.id ? 'bg-white/20 border-white/20 text-white' : 'bg-zinc-100 border-zinc-100 text-muted'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <section className="container mx-auto px-4 mt-8 lg:mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation (Visible only on Desktop) */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden sticky top-24">
               {/* User Basic Info Header */}
               <div className="p-8 border-b border-zinc-50 flex flex-col items-center text-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-zinc-50 mb-4 group shadow-sm">
                     <img 
                        src="/img/featured/user-08.jpg" 
                        alt={user.name} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                     />
                     <div className="absolute inset-x-0 bottom-0 top-1/2 bg-black/40 flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition-colors">
                        <Camera size={18} />
                     </div>
                  </div>
                  <h5 className="text-xl font-black text-dark mb-1">{user.name}</h5>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-widest">
                    <ShieldCheck size={14} /> Verified Reviewer
                  </div>
               </div>

               {/* Nav Links */}
               <nav className="p-4 flex flex-col gap-1">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { id: 'reviews', label: 'My Reviews', icon: MessageSquare, badge: myReviews.length },
                    { id: 'saved', label: 'Saved Gadgets', icon: Heart, badge: savedGadgets.length },
                    { id: 'settings', label: 'Account Settings', icon: Settings },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all group ${
                        activeTab === tab.id 
                        ? 'bg-primary text-white shadow-md shadow-primary/20' 
                        : 'text-muted hover:bg-zinc-50 hover:text-dark'
                      }`}
                    >
                      <tab.icon size={18} className={`${activeTab === tab.id ? 'text-white' : 'text-zinc-400 group-hover:text-primary'}`} />
                      {tab.label}
                      {tab.badge !== undefined && (
                        <span className="ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-lg border">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  ))}

                  <div className="pt-4 mt-4 border-t border-zinc-50">
                    <button 
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all w-full"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
               </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-3/4 animate-in fade-in slide-in-from-right-4 duration-500">
             
             {/* DASHBOARD VIEW */}
             {activeTab === 'dashboard' && (
               <div className="flex flex-col gap-6 lg:gap-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                      <div key={i} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col gap-3">
                        <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                          <stat.icon size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-black text-dark">{stat.value}</span>
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest">{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Badges & Recent Review Highlight */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-3 bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
                       <h4 className="text-lg font-black text-dark mb-6 flex items-center gap-2">
                         <ShieldCheck className="text-primary" size={20} /> Your Achievements
                       </h4>
                       <div className="flex items-center gap-6 bg-zinc-50 p-6 rounded-2xl border border-zinc-100 border-dashed">
                          <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-2xl shadow-lg shrink-0 rotate-3">
                             <Star size={32} fill="white" />
                          </div>
                          <div className="flex flex-col">
                             <h6 className="font-black text-dark text-lg leading-tight mb-1">Top Gadget Guru</h6>
                             <p className="text-xs text-muted font-medium mb-3">You've reached <span className="text-primary font-bold">Level 4</span> contribution status.</p>
                             <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-3/4 rounded-full" />
                             </div>
                             <span className="text-[10px] font-black text-zinc-400 mt-2 uppercase tracking-widest">15 reviews until Level 5</span>
                          </div>
                       </div>
                    </div>

                    <div className="md:col-span-2 bg-[#121212] p-8 rounded-3xl text-white relative overflow-hidden flex flex-col justify-center min-h-[220px]">
                       <div className="absolute top-0 right-0 w-40 h-40 bg-primary/30 blur-[70px] rounded-full pointer-events-none" />
                       <h5 className="text-2xl lg:text-3xl font-black mb-3 leading-tight tracking-tight text-white">Nigeria's <br />Tech Voice</h5>
                       <p className="text-zinc-300 text-xs lg:text-sm font-medium mb-6">Your reviews have helped over <span className="text-primary font-bold">4,500</span> buyers this month.</p>
                       <Link to="/gadgets" className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:translate-x-1 transition-transform">
                         Browse more <ChevronRight size={14} />
                       </Link>
                    </div>
                  </div>
               </div>
             )}

              {/* REVIEWS VIEW */}
             {activeTab === 'reviews' && (
               <div className="flex flex-col gap-6">
                  <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-dark">My Reviews</h3>
                      <div className="text-xs font-black bg-zinc-50 px-3 py-1.5 rounded-lg text-muted uppercase tracking-widest inline-block mt-2">
                        {myReviews.length} Published
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-muted uppercase tracking-widest whitespace-nowrap">Sort by:</span>
                      <select 
                        value={reviewSortBy}
                        onChange={(e) => setReviewSortBy(e.target.value)}
                        className="bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-2.5 text-sm font-bold text-dark outline-none focus:border-primary transition-colors cursor-pointer"
                      >
                        <option value="newest">Newest First</option>
                        <option value="rating">Highest Rated</option>
                        <option value="helpful">Most Helpful</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {sortedReviews.map((rev) => (
                      <div key={rev.id} className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-100 shadow-sm group">
                        <div className="flex flex-col md:flex-row gap-6">
                           <div className="md:w-1/4">
                              <span className="text-[10px] font-black text-primary uppercase tracking-[2px] block mb-1">{rev.date}</span>
                              <h4 className="font-black text-dark leading-tight mb-3 group-hover:text-primary transition-colors cursor-pointer">{rev.GadgetName}</h4>
                              <StarRating rating={rev.rating} size={14} />
                           </div>
                           <div className="md:w-3/4 flex flex-col gap-4">
                              <p className="text-sm font-medium text-muted leading-relaxed  border-l-2 border-zinc-100 pl-4">"{rev.comment}"</p>
                              <div className="flex items-center justify-between pt-4 border-t border-zinc-50 mt-auto">
                                 <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">👍 {rev.helpful} helpful votes</span>
                                 <div className="flex items-center gap-3">
                                    <button 
                                      onClick={() => handleEditClick(rev)}
                                      className="p-2 text-zinc-400 hover:text-dark transition-colors"
                                    >
                                      <Edit3 size={16} />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteClick(rev)}
                                      className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
             )}

             {/* SAVED ITEMS VIEW */}
             {activeTab === 'saved' && (
               <div className="flex flex-col gap-6">
                  <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
                     <h3 className="text-2xl font-black text-dark">Watchlist</h3>
                     <p className="text-muted font-medium text-sm mt-1">Found something interesting? Keep track of it here.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {savedGadgets.map((gadget) => (
                      <div key={gadget._key} className="relative">
                         <TrendingGadgetCard gadget={gadget} />
                         <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-10 scale-90 md:scale-100">
                           <Trash2 size={18} />
                         </button>
                      </div>
                    ))}
                  </div>
               </div>
             )}

             {/* SETTINGS VIEW */}
             {activeTab === 'settings' && (
               <div className="flex flex-col gap-8">
                  <div className="bg-white p-10 rounded-3xl border border-zinc-100 shadow-sm overflow-hidden relative">
                     <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none scale-150">
                        <UserIcon size={240} />
                     </div>
                     <h3 className="text-2xl font-black text-dark mb-2">Account Settings</h3>
                     <p className="text-muted font-medium text-sm mb-10 border-b pb-8">Update your personal information and preferences.</p>

                     <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Full Name</label>
                           <input type="text" defaultValue={user.name} className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Email Address</label>
                           <input type="email" defaultValue={user.email} className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Phone Number</label>
                           <input type="text" defaultValue="+234 800 123 4567" className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all" />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Location</label>
                           <input type="text" defaultValue="Lagos, Nigeria" className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all" />
                        </div>
                        
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Professional Bio</label>
                            <textarea 
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              rows={3}
                              placeholder="Tell the community about your tech expertise..."
                              className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all resize-none"
                            />
                         </div>

                         <div className="md:col-span-2 mt-4">
                            <div className="flex items-center justify-between mb-6">
                               <h4 className="text-sm font-black text-dark uppercase tracking-[2px]">Your Tech Presence (3 Max)</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                               {socialLinks.map((link, idx) => (
                                 <div key={idx} className="flex flex-col gap-3 p-5 bg-zinc-50 border border-zinc-100 rounded-2xl">
                                    <select 
                                      value={link.platform}
                                      onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                                      className="bg-white border border-zinc-200 text-xs font-black uppercase tracking-widest px-3 py-2 rounded-lg outline-none focus:border-primary cursor-pointer text-dark"
                                    >
                                       <option value="Twitter">Twitter / X</option>
                                       <option value="LinkedIn">LinkedIn</option>
                                       <option value="YouTube">YouTube</option>
                                       <option value="Instagram">Instagram</option>
                                       <option value="Facebook">Facebook</option>
                                       <option value="Reddit">Reddit</option>
                                       <option value="TikTok">TikTok</option>
                                       <option value="Github">GitHub</option>
                                    </select>
                                    <input 
                                       type="text" 
                                       value={link.url}
                                       onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                                       placeholder="Profile URL"
                                       className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg outline-none focus:border-primary text-xs font-bold text-dark transition-all shadow-sm"
                                    />
                                 </div>
                               ))}
                            </div>
                         </div>

                        <div className="md:col-span-2 pt-4 flex gap-4">
                           <button type="submit" className="bg-dark text-white px-10 py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-primary transition-colors">Save Profile</button>
                           <button type="button" className="bg-zinc-100 text-dark px-10 py-4 rounded-xl font-bold text-sm transition-colors hover:bg-zinc-200">Change Password</button>
                        </div>
                     </form>
                  </div>

                   {/* Verification & Badges Section */}
                   <div className="bg-white p-10 rounded-3xl border border-zinc-100 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                         <div>
                            <h4 className="text-xl font-black text-dark flex items-center gap-2">
                               <ShieldCheck className="text-primary" size={22} /> Verification & Badges
                            </h4>
                            <p className="text-muted text-sm font-medium mt-1">Build your reputation and unlock exclusive community perks.</p>
                         </div>
                         {!isVerificationRequested ? (
                            <button 
                              onClick={() => setIsVerificationRequested(true)}
                              className="px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-black uppercase tracking-widest text-dark hover:bg-zinc-100 transition-all flex items-center gap-2"
                            >
                              Request Verification
                            </button>
                         ) : (
                            <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                               <CheckCircle2 size={16} /> Request Pending
                            </div>
                         )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {/* Requirement 1 */}
                         <div className="flex items-start gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                               <CheckCircle2 size={20} />
                            </div>
                            <div>
                               <h5 className="text-sm font-bold text-dark mb-1">Email Verified</h5>
                               <p className="text-xs text-muted font-medium leading-relaxed">Your account is secured and verified via email.</p>
                            </div>
                         </div>

                         {/* Requirement 2 */}
                         <div className="flex items-start gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <div className="w-10 h-10 rounded-xl bg-zinc-200 text-zinc-400 flex items-center justify-center shrink-0">
                               <CheckCircle2 size={20} />
                            </div>
                            <div className="flex-grow">
                               <div className="flex justify-between items-center mb-1">
                                  <h5 className="text-sm font-bold text-dark">Helpful Votes</h5>
                                  <span className="text-[10px] font-black text-primary">8/10</span>
                                </div>
                               <p className="text-xs text-muted font-medium leading-relaxed mb-3">Earn 10 "Helpful" votes from the community.</p>
                               <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                                  <div className="bg-primary h-full rounded-full" style={{ width: '80%' }}></div>
                               </div>
                            </div>
                         </div>

                         {/* Requirement 3 */}
                         <div className="flex items-start gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                               <CheckCircle2 size={20} />
                            </div>
                            <div>
                               <h5 className="text-sm font-bold text-dark mb-1">Detailed Reviews</h5>
                               <p className="text-xs text-muted font-medium leading-relaxed">You have posted 5+ high-quality technical reviews.</p>
                            </div>
                         </div>

                         {/* Requirement 4 */}
                         <div className="flex items-start gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 opacity-60">
                            <div className="w-10 h-10 rounded-xl bg-zinc-200 text-zinc-400 flex items-center justify-center shrink-0">
                               <Info size={20} />
                            </div>
                            <div>
                               <h5 className="text-sm font-bold text-dark mb-1">Account Age</h5>
                               <p className="text-xs text-muted font-medium leading-relaxed">Accounts must be at least 3 months old to be verified.</p>
                            </div>
                         </div>
                      </div>
                   </div>
               </div>
             )}

          </main>
        </div>
      </section>

      {/* Edit Review Modal */}
      {selectedReview && (
        <ReviewSubmissionModal 
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedReview(null);
          }}
          GadgetName={selectedReview.GadgetName}
          initialData={{
            rating: selectedReview.rating,
            title: selectedReview.title || '',
            comment: selectedReview.comment,
            pros: selectedReview.pros || [],
            cons: selectedReview.cons || []
          }}
          onSubmit={handleUpdateReview}
        />
      )}

      {/* Delete Confirmation Modal */}
      {selectedReview && (
        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedReview(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Review?"
          itemName={selectedReview.GadgetName}
        />
      )}
    </div>
  );
};

export default ProfilePage;
