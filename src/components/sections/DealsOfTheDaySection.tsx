import React from 'react';
import { Flame, ShoppingCart, ArrowRight, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';
import NairaPrice from '../ui/NairaPrice';
import { useGadgets } from '../../context/GadgetContext';

const DealsOfTheDaySection: React.FC = () => {
    const { deals: dealGadgets, isLoading } = useGadgets();

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[3px] text-[10px] mb-4">
                            <Flame size={14} className="animate-pulse" /> Limited Time Offers
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-none mb-6">
                            Today’s <br /> <span className="text-primary">Best Offers.</span>
                        </h2>
                        <p className="text-muted font-medium text-lg">
                            Carefully selected deals and price drops on top gadgets.
                        </p>
                    </div>

                    <Link to="/gadgets" className="group flex items-center gap-3 text-dark font-black uppercase tracking-widest text-xs hover:text-primary transition-colors">
                        View Deals <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="py-20 flex justify-center items-center">
                        <div className="animate-pulse flex flex-col items-center gap-4">
                            <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                            <p className="text-zinc-500 font-bold tracking-widest text-sm uppercase">Loading Deals...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {dealGadgets.map((gadget: any) => (
                            <div key={gadget.id} className="group flex flex-col h-full bg-zinc-50/50 rounded-[40px] p-2 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                                <div className="relative aspect-square rounded-[32px] overflow-hidden bg-white mb-6">
                                    <img
                                        src={gadget.image}
                                        alt={gadget.name}
                                        className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Discount Badge */}
                                    <div className="absolute top-4 right-4 bg-primary text-white font-black text-xs px-4 py-2 rounded-full shadow-lg shadow-primary/30">
                                        -{gadget.discount || 0}%
                                    </div>
                                </div>

                                <div className="px-6 pb-8 flex flex-col flex-grow">
                                    <h4 className="text-lg font-black text-dark mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                        {gadget.name}
                                    </h4>

                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="text-2xl font-black text-dark">
                                            <NairaPrice amount={gadget.prices?.average || gadget.nigerianPrices?.average || gadget.price * 1500 || 0} />
                                        </div>
                                        <div className="text-sm font-bold text-muted line-through opacity-50">
                                            <NairaPrice amount={(gadget.prices?.average || gadget.nigerianPrices?.average || gadget.price * 1500 || 0) * (1 + (gadget.discount || 20) / 100)} />
                                        </div>
                                    </div>

                                    <div className="mt-auto flex gap-2">
                                        <button className="flex-1 py-3.5 bg-zinc-100 text-dark rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                                            <GitCompare size={14} /> Compare
                                        </button>
                                        <button className="flex-[1.5] py-3.5 bg-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2">
                                            <ShoppingCart size={14} /> Claim Offer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default DealsOfTheDaySection;
