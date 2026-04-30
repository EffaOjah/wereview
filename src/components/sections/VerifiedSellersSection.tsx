import React, { useState, useMemo } from 'react';
import { MapPin, ShieldCheck, Star, ChevronRight, Store } from 'lucide-react';
import { sellers } from '../../data/sellers';
import SellerVerificationModal from '../ui/SellerVerificationModal';

const VerifiedSellersSection: React.FC = () => {
    const cities = ['All', 'Lagos', 'Abuja', 'Port Harcourt'];
    const [activeCity, setActiveCity] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredSellers = useMemo(() => {
        if (activeCity === 'All') return sellers;
        return sellers.filter(s => s.city === activeCity);
    }, [activeCity]);

    return (
        <section className="py-20 bg-zinc-50/50 overflow-hidden">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[3px] text-[10px] mb-4">
                            <Store size={14} /> Local Trusted Vendors
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-none mb-6">
                            Shop with <br /> <span className="text-primary">Trusted Sellers.</span>
                        </h2>
                        <p className="text-muted font-medium text-lg">
                            Connect with verified stores near you and buy with confidence.
                        </p>
                    </div>

                    {/* City Filter */}
                    <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-zinc-100 shadow-sm self-start md:self-end">
                        {cities.map((city) => (
                            <button
                                key={city}
                                onClick={() => setActiveCity(city)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${activeCity === city
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-muted hover:text-dark hover:bg-zinc-50'
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredSellers.map((seller) => (
                        <div key={seller.id} className="group bg-white p-4 md:p-8 rounded-[24px] md:rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500 relative overflow-hidden">
                            {/* Verified Badge Overlay */}
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none transition-opacity scale-150 translate-x-4 -translate-y-4">
                                <ShieldCheck size={120} />
                            </div>

                            <div className="flex flex-col h-full">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-zinc-50 p-2 md:p-3 mb-4 md:mb-6 border border-zinc-100 group-hover:border-primary/20 transition-colors">
                                    <div className="w-full h-full flex items-center justify-center text-primary">
                                        <Store size={24} className="md:w-8 md:h-8" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 text-emerald-600 font-black uppercase tracking-widest text-[8px] md:text-[9px] mb-1 md:mb-2">
                                    <ShieldCheck size={10} className="md:w-3 md:h-3" /> Verified Vendor
                                </div>
                                <h4 className="text-base md:text-xl font-black text-dark mb-1 group-hover:text-primary transition-colors line-clamp-1">{seller.name}</h4>
                                <p className="text-[10px] md:text-xs text-muted font-bold mb-4 md:mb-6 flex items-center gap-1">
                                    <MapPin size={10} className="text-primary" /> {seller.location}
                                </p>

                                <div className="mt-auto pt-4 md:pt-6 border-t border-zinc-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star size={12} className="md:w-3.5 md:h-3.5" fill="currentColor" />
                                                <span className="text-xs md:text-sm font-black text-dark">{seller.rating}</span>
                                            </div>
                                            <span className="text-[8px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">{seller.reviewCount} Reviews</span>
                                        </div>
                                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-50 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all">
                                            <ChevronRight size={16} className="md:w-4.5 md:h-4.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <button className="px-10 py-4 bg-white border border-zinc-100 rounded-2xl font-black text-[11px] uppercase tracking-[3px] text-dark hover:bg-dark hover:text-white hover:border-dark transition-all shadow-sm">
                        View Sellers
                    </button>
                </div>

                {/* Local Hustle CTA */}
                <div className="mt-16 bg-gradient-to-br from-dark to-[#1a1a1a] p-10 md:p-16 rounded-[48px] text-white relative overflow-hidden border border-white/5 shadow-2xl shadow-dark/20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                        <div className="max-w-2xl text-center lg:text-left">
                                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                                    Become a <br /> <span className="text-primary">Verified Seller.</span>
                                </h2>
                            <p className="text-zinc-300 font-medium text-lg md:text-xl opacity-90">
                                Join the elite circle of verified vendors and connect with <span className="text-white font-bold">thousands</span> of tech enthusiasts daily.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-12 py-6 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:scale-[1.05] hover:shadow-2xl hover:shadow-primary/40 active:scale-95 transition-all duration-300"
                            >
                                Apply for Verification
                            </button>
                        </div>
                    </div>
                </div>

                {/* Seller Verification Modal */}
                <SellerVerificationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </section>
    );
};

export default VerifiedSellersSection;
