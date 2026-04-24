import React, { useState } from 'react';
import { Play, User, Clock, X, Video, ArrowRight } from 'lucide-react';
import { videoReviews } from '../../data/videos';

const VideoReviewsSection: React.FC = () => {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    return (
        <section className="py-24 bg-dark text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[3px] text-[10px] mb-4">
                            <Video size={14} /> Video Showcase
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 text-zinc-50">
                            Watch Real <br /> <span className="text-primary italic">Gadget Reviews.</span>
                        </h2>
                        <p className="text-zinc-400 font-medium text-lg md:text-xl leading-relaxed max-w-lg">
                            See our community experts in action. Unboxings, stress tests, and real-world performance breakdowns.
                        </p>
                    </div>

                    <button className="group flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs hover:text-primary transition-all">
                        Explore Video Hub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {videoReviews.map((video) => (
                        <div 
                            key={video.id} 
                            onClick={() => setActiveVideo(video.youtubeId)}
                            className="group cursor-pointer relative"
                        >
                            <div className="relative aspect-[9/12] md:aspect-[9/13] rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5">
                                {/* Thumbnail */}
                                <img 
                                    src={video.thumbnail} 
                                    alt={video.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />

                                {/* Play Button - Repositioned to top-right to avoid collision */}
                                <div className="absolute top-8 right-8">
                                    <div className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-primary/40">
                                        <Play size={24} fill="white" className="ml-1" />
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
                                            {video.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                                            <Clock size={10} /> {video.duration}
                                        </span>
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-light leading-tight mb-4 group-hover:text-primary transition-colors text-zinc-100">
                                        {video.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                                            <User size={12} />
                                        </div>
                                        {video.reviewer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Local Content Callout */}
                <div className="mt-28 flex flex-col items-center text-center max-w-3xl mx-auto pb-10">
                    <div className="w-20 h-1.5 bg-primary rounded-full mb-10 shadow-lg shadow-primary/20" />
                    <p className="text-zinc-500 font-black uppercase tracking-[5px] text-[11px] mb-6">Community Driven</p>
                    <h3 className="text-3xl md:text-5xl font-black mb-10 text-white tracking-tight leading-tight">
                        Want to feature your <br /> <span className="text-primary">video review?</span>
                    </h3>
                    <button className="px-12 py-6 border-2 border-white/20 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-white hover:text-dark hover:border-white transition-all shadow-xl">
                        Submit Your Content
                    </button>
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-dark/95 backdrop-blur-xl animate-in fade-in duration-300">
                    <button 
                        onClick={() => setActiveVideo(null)}
                        className="absolute top-10 right-10 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-[210]"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default VideoReviewsSection;
