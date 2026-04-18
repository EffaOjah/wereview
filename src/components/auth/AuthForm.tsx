import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import { useAuthModal, type AuthView } from '../../context/AuthModalContext';

interface AuthFormProps {
  initialView?: AuthView;
  onSuccess?: () => void;
  // Optional route change handler instead of in-form toggle
  onNavigate?: (view: AuthView) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ initialView = 'login', onSuccess, onNavigate }) => {
  const [view, setView] = useState<AuthView>(initialView);
  const { login } = useAuthModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Providing mock user data for simulation
    login({ name: 'Ayobami John', email: 'john@example.com' });
    if (onSuccess) onSuccess();
  };

  const handleToggleView = (newView: AuthView) => {
    if (onNavigate) {
      onNavigate(newView);
    } else {
      setView(newView);
    }
  };

  return (
    <div className="w-full flex md:flex-row flex-col max-w-4xl bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
      
      {/* Decorative Branding Sidebar */}
      <div className="hidden md:flex flex-col w-2/5 bg-zinc-900 text-white p-12 relative overflow-hidden shrink-0">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#e85d2c]/20 to-transparent pointer-events-none" />
         
         <div className="relative z-10 flex flex-col h-full justify-between">
           <div>
             <h2 className="text-3xl font-black tracking-tight text-white mb-2">Reviews Zone</h2>
             <span className="text-[#e85d2c] text-sm font-bold uppercase tracking-widest border-b border-[#e85d2c]/50 pb-1 inline-block">Join The Club</span>
           </div>

           <div className="flex flex-col gap-6 mt-12 mb-auto">
             <div className="flex flex-col">
               <span className="text-4xl font-black text-white/10 mb-[-10px] select-none">01</span>
               <h4 className="text-lg font-bold text-white relative z-10">Rate Products</h4>
               <p className="text-zinc-400 text-xs font-medium mt-1 leading-relaxed">Share your honest experiences with thousands of other tech enthusiasts.</p>
             </div>
             <div className="flex flex-col">
               <span className="text-4xl font-black text-white/10 mb-[-10px] select-none">02</span>
               <h4 className="text-lg font-bold text-white relative z-10">Bookmark Guides</h4>
               <p className="text-zinc-400 text-xs font-medium mt-1 leading-relaxed">Save your favorite reviews and spec comparisons for later reading.</p>
             </div>
           </div>

           <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
             <p className="text-xs text-zinc-500 font-medium">By authenticating, you agree to our <a href="#" className="text-[#e85d2c] hover:underline">Terms of Service</a> & <a href="#" className="text-[#e85d2c] hover:underline">Privacy Policy</a>.</p>
           </div>
         </div>
      </div>

      {/* Main Form Content */}
      <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col bg-white">
        <h3 className="text-2xl md:text-3xl font-black text-dark mb-2 leading-tight">
          {view === 'login' ? 'Welcome Back!' : 'Create Account'}
        </h3>
        <p className="text-muted text-sm font-medium mb-8">
          {view === 'login' ? 'Sign in to review products and manage your profile.' : 'Sign up to drop reviews and join our tech community.'}
        </p>

        {/* Google Mockup Button */}
        <button 
          type="button"
          onClick={handleSubmit}
          className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100 rounded-xl transition-all shadow-sm group font-bold text-sm text-dark mb-6"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 w-full mb-6">
          <div className="h-px bg-zinc-100 flex-1" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">OR EMAIL</span>
          <div className="h-px bg-zinc-100 flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          {view === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
               {/* First Name */}
               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-dark uppercase tracking-widest">First Name</label>
                 <div className="relative">
                   <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                   <input type="text" placeholder="John" className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm font-medium" />
                 </div>
               </div>
               
               {/* Last Name */}
               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-dark uppercase tracking-widest">Last Name</label>
                 <div className="relative">
                   <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                   <input type="text" placeholder="Doe" className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm font-medium" />
                 </div>
               </div>
            </div>
          )}

          {/* Email Address */}
          <div className="flex flex-col gap-2">
             <label className="text-[10px] font-black text-dark uppercase tracking-widest">Email Address</label>
             <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
               <input type="email" placeholder="hello@example.com" className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm font-medium" />
             </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
             <div className="flex justify-between items-center">
               <label className="text-[10px] font-black text-dark uppercase tracking-widest">Password</label>
               {view === 'login' && (
                 <span className="text-[10px] font-bold text-primary hover:underline cursor-pointer">Forgot?</span>
               )}
             </div>
             <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
               <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm font-medium" />
             </div>
          </div>

          <button type="submit" className="flex items-center justify-center gap-2 w-full py-4 bg-dark text-white hover:bg-primary font-bold text-sm rounded-xl transition-colors shadow-lg mt-2">
            {view === 'login' ? (
              <><LogIn size={18} /> Sign In</>
            ) : (
              <><UserPlus size={18} /> Create Account</>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-muted">
            {view === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => handleToggleView(view === 'login' ? 'signup' : 'login')}
              className="text-primary font-black hover:underline"
            >
              {view === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>

    </div>
  );
};

export default AuthForm;
