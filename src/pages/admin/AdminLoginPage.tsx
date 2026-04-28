import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2, ChevronLeft, Fingerprint } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';

const AdminLoginPage: React.FC = () => {
  const [step, setStep] = useState<'login' | '2fa'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthModal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email === 'admin@gadgethub.ng' && password === 'admin123') {
        setStep('2fa');
      } else {
        setError('Invalid credentials. Use admin@gadgethub.ng / admin123');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      login({ name: 'System Admin', email: 'admin@gadgethub.ng' });
      navigate('/admin/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 md:p-8 font-outfit relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-[1100px] bg-white border border-zinc-200 rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-200/50 flex flex-col md:flex-row relative z-10">
        
        {/* Left Side: Branding/Visual */}
        <div className="hidden md:flex flex-col w-[45%] bg-zinc-900 p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <ShieldCheck className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">GadgetHub <span className="text-primary text-sm align-top">Admin</span></h2>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                Secure Portal <br /> 
                <span className="text-zinc-500">Management Dashboard</span>
              </h1>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-sm">
                Access your administrative tools, monitor site metrics, and manage community reviews.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                   <Fingerprint className="text-primary" size={16} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Enhanced Security</h4>
                  <p className="text-zinc-500 text-xs mt-1">Multi-factor authentication enabled for all administrative accounts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center bg-zinc-50/30">
          <div className="max-w-md mx-auto w-full">
            {step === 'login' ? (
              <>
                <div className="mb-8 md:mb-10">
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 mb-2 md:mb-3 leading-tight">Administrator Sign In</h3>
                  <p className="text-zinc-500 font-medium text-sm">Enter your credentials to access the secure area.</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-5 md:space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@gadgethub.ng" 
                        required
                        className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-white border border-zinc-200 rounded-2xl outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-zinc-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Password</label>
                      <button type="button" className="text-[10px] font-bold text-zinc-400 hover:text-primary transition-colors uppercase tracking-widest">Forgot?</button>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        required
                        className="w-full pl-12 pr-4 py-3.5 md:py-4 bg-white border border-zinc-200 rounded-2xl outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-zinc-900 font-medium"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-4 bg-zinc-900 hover:bg-black text-white font-black text-sm rounded-2xl transition-all shadow-xl shadow-zinc-900/10 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        Sign into Dashboard
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setStep('login')}
                  className="mb-8 flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  <ChevronLeft size={16} />
                  Back to login
                </button>

                <div className="mb-8 md:mb-10">
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 mb-2 md:mb-3">Two-Factor Auth</h3>
                  <p className="text-zinc-500 font-medium text-sm">We've sent a 6-digit verification code to your device.</p>
                </div>

                <form onSubmit={handle2FASubmit} className="space-y-6 md:space-y-8">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        className="w-full h-12 md:h-16 text-center bg-white border border-zinc-200 rounded-xl outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-zinc-900 text-lg md:text-xl font-bold"
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <p className="text-zinc-500 text-xs font-medium">
                      Didn't receive a code? <button type="button" className="text-primary hover:underline font-bold">Resend Code</button>
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading || otp.some(d => !d)}
                    className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-black text-sm rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        Verify & Access
                        <ShieldCheck size={18} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="mt-8 md:mt-12 pt-8 border-t border-zinc-100 text-center">
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                Authorized Personnel Only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
