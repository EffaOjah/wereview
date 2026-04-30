import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import NairaPrice from '../components/ui/NairaPrice';
import { gadgets } from '../data/gadgets';
import { Plus, X, Search, SlidersHorizontal } from 'lucide-react';

const ComparePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const idsParam = searchParams.get('ids') || '';
  const selectedIds = idsParam ? idsParam.split(',') : [];
  
  const selectedGadgets = useMemo(() => {
    return selectedIds.map(id => gadgets.find(p => p.id === id)).filter(Boolean) as any[];
  }, [selectedIds]);

  // Aggregate all unique specification keys across all selected gadgets
  const allSpecKeys = useMemo(() => {
    const keys = new Set<string>();
    selectedGadgets.forEach(gadget => {
      if (gadget.specs) {
        Object.keys(gadget.specs).forEach(key => keys.add(key));
      }
    });
    return Array.from(keys);
  }, [selectedGadgets]);

  const addGadget = (id: string) => {
    if (selectedIds.includes(id) || selectedIds.length >= 2) return;
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('ids', [...selectedIds, id].join(','));
      return next;
    });
    setIsSelectorOpen(false);
    setSearchQuery('');
  };

  const removeGadget = (id: string) => {
    const newIds = selectedIds.filter(existingId => existingId !== id);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (newIds.length > 0) {
        next.set('ids', newIds.join(','));
      } else {
        next.delete('ids');
      }
      return next;
    });
  };

  // Filter gadgets for the selector modal
  const searchableGadgets = useMemo(() => {
    return gadgets.filter(p => !selectedIds.includes(p.id) && p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, selectedIds]);

  return (
    <div className="compare-page bg-zinc-50/50 pb-24 min-h-screen">
      <Breadcrumb title="Compare Gadgets" items={[{ name: 'Compare', path: '/compare' }]} />

      <div className="container py-16">
        
        {/* Selector Modal Overlay */}
        {isSelectorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                 <h3 className="text-xl font-black text-dark">Add Gadget to Compare</h3>
                 <button onClick={() => setIsSelectorOpen(false)} className="p-2 hover:bg-zinc-200 rounded-full transition-colors"><X size={20} /></button>
               </div>
               
               <div className="p-6 border-b border-zinc-100">
                 <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Search for smartphones, laptops..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 focus:border-primary outline-none transition-colors font-medium bg-zinc-50"
                   />
                   <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                 </div>
               </div>

               <div className="flex-1 overflow-y-auto p-2">
                 {searchableGadgets.length === 0 ? (
                   <div className="flex flex-col items-center justify-center py-12 text-muted">
                     <span className="text-4xl mb-4">🔍</span>
                     <p className="font-bold">No gadgets found.</p>
                   </div>
                 ) : (
                   searchableGadgets.map(gadget => (
                     <div key={gadget.id} onClick={() => addGadget(gadget.id)} className="flex items-center gap-4 p-4 hover:bg-primary/5 rounded-xl cursor-pointer transition-colors group">
                       <img src={gadget.image} alt={gadget.name} className="w-16 h-16 object-contain bg-white rounded-lg border border-zinc-100 p-1 group-hover:border-primary/30 mix-blend-multiply" />
                       <div className="flex-1">
                         <h5 className="font-bold text-dark group-hover:text-primary transition-colors">{gadget.name}</h5>
                         <span className="text-xs font-bold uppercase tracking-widest text-muted">{gadget.category}</span>
                       </div>
                       <button className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-white transition-colors">
                         <Plus size={16} />
                       </button>
                     </div>
                   ))
                 )}
               </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        {selectedGadgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-zinc-100 shadow-sm text-center px-4">
             <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
               <SlidersHorizontal size={40} className="text-primary" />
             </div>
             <h2 className="text-3xl font-black text-dark mb-4">Nothing to Compare Yet</h2>
             <p className="text-muted max-w-md mx-auto mb-8 font-medium">Select up to 2 different gadgets to compare their specifications, pricing, and features side-by-side.</p>
             <button onClick={() => setIsSelectorOpen(true)} className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-dark transition-colors shadow-md hover:shadow-xl">
               <Plus size={20} /> Add Gadget
             </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
             
             {/* Sticky Headers (Desktop & Mobile Side-by-Side) */}
             <div className="flex border-b border-zinc-100 bg-white z-10 w-full relative">
                {/* Column spacing offset for Desktop spec labels - Hidden on Mobile */}
                <div className="hidden md:flex w-64 shrink-0 items-center justify-center bg-zinc-50/50 p-6 border-r border-zinc-100">
                   <div className="text-center">
                     <h3 className="font-black text-dark text-xl mb-2">Compare</h3>
                     <span className="text-xs font-bold tracking-widest uppercase text-muted">{selectedGadgets.length} items</span>
                   </div>
                </div>

                {/* Selected Gadgets Headers */}
                {selectedGadgets.map((gadget: any) => (
                  <div key={gadget.id} className="relative flex flex-col w-1/2 md:w-64 shrink-0 items-center p-4 md:p-8 border-r border-zinc-100 last:border-r-0">
                     <button onClick={() => removeGadget(gadget.id)} className="absolute top-2 right-2 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-zinc-100 text-zinc-500 rounded-full hover:bg-red-500 hover:text-white transition-colors z-20">
                       <X size={14} />
                     </button>
                     <div className="h-28 md:h-40 w-full flex items-center justify-center mb-4 md:mb-6 mix-blend-multiply">
                        <img src={gadget.image} alt={gadget.name} className="max-h-full max-w-full object-contain drop-shadow-xl p-2" />
                     </div>
                     <h4 className="font-black text-dark md:text-lg text-center leading-tight mb-2 h-10 md:h-12 flex items-center text-sm">{gadget.name}</h4>
                     <NairaPrice amount={gadget.price * 1500} className="text-primary font-black md:text-xl text-sm mb-4 md:mb-6" />
                     <Link to={`/gadgets`} className="w-full py-2.5 md:py-3 bg-zinc-900 border text-white text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors text-center rounded-lg">View Details</Link>
                  </div>
                ))}

                {/* Add Slot */}
                {selectedGadgets.length < 2 && (
                  <div className="flex flex-col w-1/2 md:w-64 shrink-0 items-center justify-center p-4 md:p-8 bg-zinc-50/30">
                     <button onClick={() => setIsSelectorOpen(true)} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-dashed border-zinc-300 text-zinc-400 flex items-center justify-center hover:border-primary hover:text-primary transition-colors hover:bg-primary/5 mb-4">
                       <Plus size={20} className="md:w-6 md:h-6" />
                     </button>
                     <span className="text-xs md:text-sm font-bold text-muted text-center tracking-tight">Add gadget</span>
                  </div>
                )}
             </div>

             {/* Matrix Body */}
             <div className="flex flex-col w-full relative">
                
                {/* Generic System Row: Summary */}
                <div className="flex border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors w-full">
                   <div className="hidden md:flex w-64 shrink-0 p-6 border-r border-zinc-100 font-black text-dark items-center uppercase tracking-widest text-xs">Overview</div>
                   {selectedGadgets.map((gadget: any) => (
                     <div key={`summary-${gadget.id}`} className="w-1/2 md:w-64 shrink-0 p-4 md:p-6 border-r border-zinc-100 last:border-r-0 text-xs md:text-sm font-medium text-muted leading-relaxed">
                       {/* Mobile Label Injection */}
                       <span className="md:hidden block text-[10px] sm:text-xs font-black text-dark uppercase tracking-widest mb-2 border-b border-zinc-100 pb-2">Overview</span>
                       {gadget.shortSummary || gadget.description.substring(0, 80) + '...'}
                     </div>
                   ))}
                   {selectedGadgets.length < 2 && <div className="w-1/2 md:w-64 shrink-0 p-6 bg-zinc-50/10 border-r border-transparent" />}
                </div>

                {/* Dynamic Spec Rows */}
                {allSpecKeys.map(key => (
                  <div key={key} className="flex border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors group w-full">
                     {/* Desktop Label */}
                     <div className="hidden md:flex w-64 shrink-0 p-6 border-r border-zinc-100 font-bold text-dark items-center text-sm">{key}</div>
                     
                     {/* Cells */}
                     {selectedGadgets.map((gadget: any) => {
                       const specValue = gadget.specs?.[key];
                       return (
                         <div key={`${key}-${gadget.id}`} className="w-1/2 md:w-64 shrink-0 p-4 md:p-6 border-r border-zinc-100 last:border-r-0 text-xs md:text-sm font-medium text-zinc-700 flex flex-col justify-center">
                           <span className="md:hidden block text-[10px] sm:text-xs font-black text-dark uppercase tracking-widest mb-2 border-b border-zinc-100 pb-2 break-all">{key}</span>
                           {specValue ? specValue : <span className="text-zinc-300 ">—</span>}
                         </div>
                       );
                     })}

                     {/* Filler cells for 'Add Slot' column */}
                     {selectedGadgets.length < 2 && <div className="w-1/2 md:w-64 shrink-0 p-6 bg-zinc-50/10 border-t border-transparent" />}
                  </div>
                ))}
                
             </div>

          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default ComparePage;
