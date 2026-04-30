import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Globe, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  UserPlus, 
  UserCheck,
  Calendar,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { reviews, gadgets } from '../data/gadgets';
import StarRating from '../components/ui/StarRating';

// Brand Icons mapping (High-fidelity SVGs)
const SocialIcon = ({ platform, size = 20 }: { platform: string; size?: number }) => {
  const icons: Record<string, React.ReactElement> = {
    'Facebook': <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>,
    'YouTube': <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    'Instagram': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
    'LinkedIn': <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
    'Twitter': <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    'Reddit': <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.966 0 1.75.784 1.75 1.75 0 .966-.784 1.75-1.75 1.75-.19 0-.375-.031-.552-.088-.051 2.491-2.45 4.496-5.392 4.496-2.943 0-5.343-2.005-5.393-4.496-.176.057-.36.088-.551.088-.966 0-1.75-.784-1.75-1.75 0-.966.784-1.75 1.75-1.75.478 0 .9.182 1.208.491 1.191-.854 2.844-1.415 4.665-1.487l.887-4.148 3.476.732c-.004.053-.007.107-.007.162zm-7.922 7.749c-.642 0-1.162.52-1.162 1.162s.52 1.162 1.162 1.162c.642 0 1.162-.52 1.162-1.162s-.52-1.162-1.162-1.162zm5.824 0c-.642 0-1.162.52-1.162 1.162s.52 1.162 1.162 1.162c.642 0 1.162-.52 1.162-1.162s-.52-1.162-1.162-1.162zm-6.57 3.407a5.572 5.572 0 0 0 3.655 1.488 5.577 5.577 0 0 0 3.655-1.488.243.243 0 0 1 .343.344c-.751.752-2.016 1.348-3.998 1.348-1.983 0-3.247-.596-3.998-1.348a.243.243 0 0 1 .343-.344z"/></svg>,
    'TikTok': <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.3a2.91 2.91 0 0 0-1.44 2.62c-.03.7.25 1.4.77 1.88.58.55 1.39.81 2.2.8.69-.02 1.36-.28 1.84-.78.7-.71 1.05-1.74 1.03-2.73 0-3.98.01-7.96.01-11.94z"/></svg>,
    'Github': <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.011-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.509 11.509 0 0 1 3.003-.404c1.018.005 2.041.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  };

  return icons[platform] || <Globe size={size} />;
};

const PublicProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [userId]);

  const userData = useMemo(() => {
    const name = userId?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Tech Enthusiast';
    return {
      name,
      id: userId,
      avatar: `/img/featured/user-0${Math.floor(Math.random() * 8) + 1}.jpg`,
      location: 'Lagos, Nigeria',
      bio: userId === 'effa-ojah' 
        ? 'Tech reviewer and gadget enthusiast. I focus on real-world performance for the Nigerian market.' 
        : 'Passionate about mobile photography and high-performance laptops. Sharing honest takes on tech in Nigeria.',
      joined: 'Jan 2024',
      isVerified: userId === 'chinedu-eze' || userId === 'amina-bello' || userId === 'effa-ojah',
      followers: 1240,
      following: 180,
      totalHelpful: 4500,
      // Dynamic socials based on platform selection logic
      socials: [
        { platform: 'Twitter', url: 'https://twitter.com' },
        { platform: 'LinkedIn', url: 'https://linkedin.com' },
        { platform: 'YouTube', url: 'https://youtube.com' }
      ]
    };
  }, [userId]);

  const userReviews = useMemo(() => {
    return reviews.filter(r => r.authorId === userId);
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50/30 py-12 px-4 animate-pulse">
        <div className="container max-w-5xl">
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-zinc-100 flex flex-col items-center gap-6 mb-12">
            <div className="w-32 h-32 rounded-full bg-zinc-200" />
            <div className="w-48 h-10 bg-zinc-200 rounded-lg" />
            <div className="w-full max-w-lg h-6 bg-zinc-100 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-zinc-200 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="public-profile-page bg-zinc-50/30 pb-24 pt-10 min-h-screen">
      <div className="container">
        
        {/* Back Navigation */}
        <Link to="/reviews" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary transition-colors mb-8">
           <ArrowLeft size={16} /> Back to Community Reviews
        </Link>

        <div className="flex flex-col gap-12">
          
          {/* Profile Header Card */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-zinc-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none transform translate-x-12 -translate-y-12">
               <ShieldCheck size={400} />
             </div>

             <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10">
                {/* Avatar Area */}
                <div className="relative group">
                   <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-zinc-50 shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                      <img 
                        src={userData.avatar} 
                        alt={userData.name} 
                        className="w-full h-full object-cover" 
                      />
                   </div>
                   {userData.isVerified && (
                     <div className="absolute bottom-2 right-2 bg-primary text-white p-2.5 rounded-full border-4 border-white shadow-lg">
                        <ShieldCheck size={20} />
                     </div>
                   )}
                </div>

                {/* Info Area */}
                <div className="flex-grow flex flex-col items-center lg:items-start text-center lg:text-left">
                   <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                      <h1 className="text-4xl font-black text-dark tracking-tight">{userData.name}</h1>
                      {userData.isVerified && (
                        <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[2px] flex items-center gap-2">
                           Verified Voice
                        </span>
                      )}
                   </div>

                   <p className="max-w-xl text-muted font-medium text-lg leading-relaxed mb-8">
                     {userData.bio}
                   </p>

                   <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-bold text-muted">
                      <span className="flex items-center gap-2">
                        <MapPin size={18} className="text-primary" /> {userData.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar size={18} className="text-primary" /> Joined {userData.joined}
                      </span>
                      <div className="flex items-center gap-3 ml-4 border-l pl-6 border-zinc-100">
                         {userData.socials.map((social, idx) => (
                           <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-zinc-50 text-dark hover:bg-primary hover:text-white transition-all shadow-sm flex items-center justify-center">
                              <SocialIcon platform={social.platform} />
                           </a>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Follow Button Area */}
                <div className="flex flex-col gap-4 min-w-[220px]">
                   <button 
                     onClick={() => setIsFollowing(!isFollowing)}
                     className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                       isFollowing 
                       ? 'bg-zinc-100 text-muted shadow-inner' 
                       : 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95'
                     }`}
                   >
                     {isFollowing ? (
                       <><UserCheck size={20} /> Following</>
                     ) : (
                       <><UserPlus size={20} /> Follow Voice</>
                     )}
                   </button>
                   <div className="flex items-center justify-between px-6 py-3 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <div className="flex flex-col text-center">
                         <span className="text-sm font-black text-dark">{userData.followers.toLocaleString()}</span>
                         <span className="text-[10px] font-black text-muted uppercase tracking-widest leading-none mt-1">Followers</span>
                      </div>
                      <div className="w-px h-6 bg-zinc-200" />
                      <div className="flex flex-col text-center">
                         <span className="text-sm font-black text-dark">{userData.totalHelpful.toLocaleString()}</span>
                         <span className="text-[10px] font-black text-muted uppercase tracking-widest leading-none mt-1">Helpful</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* User Review History */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
               <div>
                 <h3 className="text-2xl font-black text-dark">Impact & Reviews</h3>
                 <p className="text-sm text-muted font-medium mt-1">A timeline of our expert's technical contributions.</p>
               </div>
               <div className="text-xs font-black bg-zinc-100 px-4 py-2 rounded-xl text-muted uppercase tracking-widest">
                  {userReviews.length} Published Reviews
               </div>
            </div>

            {userReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {userReviews.map((review) => {
                  const gadget = gadgets.find(p => p.id === review.GadgetId);
                  return (
                    <div key={review.id} className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm flex flex-col gap-6 group hover:translate-y-[-4px] transition-all duration-300">
                       <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 bg-zinc-50 p-2 rounded-2xl flex items-center justify-center border border-zinc-100">
                                <img src={gadget?.image} alt={gadget?.name} className="max-w-full max-h-full object-contain" />
                             </div>
                             <div>
                                <h4 className="font-black text-dark leading-tight line-clamp-1">{gadget?.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                   <StarRating rating={review.rating} size={12} />
                                   <span className="text-[11px] font-bold text-muted">{review.date}</span>
                                </div>
                             </div>
                          </div>
                       </div>

                       {review.title && <h5 className="text-lg font-black text-dark leading-tight">{review.title}</h5>}
                       
                       <div className="relative">
                          <p className="text-sm text-muted font-medium leading-relaxed  border-l-2 border-zinc-100 pl-4 py-1">
                            "{review.comment}"
                          </p>
                       </div>

                       <div className="flex items-center justify-between pt-6 border-t border-zinc-50 mt-auto">
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-muted uppercase tracking-widest">
                             <TrendingUp size={14} className="text-primary" /> {review.helpfulCount || 0} Helpful Votes
                          </span>
                          <Link to={`/gadgets/${gadget?.id}`} className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 hover:translate-x-1 transition-transform">
                             Read Full <ChevronRight size={14} />
                          </Link>
                       </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border border-zinc-100 border-dashed">
                 <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-300">
                    <MessageSquare size={40} />
                 </div>
                 <h4 className="text-xl font-black text-dark mb-2">No Reviews Yet</h4>
                 <p className="text-muted font-bold text-sm">This reviewer hasn't shared their expert voice yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;

