import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, LayoutGrid } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminCategoryForm from '../../components/admin/AdminCategoryForm';
import { categories as initialCategories } from '../../data/gadgets';
import type { Category } from '../../types';

const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const savedCategories = localStorage.getItem('gadgethub_categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(initialCategories);
      localStorage.setItem('gadgethub_categories', JSON.stringify(initialCategories));
    }
  }, []);

  const handleSaveCategory = (category: Category) => {
    let updated: Category[];
    if (categories.some(c => c.id === category.id)) {
      updated = categories.map(c => c.id === category.id ? category : c);
    } else {
      updated = [...categories, category];
    }
    setCategories(updated);
    localStorage.setItem('gadgethub_categories', JSON.stringify(updated));
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category? All Gadgets in this category will become uncategorized.')) {
      const updated = categories.filter(c => c.id !== id);
      setCategories(updated);
      localStorage.setItem('gadgethub_categories', JSON.stringify(updated));
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">Category & Tag Management</h1>
            <p className="text-zinc-500 text-sm font-medium">Organize your Gadgets with custom categories and highlight tags.</p>
          </div>
          <button 
            onClick={() => { setEditingCategory(null); setIsFormOpen(true); }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white font-black text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-zinc-900/10 shrink-0"
          >
            <Plus size={18} />
            Create Category
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white border border-zinc-200 rounded-[2rem] overflow-hidden group hover:shadow-xl hover:shadow-zinc-900/5 transition-all">
              <div className="h-40 relative">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute top-4 right-4 flex gap-2">
                   <button 
                     onClick={() => { setEditingCategory(category); setIsFormOpen(true); }}
                     className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white hover:text-zinc-900 transition-all"
                   >
                     <Edit2 size={16} />
                   </button>
                   <button 
                     onClick={() => handleDelete(category.id)}
                     className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-red-500 transition-all"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
                <div className="absolute bottom-4 left-6">
                   <h3 className="text-white font-black text-xl tracking-tight">{category.name}</h3>
                </div>
              </div>
              <div className="p-6">
                 <div className="flex flex-wrap gap-2 mb-4">
                    {category.badges.map((badge, idx) => (
                      <span key={idx} className="px-2 py-1 bg-zinc-100 text-zinc-500 rounded-lg text-[9px] font-black uppercase tracking-wider border border-zinc-200/50">
                        {badge}
                      </span>
                    ))}
                    {category.badges.length === 0 && <span className="text-[10px] text-zinc-300 font-bold uppercase ">No active tags</span>}
                 </div>
                 <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                    <div className="flex items-center gap-2">
                       <LayoutGrid size={14} className="text-zinc-400" />
                       <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">ID: {category.id}</span>
                    </div>
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
                      View Gadgets
                    </button>
                 </div>
              </div>
            </div>
          ))}

          {/* Add New Placeholder */}
          <button 
            onClick={() => { setEditingCategory(null); setIsFormOpen(true); }}
            className="border-2 border-dashed border-zinc-200 rounded-[2rem] flex flex-col items-center justify-center p-8 min-h-[280px] hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
             <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <Plus size={24} className="text-zinc-300 group-hover:text-primary transition-colors" />
             </div>
             <p className="text-sm font-black text-zinc-400 group-hover:text-primary transition-colors uppercase tracking-widest">Add Category</p>
          </button>
        </div>
      </div>

      <AdminCategoryForm 
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingCategory(null); }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </AdminLayout>
  );
};

export default AdminCategoriesPage;

