import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminGadgetForm from '../../components/admin/AdminGadgetForm';
import { gadgets as initialGadgets } from '../../data/gadgets';
import type { Gadget } from '../../types';

const AdminGadgetsPage: React.FC = () => {
  const [gadgetList, setGadgetList] = useState<Gadget[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGadget, setEditingGadget] = useState<Gadget | null>(null);

  useEffect(() => {
    const savedGadgets = localStorage.getItem('gadgethub_gadgets');
    if (savedGadgets) {
      setGadgetList(JSON.parse(savedGadgets));
    } else {
      setGadgetList(initialGadgets);
      localStorage.setItem('gadgethub_gadgets', JSON.stringify(initialGadgets));
    }
  }, []);

  const handleSaveGadget = (gadget: Gadget) => {
    let updatedGadgets: Gadget[];
    if (gadgetList.some(p => p.id === gadget.id)) {
      // Update
      updatedGadgets = gadgetList.map(p => p.id === gadget.id ? gadget : p);
    } else {
      // Create
      updatedGadgets = [gadget, ...gadgetList];
    }
    
    setGadgetList(updatedGadgets);
    localStorage.setItem('gadgethub_gadgets', JSON.stringify(updatedGadgets));
    setIsFormOpen(false);
    setEditingGadget(null);
  };

  const handleEdit = (Gadget: Gadget) => {
    setEditingGadget(Gadget);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingGadget(null);
    setIsFormOpen(true);
  };

  const filteredGadgets = gadgetList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this gadget?')) {
      const updated = gadgetList.filter(p => p.id !== id);
      setGadgetList(updated);
      localStorage.setItem('gadgethub_gadgets', JSON.stringify(updated));
    }
  };

  const categories = ['All', ...new Set(gadgetList.map(p => p.category))] as string[];

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">Gadget Management</h1>
            <p className="text-zinc-500 text-sm font-medium">Manage your Gadget catalog, specs, and local pricing.</p>
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
              placeholder="Search Gadgets by name..." 
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

        {/* Gadgets Table */}
        <div className="bg-white border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-100">
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Gadget</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Price (USD)</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Avg. Naira</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filteredGadgets.map((gadget) => (
                  <tr key={gadget.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-100 p-1 shrink-0 overflow-hidden">
                          <img src={gadget.image} alt={gadget.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900 leading-none mb-1">{gadget.name}</p>
                          <p className="text-[10px] text-zinc-400 font-medium">ID: {gadget.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {gadget.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-zinc-900">
                      ${gadget.price}
                    </td>
                    <td className="px-6 py-4">
                       <span className="font-bold text-sm text-zinc-900">
                         ₦{gadget.nigerianPrices?.average?.toLocaleString() || 'N/A'}
                       </span>
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
          
          {filteredGadgets.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                <Search size={24} className="text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">No Gadgets found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>

      <AdminGadgetForm 
        isOpen={isFormOpen} 
        onClose={() => { setIsFormOpen(false); setEditingGadget(null); }}
        onSave={handleSaveGadget}
        Gadget={editingGadget}
      />
    </AdminLayout>
  );
};

export default AdminGadgetsPage;
