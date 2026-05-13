import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Globe, 
  MessageSquare, 
  TrendingUp,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import StarRating from '../components/ui/StarRating';
import { getApiUrl } from '../utils/api';
import { getImageUrl } from '../utils/image';

const PublicProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(getApiUrl(`/api/users/${userId}`));
        const data = await res.json();
        if (data.success) {
          setProfile(data.data);
          setError(null);
        } else {
          setError(data.message || 'User not found');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [userId]);

  const userData = profile;
  const userReviews = profile?.reviews || [];

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

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-zinc-50/30 py-24 px-4 text-center">
        <div className="container max-w-md mx-auto">
           <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-zinc-100 flex items-center justify-center mx-auto mb-8 text-4xl">
             🔍
           </div>
           <h2 className="text-3xl font-black text-dark mb-4">{error || 'User Not Found'}</h2>
           <p className="text-muted font-bold mb-10">We couldn't find the tech expert you're looking for. They might have changed their username or left the community.</p>
           <Link to="/reviews" className="primary-btn px-10 py-4 inline-flex items-center gap-3">
             <ArrowLeft size={20} /> Back to Community
           </Link>
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
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-zinc-100 flex flex-col items-center text-center relative overflow-hidden mb-8">
             {/* Decorative Background Element */}
             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent -z-10" />

             {/* User Header */}
             <div className="relative mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-zinc-50 group">
                   <img 
                    src={userData.avatar ? getImageUrl(userData.avatar) : `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=0066ff&color=fff&bold=true&size=150`} 
                    alt={userData.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                  />
                </div>
                {userData.isVerified && (
                  <div className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
                    <ShieldCheck size={20} fill="currentColor" />
                  </div>
                )}
             </div>

             <h1 className="text-3xl md:text-5xl font-black text-dark mb-4 flex items-center gap-3">
                {userData.name}
             </h1>

             <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-muted mb-8">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-primary" /> {userData.location || 'Nigeria'}</span>
                <span className="flex items-center gap-1.5"><Calendar size={16} className="text-primary" /> Joined {new Date(userData.joinDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5"><MessageSquare size={16} className="text-primary" /> {userReviews.length} Reviews</span>
             </div>

             <p className="max-w-2xl text-lg text-muted font-medium leading-relaxed mb-10 italic">
                "{userData.bio || `Tech enthusiast and GadgetHub member since ${new Date(userData.joinDate).getFullYear()}.`}"
             </p>

             <div className="flex flex-wrap items-center justify-center gap-4">
                {userData.techPresence && (
                  <a 
                    href={userData.techPresence} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black bg-white border border-zinc-200 text-dark hover:text-primary hover:border-primary transition-all shadow-sm transform hover:-translate-y-1"
                  >
                     <Globe size={20} /> Visit Tech Presence
                  </a>
                )}
             </div>
          </div>

          {/* User Reviews Section */}
          <div className="flex flex-col gap-8">
             <div className="flex items-center justify-between px-4">
                <h3 className="text-2xl font-black text-dark">Expert Reviews</h3>
                <span className="text-sm font-bold text-muted bg-white px-4 py-2 rounded-full border border-zinc-100">{userReviews.length} Total Contributions</span>
             </div>

             {userReviews.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {userReviews.map((review: any) => {
                   const gadget = review.gadget;
                   return (
                     <div key={review.id} className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 hover:border-primary/20 transition-all group flex flex-col">
                        <div className="flex items-start justify-between mb-6">
                           <div className="flex flex-col">
                              <StarRating rating={review.rating} size={16} />
                              <span className="text-[10px] font-black text-muted uppercase tracking-widest mt-2 block">Published on {new Date(review.createdAt).toLocaleDateString()}</span>
                           </div>
                           <ShieldCheck size={24} className="text-zinc-100" />
                        </div>
                        
                        <h4 className="text-xl font-black text-dark mb-4 leading-tight group-hover:text-primary transition-colors">
                           {review.title || `Review for ${gadget?.name}`}
                        </h4>
                        
                        <p className="text-muted font-medium text-sm leading-relaxed mb-8 line-clamp-4 italic">
                           "{review.comment}"
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-zinc-50 mt-auto">
                           <span className="flex items-center gap-1.5 text-[10px] font-black text-muted uppercase tracking-widest">
                              <TrendingUp size={14} className="text-primary" /> {review.helpfulCount || 0} Helpful Votes
                           </span>
                           <Link to={`/gadgets/${gadget?.slug || gadget?.id}#review-${review.id}`} className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 hover:translate-x-1 transition-transform">
                              {gadget?.name} <ArrowRight size={10} />
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
