import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Headphones } from 'lucide-react';

const BannerSection: React.FC = () => {
  return (
    <section className="banner-section py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Banner 1 — Smartphones */}
          <Link 
            to="/gadgets?category=Smartphones" 
            className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-[3rem] shadow-2xl shadow-primary/5 block bg-zinc-100 transition-all duration-500 hover:-translate-y-2"
          >
            <img 
              src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1200" 
              alt="Premium Smartphones" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-10 md:p-14 flex flex-col justify-end">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[3px] text-[10px] mb-4">
                 <Zap size={14} fill="currentColor" /> Daily Flash Deals
              </div>
              <h3 className="text-white font-black text-3xl md:text-5xl leading-none tracking-tight mb-6">
                Premium <br /> <span className="text-primary">Smartphones.</span>
              </h3>
              <div className="flex items-center gap-3 text-white/80 font-bold text-sm group-hover:text-white transition-all uppercase tracking-widest">
                Browse Budget & Flagships <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Banner 2 — Audio Gear */}
          <Link 
            to="/gadgets?category=Audio%20%26%20Music" 
            className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-[3rem] shadow-2xl shadow-primary/5 block bg-zinc-100 transition-all duration-500 hover:-translate-y-2"
          >
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200" 
              alt="Professional Audio Gear" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-10 md:p-14 flex flex-col justify-end">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[3px] text-[10px] mb-4">
                 <Headphones size={14} /> Immersive Experience
              </div>
              <h3 className="text-white font-black text-3xl md:text-5xl leading-none tracking-tight mb-6">
                Audio <br /> <span className="text-primary">Excellence.</span>
              </h3>
              <div className="flex items-center gap-3 text-white/80 font-bold text-sm group-hover:text-white transition-all uppercase tracking-widest">
                Discover ANC Earbuds <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default BannerSection;
