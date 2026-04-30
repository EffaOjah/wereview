import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { useAuthModal, type AuthView } from '../../context/AuthModalContext';
import { getApiUrl } from '../../utils/api';

interface AuthFormProps {
  initialView?: AuthView;
  onSuccess?: () => void;
  onNavigate?: (view: AuthView) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ initialView = 'login', onSuccess, onNavigate }) => {
  const [view, setView] = useState<AuthView>(initialView);
  const { login } = useAuthModal();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = view === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = view === 'login' 
      ? { email, password }
      : { name: `${firstName} ${lastName}`.trim(), email, password };

    try {
      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login(data.data.user, data.data.accessToken);
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleView = (newView: AuthView) => {
    setError(null);
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
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
         
         <div className="relative z-10 flex flex-col h-full justify-between">
           <div>
             <h2 className="text-3xl font-black tracking-tight text-white mb-2">GadgetHub</h2>
             <span className="text-primary text-sm font-bold uppercase tracking-widest border-b border-primary/50 pb-1 inline-block">Join The Club</span>
           </div>

           <div className="flex flex-col gap-6 mt-12 mb-auto">
             <div className="flex flex-col">
               <span className="text-4xl font-black text-white/10 mb-[-10px] select-none">01</span>
               <h4 className="text-lg font-bold text-white relative z-10">Rate Gadgets</h4>
               <p className="text-zinc-400 text-xs font-medium mt-1 leading-relaxed">Share your honest experiences with thousands of other tech enthusiasts.</p>
             </div>
             <div className="flex flex-col">
               <span className="text-4xl font-black text-white/10 mb-[-10px] select-none">02</span>
               <h4 className="text-lg font-bold text-white relative z-10">Bookmark Guides</h4>
               <p className="text-zinc-400 text-xs font-medium mt-1 leading-relaxed">Save your favorite reviews and spec comparisons for later reading.</p>
             </div>
           </div>

           <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
             <p className="text-xs text-zinc-500 font-medium">By authenticating, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> & <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</p>
           </div>
         </div>
      </div>

      {/* Main Form Content */}
      <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col bg-white">
        <h3 className="text-2xl md:text-3xl font-black text-dark mb-2 leading-tight">
          {view === 'login' ? 'Welcome Back!' : 'Create Account'}
        </h3>
        <p className="text-muted text-sm font-medium mb-8">
          {view === 'login' ? 'Sign in to review Gadgets and manage your profile.' : 'Sign up to drop reviews and join our tech community.'}
        </p>

        {error && (
          <div className="flex items-start gap-3 w-full p-4 mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-tight">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          {view === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
               {/* First Name */}
               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-dark uppercase tracking-widest">First Name</label>
                 <div className="relative">
                   <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                   <input 
                     type="text" 
                     placeholder="John" 
                     required
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm font-medium" 
                   />
                 </div>
               </div>
               
               {/* Last Name */}
               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-dark uppercase tracking-widest">Last Name</label>
                 <div className="relative">
                   <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                   <input 
                     type="text" 
                     placeholder="Doe" 
                     required
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm font-medium" 
                   />
                 </div>
               </div>
            </div>
          )}

          {/* Email Address */}
          <div className="flex flex-col gap-2">
             <label className="text-[10px] font-black text-dark uppercase tracking-widest">Email Address</label>
             <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
               <input 
                 type="email" 
                 placeholder="hello@example.com" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm font-medium" 
               />
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
               <input 
                 type="password" 
                 placeholder="••••••••" 
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm font-medium" 
               />
             </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-4 bg-dark text-white hover:bg-primary disabled:bg-zinc-400 disabled:cursor-not-allowed font-bold text-sm rounded-xl transition-colors shadow-lg mt-2"
          >
            {isLoading ? (
              <span className="animate-pulse">Processing...</span>
            ) : view === 'login' ? (
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
