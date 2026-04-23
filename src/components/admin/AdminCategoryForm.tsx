import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import type { Category } from '../../types';

interface AdminCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  category?: Category | null;
}

const AdminCategoryForm: React.FC<AdminCategoryFormProps> = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    image: '',
    badges: [],
  });

  const [newBadge, setNewBadge] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        id: 'c' + Math.random().toString(36).substr(2, 4),
        name: '',
        image: '',
        badges: [],
      });
    }
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onSave(formData as Category);
      setIsLoading(false);
      onClose();
    }, 800);
  };

  const handleAddBadge = () => {
    if (newBadge && !formData.badges?.includes(newBadge)) {
      setFormData({
        ...formData,
        badges: [...(formData.badges || []), newBadge]
      });
      setNewBadge('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-8 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-black text-zinc-900">{category ? 'Edit Category' : 'New Category'}</h2>
            <p className="text-zinc-500 text-xs font-medium mt-1">Configure site category and badges.</p>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-900 ml-1">Category Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Smart Home"
              className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-900 ml-1">Cover Image URL</label>
            <div className="flex gap-4">
              <div className="relative flex-grow">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
                  required
                />
              </div>
              <div className="w-14 h-14 rounded-2xl border border-zinc-200 overflow-hidden bg-zinc-50 shrink-0">
                {formData.image && <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-900 ml-1">Badges & Tags</label>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                placeholder="e.g. ⭐ New" 
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBadge())}
                className="flex-grow px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm font-medium"
              />
              <button 
                type="button" 
                onClick={handleAddBadge}
                className="p-3 bg-zinc-900 text-white rounded-2xl hover:bg-black transition-all"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.badges?.map((badge, idx) => (
                <span key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {badge}
                  <button type="button" onClick={() => setFormData({...formData, badges: formData.badges?.filter((_, i) => i !== idx)})}><X size={10} /></button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
             <button 
               type="button" 
               onClick={onClose}
               className="flex-1 py-4 bg-white border border-zinc-200 text-zinc-900 font-black text-sm rounded-2xl hover:bg-zinc-100 transition-all"
             >
               Discard
             </button>
             <button 
               type="submit"
               disabled={isLoading}
               className="flex-[2] py-4 bg-zinc-900 text-white font-black text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-zinc-900/10 flex items-center justify-center gap-3 disabled:opacity-70"
             >
               {isLoading ? <Loader2 className="animate-spin" size={18} /> : <><Check size={18} /> {category ? 'Update' : 'Create'}</>}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCategoryForm;
