import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BannerSection: React.FC = () => {
  return (
    <div className="banner py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Banner 1 — Phones */}
          <Link to="/reviews" className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm block">
            <img 
              src="/img/banner/ads5.jpg" 
              alt="Smartphones Banner" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2">Community Reviews</span>
              <h3 className="text-white font-black text-xl lg:text-2xl leading-tight mb-3">
                What Nigerians Think<br />About Budget Phones
              </h3>
              <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
                Read Reviews <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* Banner 2 — Audio */}
          <Link to="/products" className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm block">
            <img 
              src="/img/banner/ads6.jpg" 
              alt="Earbuds Banner" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2">Earbuds & Headphones</span>
              <h3 className="text-white font-black text-xl lg:text-2xl leading-tight mb-3">
                Best ANC Earbuds<br />Under ₦50,000
              </h3>
              <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
                Explore Category <ArrowRight size={16} />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default BannerSection;
