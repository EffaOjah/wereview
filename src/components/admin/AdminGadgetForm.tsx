import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import type { Gadget, Category } from '../../types';
import { getApiUrl } from '../../utils/api';
import { getImageUrl } from '../../utils/image';

interface AdminGadgetFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (gadget: any) => void;
  gadget?: Gadget | null;
}

const AdminGadgetForm: React.FC<AdminGadgetFormProps> = ({ isOpen, onClose, onSave, gadget }) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    brand: '',
    categoryId: '',
    image: '',
    price: 0,
    description: '',
    specs: {},
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [newSpec, setNewSpec] = useState({ key: '', value: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(getApiUrl('/api/categories'));
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
          // Set default category if creating new
          if (!gadget && data.data.length > 0) {
            setFormData((prev: any) => ({ ...prev, categoryId: data.data[0].id }));
          }
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    if (isOpen) {
      fetchCategories();
      if (gadget) {
        setFormData({
          ...gadget,
          categoryId: gadget.categoryId || (gadget.category as any)?.id || ''
        });
      } else {
        setFormData({
          name: '',
          brand: '',
          categoryId: '',
          image: '',
          price: 0,
          description: '',
          specs: {},
        });
      }
    }
  }, [gadget, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Preparation for API: Strip out relations that shouldn't be sent to backend
    const { category, prices, nigerianPrices, reviews, sellers, ...cleanData } = formData;
    
    const finalData = {
      ...cleanData,
      price: formData.price ? Number(formData.price) : 0,
    };

    onSave(finalData);
    setIsLoading(false);
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
            <h2 className="text-xl font-black text-zinc-900">{gadget ? 'Edit Gadget' : 'Add New Gadget'}</h2>
            <p className="text-zinc-500 text-xs font-medium mt-1">Configure technical specs and pricing for this unit.</p>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Basic Info */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Core Identification</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-900 ml-1">Official Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Galaxy S24 Ultra"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-900 ml-1">Brand</label>
                <input 
                  type="text" 
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  placeholder="e.g. Apple, Samsung"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-xs font-bold text-zinc-900 ml-1">Category Group</label>
                <select 
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-900 ml-1">Primary Image URL</label>
              <div className="flex gap-4">
                <div className="relative flex-grow">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="url" 
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="Paste image URL or upload below..."
                    className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                    required
                  />
                </div>
                <div className="relative group">
                   <input 
                     type="file" 
                     id="image-upload"
                     className="hidden" 
                     accept="image/*"
                     onChange={async (e) => {
                       const file = e.target.files?.[0];
                       if (!file) return;

                       const formDataUpload = new FormData();
                       formDataUpload.append('image', file);

                       try {
                         setIsLoading(true);
                         const response = await fetch(getApiUrl('/api/upload'), {
                           method: 'POST',
                           headers: {
                             'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
                           },
                           body: formDataUpload
                         });
                         const data = await response.json();
                         if (data.success) {
                           setFormData((prev: any) => ({ ...prev, image: data.data.fullUrl }));
                         } else {
                           alert(data.message || 'Upload failed');
                         }
                       } catch (err) {
                         alert('Network error during upload');
                       } finally {
                         setIsLoading(false);
                       }
                     }}
                   />
                   <label 
                     htmlFor="image-upload"
                     className="px-6 py-3 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-black transition-all flex items-center gap-2 whitespace-nowrap"
                   >
                     {isLoading ? <Loader2 className="animate-spin" size={14} /> : <ImageIcon size={14} />}
                     Upload Image
                   </label>
                </div>
                <div className="w-12 h-12 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50 shrink-0">
                  {formData.image && <img src={getImageUrl(formData.image)} alt="Preview" className="w-full h-full object-cover" />}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-900 ml-1">Market Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                placeholder="A compelling summary of why this gadget matters..."
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                required
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="space-y-4">
             <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Pricing Strategy</h3>
             <div className="grid grid-cols-1 gap-4">
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-zinc-900 ml-1">Standard Price ($)</label>
                 <input 
                   type="number" 
                   value={formData.price}
                   onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                   className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-bold"
                   required
                 />
               </div>
             </div>
          </section>

          {/* Dynamic Specs */}
          <section className="space-y-4">
             <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Detailed Specifications</h3>
             <div className="flex gap-2 mb-4">
               <input 
                 type="text" 
                 placeholder="Feature (e.g. CPU)" 
                 value={newSpec.key}
                 onChange={(e) => setNewSpec({...newSpec, key: e.target.value})}
                 className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-medium"
               />
               <input 
                 type="text" 
                 placeholder="Value (e.g. A17 Pro)" 
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
               {Object.entries(formData.specs || {}).map(([key, val]: any) => (
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


        </form>

        <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 flex gap-4">
           <button 
             type="button" 
             onClick={onClose}
             className="flex-1 py-4 bg-white border border-zinc-200 text-zinc-900 font-black text-sm rounded-2xl hover:bg-zinc-100 transition-all"
           >
             Cancel
           </button>
           <button 
             onClick={handleSubmit}
             disabled={isLoading}
             className="flex-[2] py-4 bg-primary text-white font-black text-sm rounded-2xl hover:bg-zinc-900 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
           >
             {isLoading ? <Loader2 className="animate-spin" size={18} /> : <><Check size={18} /> {gadget ? 'Update Unit' : 'Publish Gadget'}</>}
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

export default AdminGadgetForm;
