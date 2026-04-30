import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../utils/api';
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
import StarRating from '../components/ui/StarRating';
import ReviewSubmissionModal from '../components/ui/ReviewSubmissionModal';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';

type TabType = 'dashboard' | 'reviews' | 'saved' | 'settings';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, login: updateLocalUser } = useAuthModal();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [myReviews, setMyReviews] = useState<any[]>([]);

  // Form State for Settings
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    location: '',
    bio: '',
    techPresence: ''
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('gadgethub_token');
      console.log('ProfilePage: Attempting fetch with token:', !!token);
      
      if (!token) {
        // Short delay to allow localStorage to settle after login redirect
        setTimeout(async () => {
          const retryToken = localStorage.getItem('gadgethub_token');
          if (retryToken) {
            console.log('ProfilePage: Token found on retry');
            executeFetch(retryToken);
          } else {
            console.warn('ProfilePage: No token found after retry');
            setIsLoading(false);
          }
        }, 100);
        return;
      }

      executeFetch(token);
    };

    const executeFetch = async (authToken: string) => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('ProfilePage: Fetching live data...');
        const [profileRes, reviewsRes] = await Promise.all([
          fetch(getApiUrl('/api/users/profile'), {
            headers: { Authorization: `Bearer ${authToken}` }
          }).then(r => r.json()),
          fetch(getApiUrl('/api/users/reviews'), {
            headers: { Authorization: `Bearer ${authToken}` }
          }).then(r => r.json())
        ]);

        if (profileRes.success) {
          console.log('ProfilePage: Profile data loaded');
          setProfile(profileRes.data);
          setFormData({
            name: profileRes.data?.name || '',
            email: profileRes.data?.email || '',
            phoneNumber: profileRes.data?.phoneNumber || '',
            location: profileRes.data?.location || '',
            bio: profileRes.data?.bio || '',
            techPresence: profileRes.data?.techPresence || ''
          });
        } else {
          console.error('ProfilePage: API success false', profileRes.message);
          setError(profileRes.message || 'Failed to load profile data');
        }

        if (reviewsRes?.success) {
          setMyReviews(reviewsRes.data || []);
        }
      } catch (err) {
        console.error('ProfilePage: Fetch error', err);
        setError('Connection error while loading profile.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user || localStorage.getItem('gadgethub_token')) {
      fetchProfileData();
    } else {
      console.log('ProfilePage: No user/token in context, stopping load');
      setIsLoading(false);
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('gadgethub_token');
    if (!token) return;

    setIsUpdating(true);
    setUpdateSuccess(false);
    setError(null);

    try {
      const res = await fetch(getApiUrl('/api/users/profile'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setProfile((prev: any) => ({ ...prev, ...data.data }));
        // Also update the context user so the Navbar updates
        updateLocalUser({ ...user, ...data.data });
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } else {
        setError(data.message || 'Update failed');
      }
    } catch (err) {
      setError('Network error updating profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const stats = useMemo(() => {
    // Defensive check to prevent NaN or crashes if joinDate is invalid
    const joinDate = profile?.joinDate ? new Date(profile.joinDate) : null;
    const daysActive = joinDate && !isNaN(joinDate.getTime()) 
      ? Math.max(0, Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

    return [
      { label: 'Total Reviews', value: myReviews.length.toString(), icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
      { label: 'Helpful Votes', value: myReviews.reduce((acc, r: any) => acc + (r.helpfulCount || 0), 0).toString(), icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { label: 'Saved Gadgets', value: '0', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
      { label: 'Days Active', value: daysActive.toString(), icon: History, color: 'text-blue-500', bg: 'bg-blue-50' },
    ];
  }, [myReviews, profile]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [reviewSortBy, setReviewSortBy] = useState('newest');

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
      ? { ...rev, ...updatedData } 
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
    if (reviewSortBy === 'helpful') return result.sort((a, b) => b.helpfulCount - a.helpfulCount);
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [myReviews, reviewSortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted font-bold animate-pulse text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
           <UserIcon size={40} />
        </div>
        <h3 className="text-xl font-black text-dark mb-2">Profile Not Found</h3>
        <p className="text-muted text-sm max-w-xs mb-8">{error || "We couldn't retrieve your profile information. Please try signing in again."}</p>
        <div className="flex gap-4">
          <button onClick={() => window.location.reload()} className="px-6 py-3 bg-dark text-white rounded-xl font-bold text-sm">Try Again</button>
          <button onClick={() => { navigate('/', { replace: true }); logout(); }} className="px-6 py-3 bg-zinc-200 text-dark rounded-xl font-bold text-sm">Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page bg-zinc-50/30 pb-20">
      
      {/* Mobile Profile Header (Visible only on mobile/tablet) */}
      <div className="lg:hidden bg-white border-b border-zinc-100 pt-10 pb-6 text-center">
        <div className="container">
           <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-50 mx-auto mb-4 group shadow-sm">
              <img 
                 src={profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'User')}&background=0066ff&color=fff&bold=true&size=150`} 
                 alt={profile?.name} 
                 className="w-full h-full object-cover"
              />
           </div>
           <h5 className="text-xl font-black text-dark mb-1">{profile?.name}</h5>
           {profile?.isVerified && (
             <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-[2px]">
               <ShieldCheck size={14} /> Verified Reviewer
             </div>
           )}
        </div>
      </div>

      {/* Sticky Mobile Nav (Visible only on mobile/tablet) */}
      <div className="lg:hidden sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100 overflow-x-auto scrollbar-hide py-3">
        <nav className="flex items-center gap-1 px-4 min-w-max">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'reviews', label: 'Reviews', icon: MessageSquare, badge: myReviews.length },
            { id: 'saved', label: 'Saved', icon: Heart, badge: 0 },
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

      <section className="container mt-8 lg:mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation (Visible only on Desktop) */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden sticky top-24">
               {/* User Basic Info Header */}
               <div className="p-8 border-b border-zinc-50 flex flex-col items-center text-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-zinc-50 mb-4 group shadow-sm">
                     <img 
                        src={profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || 'User')}&background=0066ff&color=fff&bold=true&size=150`} 
                        alt={profile?.name} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                     />
                     <div className="absolute inset-x-0 bottom-0 top-1/2 bg-black/40 flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition-colors">
                        <Camera size={18} />
                     </div>
                  </div>
                  <h5 className="text-xl font-black text-dark mb-1">{profile?.name}</h5>
                  {profile?.isVerified && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-widest">
                      <ShieldCheck size={14} /> Verified Reviewer
                    </div>
                  )}
               </div>

               {/* Nav Links */}
               <nav className="p-4 flex flex-col gap-1">
                  {[
                     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                     { id: 'reviews', label: 'My Reviews', icon: MessageSquare, badge: myReviews.length },
                     { id: 'saved', label: 'Saved Gadgets', icon: Heart, badge: 0 },
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
                              <span className="text-[10px] font-black text-primary uppercase tracking-[2px] block mb-1">{new Date(rev.createdAt).toLocaleDateString()}</span>
                              <h4 className="font-black text-dark leading-tight mb-3 group-hover:text-primary transition-colors cursor-pointer">{rev.gadget?.name}</h4>
                              <StarRating rating={rev.rating} size={14} />
                           </div>
                           <div className="md:w-3/4 flex flex-col gap-4">
                              <p className="text-sm font-medium text-muted leading-relaxed  border-l-2 border-zinc-100 pl-4">"{rev.comment}"</p>
                              <div className="flex items-center justify-between pt-4 border-t border-zinc-50 mt-auto">
                                 <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">👍 {rev.helpfulCount || 0} helpful votes</span>
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

                  <div className="flex items-center justify-center py-20 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                     <p className="text-muted font-bold">You haven't saved any gadgets yet.</p>
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

                      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Full Name</label>
                           <input 
                            type="text" 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all" 
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Email Address</label>
                           <input 
                            type="email" 
                            value={formData.email} 
                            disabled
                            className="w-full px-5 py-3.5 bg-zinc-100 border border-zinc-100 rounded-xl outline-none text-sm font-bold text-zinc-500 cursor-not-allowed" 
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Phone Number</label>
                           <input 
                            type="text" 
                            value={formData.phoneNumber} 
                            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                            className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all" 
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Location</label>
                           <input 
                            type="text" 
                            value={formData.location} 
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all" 
                           />
                        </div>
                        
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Professional Bio</label>
                            <textarea 
                              value={formData.bio}
                              onChange={(e) => setFormData({...formData, bio: e.target.value})}
                              rows={3}
                              placeholder="Tell the community about your tech expertise..."
                              className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all resize-none"
                            />
                         </div>


                          <div className="md:col-span-2 mt-4">
                             <div className="flex items-center justify-between mb-6">
                                <h4 className="text-sm font-black text-dark uppercase tracking-[2px]">Your Tech Presence</h4>
                             </div>
                             <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-dark uppercase tracking-widest pl-2">Portfolio / GitHub / Social URL</label>
                                <input 
                                  type="text" 
                                  value={formData.techPresence}
                                  onChange={(e) => setFormData({...formData, techPresence: e.target.value})}
                                  placeholder="https://github.com/yourusername"
                                  className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white text-sm font-bold text-dark transition-all" 
                                />
                             </div>
                          </div>

                        <div className="md:col-span-2 pt-4 flex flex-col gap-4">
                           {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                           {updateSuccess && <p className="text-emerald-500 text-xs font-bold">Profile updated successfully!</p>}
                           <div className="flex gap-4">
                            <button 
                              type="submit" 
                              disabled={isUpdating}
                              className="bg-dark text-white px-10 py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-primary transition-colors disabled:bg-zinc-400"
                            >
                              {isUpdating ? 'Saving...' : 'Save Profile'}
                            </button>
                            <button type="button" className="bg-zinc-100 text-dark px-10 py-4 rounded-xl font-bold text-sm transition-colors hover:bg-zinc-200">Change Password</button>
                           </div>
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
                         {profile?.isVerified ? (
                            <div className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                               <CheckCircle2 size={16} /> Verified Account
                            </div>
                         ) : (
                            <button 
                              onClick={() => setUpdateSuccess(true)}
                              className="px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-black uppercase tracking-widest text-dark hover:bg-zinc-100 transition-all flex items-center gap-2"
                            >
                              Request Verification
                            </button>
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
