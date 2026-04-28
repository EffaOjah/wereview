import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home, History } from 'lucide-react';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-zinc-50/30">
            <div className="max-w-2xl w-full text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Visual / Icon Area */}
                <div className="relative inline-block mb-12">
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-150 opacity-50" />
                    <div className="relative w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center shadow-2xl border border-zinc-100 rotate-6 hover:rotate-0 transition-transform duration-500">
                        <Ghost className="text-primary" size={80} strokeWidth={1.5} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-dark text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg transform -rotate-12">
                        ERROR 404
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-5xl md:text-7xl font-black text-dark tracking-tighter mb-4 leading-none">
                    Lost in the <br className="hidden md:block" /> <span className="text-primary ">Tech Jungle?</span>
                </h1>
                
                <p className="text-muted font-medium text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
                    Even our fastest fiber optic cables couldn't find this page. It might have been deleted, moved, or never existed in this dimension.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/" className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-dark text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-primary hover:translate-y-[-2px] transition-all">
                        <Home size={18} /> Back to Home
                    </Link>
                    <Link to="/reviews" className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white border border-zinc-200 text-dark rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-zinc-50 hover:border-zinc-300">
                        <History size={18} /> View Reviews
                    </Link>
                </div>

                {/* Secondary Recommendations */}
                <div className="mt-20 pt-10 border-t border-zinc-200/60 max-w-lg mx-auto">
                    <h6 className="text-[10px] font-black text-muted uppercase tracking-[3px] mb-8">Popular Right Now</h6>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['iPhone 15 Pro', 'PS5 Slim', 'MacBook M3', 'Infinix Note 40'].map((tag) => (
                            <Link 
                                key={tag}
                                to="/gadgets"
                                className="bg-zinc-100 hover:bg-primary/10 hover:text-primary px-4 py-2 rounded-full text-xs font-black text-muted transition-all"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
