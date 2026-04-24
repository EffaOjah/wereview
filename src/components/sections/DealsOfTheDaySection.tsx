import React, { useState, useEffect } from 'react';
import { Flame, Clock, ShoppingCart, ArrowRight } from 'lucide-react';
import { products as allProducts } from '../../data/products';
import { Link } from 'react-router-dom';
import NairaPrice from '../ui/NairaPrice';

const CountdownTimer: React.FC<{ expiry: Date }> = ({ expiry }) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = expiry.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0')
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [expiry]);

    return (
        <div className="flex gap-2">
            {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                <div key={i} className="flex items-center gap-1">
                    <div className="bg-dark text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm">
                        {unit}
                    </div>
                    {i < 2 && <span className="text-dark font-black">:</span>}
                </div>
            ))}
        </div>
    );
};

const DealsOfTheDaySection: React.FC = () => {
    // Filter products that have a dealEndTime and are currently active
    const dealProducts = allProducts.filter(p => p.dealEndTime && p.dealEndTime > new Date()).slice(0, 4);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[3px] text-[10px] mb-4">
                            <Flame size={14} className="animate-pulse" /> Limited Time Offers
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-none mb-6">
                            Deals of <br /> <span className="text-primary italic">the Day.</span>
                        </h2>
                        <p className="text-muted font-medium text-lg">
                            Hand-picked gadgets at unbeatable prices. Once the timer hits zero, the deal is gone forever.
                        </p>
                    </div>

                    <Link to="/products" className="group flex items-center gap-3 text-dark font-black uppercase tracking-widest text-xs hover:text-primary transition-colors">
                        View All Deals <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dealProducts.map((product) => (
                        <div key={product.id} className="group flex flex-col h-full bg-zinc-50/50 rounded-[40px] p-2 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                            <div className="relative aspect-square rounded-[32px] overflow-hidden bg-white mb-6">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                                />
                                
                                {/* Discount Badge */}
                                <div className="absolute top-4 right-4 bg-primary text-white font-black text-xs px-4 py-2 rounded-full shadow-lg shadow-primary/30">
                                    -{product.discount}%
                                </div>

                                {/* Urgency Progress Bar */}
                                <div className="absolute bottom-4 left-4 right-4 px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[9px] font-black text-muted uppercase tracking-wider">Stock Left</span>
                                        <span className="text-[10px] font-black text-primary">{(parseInt(product.id) * 7) % 100}% Claimed</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary rounded-full" 
                                            style={{ width: `${(parseInt(product.id) * 7) % 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 pb-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock size={14} className="text-primary" />
                                    <CountdownTimer expiry={product.dealEndTime!} />
                                </div>

                                <h4 className="text-lg font-black text-dark mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                    {product.name}
                                </h4>
                                
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="text-2xl font-black text-dark">
                                        <NairaPrice amount={product.nigerianPrices?.average || product.price * 1500} />
                                    </div>
                                    <div className="text-sm font-bold text-muted line-through opacity-50">
                                        <NairaPrice amount={(product.nigerianPrices?.average || product.price * 1500) * (1 + (product.discount || 20)/100)} />
                                    </div>
                                </div>

                                <button className="mt-auto w-full py-4 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2">
                                    <ShoppingCart size={16} /> Claim Offer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DealsOfTheDaySection;
