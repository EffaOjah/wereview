import React, { useState } from 'react';
import { ShieldCheck, MapPin, Star, Phone, ExternalLink, Search, SlidersHorizontal } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';

const sellers = [
  {
    id: 's1',
    name: 'Slot Systems Limited',
    logo: '/img/sellers/slot-logo.png', // Placeholder
    rating: 4.8,
    reviewCount: 1240,
    location: 'Ikeja, Lagos',
    specialty: 'Mobile Phones & Accessories',
    isVerified: true,
    memberSince: '2015',
    description: 'Nigeria’s leading retail chain for mobile phones, computers, and electronics.',
    image: 'https://images.unsplash.com/photo-1556740734-7f198f79141c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's2',
    name: 'Pointek Online',
    logo: '/img/sellers/pointek-logo.png',
    rating: 4.6,
    reviewCount: 850,
    location: 'Victoria Island, Lagos',
    specialty: 'Smartphones & Gadgets',
    isVerified: true,
    memberSince: '2018',
    description: 'Leading mobile phone and electronics retail store in Nigeria.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's3',
    name: 'Jumia Official Store',
    logo: '/img/sellers/jumia-logo.png',
    rating: 4.9,
    reviewCount: 5200,
    location: 'Nationwide Delivery',
    specialty: 'Multi-category Tech',
    isVerified: true,
    memberSince: '2012',
    description: 'Direct from brand stores on Africa’s largest e-commerce platform.',
    image: 'https://images.unsplash.com/photo-1523474253046-2cd2c78b681e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's4',
    name: 'Konga Retail',
    logo: '/img/sellers/konga-logo.png',
    rating: 4.7,
    reviewCount: 3100,
    location: 'Lagos & Abuja',
    specialty: 'Laptops & Home Office',
    isVerified: true,
    memberSince: '2014',
    description: 'Premium tech retail with a focus on authenticated computing hardware.',
    image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=800'
  }
];

const SellersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSellers = sellers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sellers-page bg-zinc-50/30 pb-24">
      <div className="bg-white border-b border-zinc-100 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumb title="Verified Sellers" items={[{ name: 'Verified Sellers', path: '/sellers' }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-none mb-6">
              Verified <span className="text-primary">Sellers.</span>
            </h1>
            <p className="text-muted font-medium text-lg leading-relaxed">
              We partner with Nigeria's most trusted tech retailers to ensure you get genuine products with valid warranties.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
           <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Search sellers by name or specialty..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
           </div>
           <button className="px-6 py-4 bg-white border border-zinc-200 rounded-2xl font-bold text-dark flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors">
              <SlidersHorizontal size={18} /> Filters
           </button>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {filteredSellers.map((seller) => (
             <div key={seller.id} className="group bg-white rounded-[40px] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                   <img src={seller.image} alt={seller.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="flex items-center gap-3">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg">
                            <img src={seller.logo} alt="" className="max-w-full max-h-full object-contain grayscale" />
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-white leading-tight">{seller.name}</h3>
                            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-black uppercase tracking-widest">
                               <ShieldCheck size={14} /> Verified Partner
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                   <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-100 text-sm font-bold text-dark">
                         <MapPin size={16} className="text-primary" /> {seller.location}
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-100 text-sm font-bold text-dark">
                         <Star size={16} className="text-amber-500 fill-amber-500" /> {seller.rating} ({seller.reviewCount} Reviews)
                      </div>
                   </div>

                   <p className="text-muted font-medium text-sm leading-relaxed mb-8 border-l-2 border-zinc-100 pl-4">
                      "{seller.description}"
                   </p>

                   <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">Specialty</span>
                         <span className="text-sm font-bold text-dark">{seller.specialty}</span>
                      </div>
                      <div className="flex gap-3">
                         <button className="w-12 h-12 rounded-2xl bg-zinc-50 text-dark border border-zinc-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                            <Phone size={18} />
                         </button>
                         <button className="px-6 py-3 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2 shadow-lg">
                            Visit Store <ExternalLink size={14} />
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {filteredSellers.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4 text-muted">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">No sellers found</h3>
            <p className="text-muted">We couldn't find any sellers matching "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellersPage;
