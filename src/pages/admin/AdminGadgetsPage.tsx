import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminGadgetForm from '../../components/admin/AdminGadgetForm';
import type { Gadget } from '../../types';
import { getApiUrl } from '../../utils/api';
import { getImageUrl } from '../../utils/image';

const AdminGadgetsPage: React.FC = () => {
  const [gadgetList, setGadgetList] = useState<Gadget[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGadget, setEditingGadget] = useState<Gadget | null>(null);

  const fetchGadgets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/gadgets'));
      const data = await response.json();
      if (data.success) {
        setGadgetList(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to load gadgets.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGadgets();
  }, []);

  const handleSaveGadget = async (gadgetData: any) => {
    try {
      const isUpdate = !!gadgetData.id;
      const url = isUpdate ? getApiUrl(`/api/gadgets/${gadgetData.id}`) : getApiUrl('/api/gadgets');
      const method = isUpdate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        },
        body: JSON.stringify(gadgetData)
      });

      const data = await response.json();
      if (data.success) {
        if (isUpdate) {
          setGadgetList(gadgetList.map(g => g.id === data.data.id ? data.data : g));
        } else {
          setGadgetList([data.data, ...gadgetList]);
        }
        setIsFormOpen(false);
        setEditingGadget(null);
      } else {
        alert(data.message || 'Error saving gadget');
      }
    } catch (err) {
      alert('Network error while saving gadget');
    }
  };

  const handleEdit = (gadget: Gadget) => {
    setEditingGadget(gadget);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingGadget(null);
    setIsFormOpen(true);
  };

  const filteredGadgets = gadgetList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this gadget?')) return;
    
    try {
      const response = await fetch(getApiUrl(`/api/gadgets/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setGadgetList(gadgetList.filter(p => p.id !== id));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error deleting gadget');
    }
  };

  const categories = ['All', ...new Set(gadgetList.map(p => p.category?.name).filter(Boolean))] as string[];

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">Gadget Management</h1>
            <p className="text-zinc-500 text-sm font-medium">Manage your gadget catalog, specs, and local pricing.</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white font-black text-sm rounded-2xl hover:bg-black transition-all shadow-xl shadow-zinc-900/10 shrink-0"
          >
            <Plus size={18} />
            Add New Gadget
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search gadgets by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/30 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/30 focus:bg-white transition-all text-sm font-bold text-zinc-600 appearance-none min-w-[140px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600">
            <AlertCircle size={24} />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {/* Gadgets Table */}
        <div className="bg-white border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-100">
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Gadget</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Base Price</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                       <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                       <p className="text-zinc-400 font-bold">Synchronizing catalog...</p>
                    </td>
                  </tr>
                ) : filteredGadgets.map((gadget) => (
                  <tr key={gadget.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-100 p-1 shrink-0 overflow-hidden">
                          <img src={getImageUrl(gadget.image)} alt={gadget.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900 leading-none mb-1">{gadget.name}</p>
                          <p className="text-[10px] text-zinc-400 font-medium truncate max-w-[150px]">ID: {gadget.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {gadget.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-zinc-900">
                      ${gadget.price ?? 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(gadget)}
                          className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-lg transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(gadget.id)}
                          className="p-2 text-zinc-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {!isLoading && filteredGadgets.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                <Search size={24} className="text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">No gadgets found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>

      <AdminGadgetForm 
        isOpen={isFormOpen} 
        onClose={() => { setIsFormOpen(false); setEditingGadget(null); }}
        onSave={handleSaveGadget}
        gadget={editingGadget}
      />
    </AdminLayout>
  );
};

export default AdminGadgetsPage;
