import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, LayoutGrid, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminCategoryForm from '../../components/admin/AdminCategoryForm';
import type { Category } from '../../types';
import { getApiUrl } from '../../utils/api';

const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/categories'));
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load categories.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSaveCategory = async (categoryData: any) => {
    try {
      const isUpdate = !!categoryData.id;
      const url = isUpdate ? getApiUrl(`/api/categories/${categoryData.id}`) : getApiUrl('/api/categories');
      const method = isUpdate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        },
        body: JSON.stringify(categoryData)
      });

      const data = await response.json();
      if (data.success) {
        if (isUpdate) {
          setCategories(categories.map(c => c.id === data.data.id ? data.data : c));
        } else {
          setCategories([...categories, data.data]);
        }
        setIsFormOpen(false);
        setEditingCategory(null);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error saving category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category? All gadgets in this category will become uncategorized.')) return;
    
    try {
      const response = await fetch(getApiUrl(`/api/categories/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(categories.filter(c => c.id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error deleting category');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">Category Management</h1>
            <p className="text-zinc-500 text-sm font-medium">Organize your gadgets with custom categories and highlight tags.</p>
          </div>
          <button 
            onClick={() => { setEditingCategory(null); setIsFormOpen(true); }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white font-black text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-zinc-900/10 shrink-0"
          >
            <Plus size={18} />
            Create Category
          </button>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600">
            <AlertCircle size={24} />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-zinc-400 font-bold">Fetching categories...</p>
          </div>
        ) : (
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
                    {category.badges?.map((badge, idx) => (
                      <span key={idx} className="px-2 py-1 bg-zinc-100 text-zinc-500 rounded-lg text-[9px] font-black uppercase tracking-wider border border-zinc-200/50">
                        {badge}
                      </span>
                    ))}
                    {(!category.badges || category.badges.length === 0) && <span className="text-[10px] text-zinc-300 font-bold uppercase ">No active tags</span>}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                    <div className="flex items-center gap-2">
                      <LayoutGrid size={14} className="text-zinc-400" />
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest truncate max-w-[80px]">ID: {category.id}</span>
                    </div>
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
        )}
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
