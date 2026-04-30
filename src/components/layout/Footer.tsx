import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-[#050505] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="container relative z-10">
        
        {/* Top Newsletter & Branding Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 pb-16 border-b border-white/5 mb-16">
           <div className="max-w-md">
              <Link to="/" className="text-3xl font-black text-primary tracking-tighter uppercase mb-4 block">GadgetHub</Link>
              <p className="text-zinc-400 font-medium leading-relaxed">
                A smarter way to discover, compare, and buy gadgets in Nigeria.
              </p>
           </div>
           
           <div className="w-full lg:w-auto">
              <h5 className="text-sm font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Sparkles size={16} className="text-primary" /> Stay Ahead of the Market
              </h5>
              <p className="text-xs text-zinc-400 mb-4">
                 Get updates on price changes, new releases, and expert insights.
              </p>
              <form className="flex max-w-sm">
                 <div className="relative flex-grow">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                       type="email" 
                       placeholder="your@email.com" 
                       className="w-full bg-zinc-900/50 border border-white/10 rounded-l-xl pl-12 pr-4 py-4 outline-none focus:border-primary transition-colors text-sm font-medium"
                    />
                 </div>
                 <button type="submit" className="bg-primary text-white px-6 py-4 rounded-r-xl hover:bg-white hover:text-dark transition-all flex items-center justify-center shadow-lg shadow-primary/20 font-bold text-sm">
                    Subscribe
                 </button>
              </form>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <h6 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Get in Touch</h6>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                   <MapPin size={18} />
                </div>
                <div>
                   <span className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">HQ Location</span>
                   <span className="text-sm font-bold text-zinc-300">Computer Village, Ikeja, Lagos</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                   <Phone size={18} />
                </div>
                <div>
                   <span className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Call Support</span>
                   <span className="text-sm font-bold text-zinc-300">+234 (0) 800 GADGETS</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                   <Mail size={18} />
                </div>
                <div>
                   <span className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Email Us</span>
                   <span className="text-sm font-bold text-zinc-300">hello@gadgethub.ng</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-8">
            <h6 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Discover</h6>
            <ul className="flex flex-col gap-4">
              {['Top Reviews', 'Latest Gadgets', 'Comparison Tool', 'Verified Sellers', 'Tech Blog'].map((link, i) => (
                <li key={i}>
                  <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold text-zinc-400 hover:text-primary transition-colors flex items-center gap-2 group">
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-primary transition-all" />
                     {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-8">
            <h6 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Company</h6>
            <ul className="flex flex-col gap-4">
              {['About Us', 'How it Works', 'Become a Reviewer', 'Partner with Us', 'Contact Support'].map((link, i) => (
                <li key={i}>
                  <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold text-zinc-400 hover:text-primary transition-colors flex items-center gap-2 group">
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-primary transition-all" />
                     {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="flex flex-col gap-8">
            <h6 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Connect</h6>
            <p className="text-sm font-medium text-zinc-400 leading-relaxed">
              Follow our social channels for daily tech drops and industry news.
            </p>
            <div className="flex gap-4">
               {/* Facebook */}
               <a href="#" className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
               </a>
               {/* Twitter/X */}
               <a href="#" className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </a>
               {/* Instagram */}
               <a href="#" className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </a>
               {/* LinkedIn */}
               <a href="#" className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
               </a>
            </div>
            
            <div className="mt-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck size={20} />
               </div>
               <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Trust Score</span>
                  <span className="text-xs font-bold text-white">4.9 / 5.0 (Reviewers)</span>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
           <div>
              <p className="text-xs font-bold text-zinc-500 mb-2">
                 &copy; {new Date().getFullYear()} GadgetHub Nigeria. The most trusted tech companion.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                 <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Policy</Link>
                 <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors">Terms of Service</Link>
              </div>
           </div>
           
           <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="px-4 py-2 bg-zinc-900/50 rounded-full border border-white/5 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Systems Operational</span>
              </div>
              <div className="px-4 py-2 bg-zinc-900/50 rounded-full border border-white/5 flex items-center gap-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Made with ❤️ in Nigeria</span>
              </div>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
