import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import type { Product, NigerianPrices } from '../../types';

interface AdminProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'gadgets',
    image: '',
    price: 0,
    nigerianPrices: { jumia: 0, konga: 0, slot: 0, average: 0 },
    description: '',
    specs: {},
    badges: [],
    pros: [],
    cons: []
  });

  const [newSpec, setNewSpec] = useState({ key: '', value: '' });
  const [newBadge, setNewBadge] = useState('');
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        category: 'gadgets',
        image: '',
        rating: 0,
        price: 0,
        nigerianPrices: { jumia: 0, konga: 0, slot: 0, average: 0 },
        description: '',
        specs: {},
        badges: [],
        pros: [],
        cons: [],
        reviewCount: 0
      });
    }
  }, [product, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Calculate average Naira price automatically
    const prices = formData.nigerianPrices || {};
    const validPrices = [prices.jumia, prices.konga, prices.slot].filter(p => p && p > 0) as number[];
    const average = validPrices.length > 0 ? Math.round(validPrices.reduce((a, b) => a + b, 0) / validPrices.length) : 0;
    
    const finalProduct = {
      ...formData,
      nigerianPrices: { ...prices, average }
    } as Product;

    setTimeout(() => {
      onSave(finalProduct);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleSpecAdd = () => {
    if (newSpec.key && newSpec.value) {
      setFormData({
        ...formData,
        specs: { ...formData.specs, [newSpec.key]: newSpec.value }
      });
      setNewSpec({ key: '', value: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-slide-left">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-black text-zinc-900">{product ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="text-zinc-500 text-xs font-medium mt-1">Fill in the details to update your catalog.</p>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Basic Info */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-900 ml-1">Product Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. iPhone 15 Pro"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-900 ml-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                >
                  <option value="gadgets">Gadgets</option>
                  <option value="laptops">Laptops</option>
                  <option value="headphones">Headphones</option>
                  <option value="gaming">Gaming</option>
                  <option value="cameras">Cameras</option>
                  <option value="smartwatches">Smartwatches</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-900 ml-1">Image URL</label>
              <div className="flex gap-4">
                <div className="relative flex-grow">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                    required
                  />
                </div>
                <div className="w-12 h-12 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50 shrink-0">
                  {formData.image && <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-900 ml-1">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                placeholder="Brief overview of the product..."
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="space-y-4">
             <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Pricing (Global & Local)</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-zinc-900 ml-1">Base ($)</label>
                 <input 
                   type="number" 
                   value={formData.price}
                   onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                   className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                 />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-zinc-900 ml-1">Jumia (₦)</label>
                 <input 
                   type="number" 
                   value={formData.nigerianPrices?.jumia}
                   onChange={(e) => setFormData({...formData, nigerianPrices: {...formData.nigerianPrices!, jumia: Number(e.target.value)}})}
                   className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                 />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-zinc-900 ml-1">Konga (₦)</label>
                 <input 
                   type="number" 
                   value={formData.nigerianPrices?.konga}
                   onChange={(e) => setFormData({...formData, nigerianPrices: {...formData.nigerianPrices!, konga: Number(e.target.value)}})}
                   className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                 />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-zinc-900 ml-1">Slot (₦)</label>
                 <input 
                   type="number" 
                   value={formData.nigerianPrices?.slot}
                   onChange={(e) => setFormData({...formData, nigerianPrices: {...formData.nigerianPrices!, slot: Number(e.target.value)}})}
                   className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                 />
               </div>
             </div>
          </section>

          {/* Dynamic Specs */}
          <section className="space-y-4">
             <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Technical Specifications</h3>
             <div className="flex gap-2 mb-4">
               <input 
                 type="text" 
                 placeholder="Key (e.g. Battery)" 
                 value={newSpec.key}
                 onChange={(e) => setNewSpec({...newSpec, key: e.target.value})}
                 className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-medium"
               />
               <input 
                 type="text" 
                 placeholder="Value (e.g. 5000mAh)" 
                 value={newSpec.value}
                 onChange={(e) => setNewSpec({...newSpec, value: e.target.value})}
                 className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-medium"
               />
               <button 
                 type="button" 
                 onClick={handleSpecAdd}
                 className="p-3 bg-zinc-900 text-white rounded-2xl hover:bg-black transition-all"
               >
                 <Plus size={20} />
               </button>
             </div>
             <div className="grid grid-cols-2 gap-2">
               {Object.entries(formData.specs || {}).map(([key, val]) => (
                 <div key={key} className="flex items-center justify-between px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl group">
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black text-zinc-400 uppercase">{key}</span>
                     <span className="text-sm font-bold text-zinc-900">{val}</span>
                   </div>
                   <button 
                     type="button"
                     onClick={() => {
                       const next = { ...formData.specs };
                       delete next[key];
                       setFormData({ ...formData, specs: next });
                     }}
                     className="text-zinc-300 hover:text-red-500 transition-colors"
                   >
                     <Trash2 size={14} />
                   </button>
                 </div>
               ))}
             </div>
          </section>

          {/* Badges/Tags */}
          <section className="space-y-4 pb-12">
             <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Badges & Social</h3>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="Add badge (e.g. 🔥 Trending)" 
                 value={newBadge}
                 onChange={(e) => setNewBadge(e.target.value)}
                 onKeyPress={(e) => {
                   if (e.key === 'Enter') {
                     e.preventDefault();
                     if (newBadge) {
                       setFormData({...formData, badges: [...(formData.badges || []), newBadge]});
                       setNewBadge('');
                     }
                   }
                 }}
                 className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-medium"
               />
             </div>
             <div className="flex flex-wrap gap-2">
               {formData.badges?.map((badge, idx) => (
                 <span key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold">
                   {badge}
                   <button type="button" onClick={() => setFormData({...formData, badges: formData.badges?.filter((_, i) => i !== idx)})}><X size={12} /></button>
                 </span>
               ))}
             </div>
          </section>

        </form>

        <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 flex gap-4">
           <button 
             type="button" 
             onClick={onClose}
             className="flex-1 py-4 bg-white border border-zinc-200 text-zinc-900 font-black text-sm rounded-2xl hover:bg-zinc-100 transition-all"
           >
             Discard Changes
           </button>
           <button 
             onClick={handleSubmit}
             disabled={isLoading}
             className="flex-[2] py-4 bg-zinc-900 text-white font-black text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-zinc-900/10 flex items-center justify-center gap-3 disabled:opacity-70"
           >
             {isLoading ? <Loader2 className="animate-spin" size={18} /> : <><Check size={18} /> {product ? 'Save Changes' : 'Create Product'}</>}
           </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminProductForm;
