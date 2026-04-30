import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GitCompare, ArrowRight, CheckCircle2, ShieldCheck, Zap, Battery, Camera, Cpu } from 'lucide-react';
import { useGadgets } from '../../context/GadgetContext';

const CompareSection: React.FC = () => {
  const { gadgets, isLoading, error } = useGadgets();

  // Memoize random same-category selection so it doesn't flip on every render
  const { gadgetA, gadgetB } = useMemo(() => {
    if (!gadgets || gadgets.length < 2) return { gadgetA: null, gadgetB: null };

    // Group gadgets by category name
    const byCategory: Record<string, typeof gadgets> = {};
    gadgets.forEach(g => {
      const catName = typeof g.category === 'object' ? g.category?.name : g.category;
      if (!catName) return;
      if (!byCategory[catName]) byCategory[catName] = [];
      byCategory[catName].push(g);
    });

    // Keep only categories with at least 2 gadgets
    const validCategories = Object.values(byCategory).filter(group => group.length >= 2);
    if (validCategories.length === 0) return { gadgetA: null, gadgetB: null };

    // Pick a random category, then two distinct gadgets from it
    const group = validCategories[Math.floor(Math.random() * validCategories.length)];
    const indexA = Math.floor(Math.random() * group.length);
    let indexB = Math.floor(Math.random() * group.length);
    while (indexB === indexA) indexB = Math.floor(Math.random() * group.length);

    return { gadgetA: group[indexA], gadgetB: group[indexB] };
  }, [gadgets]);

  // Loading state
  if (isLoading) {
    return (
      <section className="compare-section py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-zinc-500 font-bold tracking-widest text-sm uppercase">Loading Comparison...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error or empty state (fetch failed or no gadgets in DB)
  if (error || !gadgetA || !gadgetB) {
    return (
      <section className="compare-section py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex justify-center py-16">
          <div className="flex flex-col items-center gap-4 text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center">
              <GitCompare size={28} className="text-zinc-300" />
            </div>
            <h4 className="text-lg font-black text-dark">Comparison Unavailable</h4>
            <p className="text-sm font-medium text-muted">
              {error
                ? "We couldn't load gadget data from the server. Please refresh to try again."
                : 'Not enough gadgets in the database to show a comparison.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Helper to extract nested spec values gracefully
  const getSpecValue = (gadget: any, key: string) => {
    if (!gadget.specs) return 'N/A';
    
    let specsObj: Record<string, string> = {};
    if (typeof gadget.specs === 'string') {
        try { specsObj = JSON.parse(gadget.specs); } catch (e) {}
    } else {
        specsObj = gadget.specs;
    }

    // Lowercase match for resilience
    const foundKey = Object.keys(specsObj).find(k => k.toLowerCase().includes(key.toLowerCase()));
    return foundKey ? specsObj[foundKey] : 'N/A';
  };

  const comparisonSpecs = [
    { 
      label: 'Performance / Chip', 
      icon: Cpu, 
      valueA: getSpecValue(gadgetA, 'processor') !== 'N/A' ? getSpecValue(gadgetA, 'processor') : getSpecValue(gadgetA, 'chip'), 
      valueB: getSpecValue(gadgetB, 'processor') !== 'N/A' ? getSpecValue(gadgetB, 'processor') : getSpecValue(gadgetB, 'chip'),
      winner: 'Both' // Hard to determine programmatically without benchmark scores
    },
    { 
      label: 'Display / Screen', 
      icon: Zap, 
      valueA: getSpecValue(gadgetA, 'display') !== 'N/A' ? getSpecValue(gadgetA, 'display') : getSpecValue(gadgetA, 'screen'), 
      valueB: getSpecValue(gadgetB, 'display') !== 'N/A' ? getSpecValue(gadgetB, 'display') : getSpecValue(gadgetB, 'screen'),
      winner: 'Both'
    },
    { 
      label: 'Battery / Power', 
      icon: Battery, 
      valueA: getSpecValue(gadgetA, 'battery'), 
      valueB: getSpecValue(gadgetB, 'battery'),
      winner: 'Both'
    },
    { 
      label: 'Main Camera', 
      icon: Camera, 
      valueA: getSpecValue(gadgetA, 'camera') !== 'N/A' ? getSpecValue(gadgetA, 'camera') : getSpecValue(gadgetA, 'main camera'), 
      valueB: getSpecValue(gadgetB, 'camera') !== 'N/A' ? getSpecValue(gadgetB, 'camera') : getSpecValue(gadgetB, 'main camera'),
      winner: 'Both'
    },
  ];

  const sharedCategory: string = typeof gadgetA.category === 'object' ? gadgetA.category?.name : gadgetA.category;

  return (
    <section className="compare-section py-24 bg-white relative overflow-hidden">
      {/* Background Textures & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header - Centered for better focus */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-100 text-zinc-900 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
              <GitCompare size={14} className="text-primary" /> {sharedCategory} Comparison
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-dark tracking-tight leading-tight mb-6">
             Compare Before You <br /> <span className="text-primary">Decide.</span>
           </h2>
           <p className="text-muted font-medium text-lg leading-relaxed">
             Side-by-side comparisons that highlight the differences that matter. Performance, features, and price. All in one place.
           </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[3rem] border border-zinc-200 shadow-2xl shadow-primary/5 overflow-hidden">
             
             {/* Main Comparison Grid */}
             <div className="flex flex-col md:flex-row">
                
                {/* Gadget A Column */}
                <div className="flex-1 p-8 md:p-12 flex flex-col items-center bg-zinc-50/30">
                   <div className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center p-4 mb-8 bg-white rounded-[2rem] shadow-sm border border-zinc-100 group transition-all">
                      <img src={gadgetA.image} alt={gadgetA.name} className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <h3 className="text-xl md:text-2xl font-black text-dark text-center mb-2">{gadgetA.name}</h3>
                   <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600 uppercase tracking-widest mb-6">
                      <ShieldCheck size={14} /> Spec Focus
                   </div>
                </div>

                {/* Central Spec Divider (Desktop Only Labels) */}
                <div className="hidden lg:flex w-64 flex-col bg-white border-x border-zinc-100 p-8 justify-center gap-8 relative z-20">
                   <div className="absolute inset-y-0 -left-4 w-8 bg-gradient-to-r from-zinc-50/30 to-transparent" />
                   <div className="absolute inset-y-0 -right-4 w-8 bg-gradient-to-l from-zinc-50/30 to-transparent" />
                   {comparisonSpecs.map((spec, i) => (
                     <div key={i} className="flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-primary mb-2 shadow-sm border border-zinc-100">
                           <spec.icon size={18} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 whitespace-nowrap">{spec.label}</span>
                     </div>
                   ))}
                </div>

                {/* Gadget B Column */}
                <div className="flex-1 p-8 md:p-12 flex flex-col items-center bg-white">
                   <div className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center p-4 mb-8 bg-zinc-50 rounded-[2rem] shadow-sm border border-zinc-100 group transition-all">
                      <img src={gadgetB.image} alt={gadgetB.name} className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <h3 className="text-xl md:text-2xl font-black text-dark text-center mb-2">{gadgetB.name}</h3>
                   <div className="flex items-center gap-1.5 text-xs font-black text-primary uppercase tracking-widest mb-6">
                      <Zap size={14} /> Spec Focus
                   </div>
                </div>

             </div>

             {/* Mobile & Tablet Spec Grid (Visible when column layout is stacked or for small screens) */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 border-t border-zinc-100">
                {comparisonSpecs.map((spec, i) => (
                  <div key={i} className="flex items-stretch border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50 transition-colors">
                     {/* Value A */}
                     <div className="flex-1 p-6 md:p-8 text-center flex flex-col justify-center bg-zinc-50/30 border-r border-zinc-100">
                        <span className="lg:hidden block text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">{spec.label}</span>
                        <p className={`text-sm md:text-base font-black ${spec.winner === 'A' || spec.winner === 'Both' ? 'text-dark' : 'text-zinc-400'}`}>
                           {spec.valueA}
                        </p>
                        {spec.winner === 'A' && <span className="text-[8px] font-black text-emerald-500 uppercase mt-1 tracking-widest">WINS</span>}
                     </div>

                     {/* Value B */}
                     <div className="flex-1 p-6 md:p-8 text-center flex flex-col justify-center">
                        <span className="lg:hidden block text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">{spec.label}</span>
                        <p className={`text-sm md:text-base font-black ${spec.winner === 'B' || spec.winner === 'Both' ? 'text-dark' : 'text-zinc-400'}`}>
                           {spec.valueB}
                        </p>
                        {spec.winner === 'B' && <span className="text-[8px] font-black text-primary uppercase mt-1 tracking-widest">WINS</span>}
                     </div>
                  </div>
                ))}
             </div>
             
             {/* Bottom Link Section */}
             <div className="p-8 md:p-12 bg-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                   <h4 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight">Ready to see more comparisons?</h4>
                   <p className="text-zinc-400 font-medium text-sm">Access technical deep-dives for over 1,200+ gadgets in our database.</p>
                </div>
                <Link 
                  to="/compare" 
                  className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-dark transition-all flex items-center gap-3 shadow-xl shadow-primary/20 shrink-0 group"
                >
                  Start Comparing <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>

          </div>
        </div>

        {/* Feature Highlights below the main comparison */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-24">
           {[
             { label: 'Make informed decisions', desc: 'Base your choice on facts' },
             { label: 'Identify the best value', desc: 'Get more for your money' },
             { label: 'Avoid costly mistakes', desc: 'Don\'t buy the wrong gadget' },
             { label: 'Save valuable time', desc: 'All the research done for you' }
           ].map((feat, i) => (
             <div key={i} className="flex flex-col gap-2 p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                   <CheckCircle2 size={18} />
                </div>
                <h5 className="font-black text-dark text-sm">{feat.label}</h5>
                <p className="text-xs text-muted font-medium">{feat.desc}</p>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default CompareSection;
