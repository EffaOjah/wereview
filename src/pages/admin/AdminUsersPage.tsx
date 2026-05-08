import React, { useState, useEffect } from 'react';
import { Search, UserCheck, UserX, Calendar, MessageSquare, ExternalLink, Shield, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getApiUrl } from '../../utils/api';

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'active' | 'suspended'>('All');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl('/api/admin/users'), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch platform users.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await fetch(getApiUrl(`/api/admin/toggle-user-status/${id}`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('gadgethub_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(users.map(u => u.id === id ? data.data : u));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error updating user status');
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">User Management</h1>
            <p className="text-zinc-500 text-sm font-medium">Manage platform members, assign roles, and handle suspensions.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex -space-x-3 overflow-hidden">
               {users.slice(0, 4).map(u => (
                 <img key={u.id} className="inline-block h-10 w-10 rounded-full ring-4 ring-white" src={u.avatar || 'https://i.pravatar.cc/150?u=placeholder'} alt={u.name} />
               ))}
               {users.length > 4 && (
                 <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 ring-4 ring-white text-[10px] font-black text-zinc-400">
                   +{users.length - 4}
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/30 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-primary/30 focus:bg-white transition-all text-sm font-bold text-zinc-600 appearance-none min-w-[140px]"
            >
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600">
            <AlertCircle size={24} />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-100">
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">User</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Join Date</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Reviews</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                       <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                       <p className="text-zinc-400 font-bold">Synchronizing user data...</p>
                    </td>
                  </tr>
                ) : filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={user.avatar || 'https://i.pravatar.cc/150?u=placeholder'} alt={user.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-zinc-900 leading-none mb-1">{user.name}</p>
                          <p className="text-[10px] text-zinc-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'ADMIN' ? (
                          <Shield size={14} className="text-primary" />
                        ) : (
                          <Shield size={14} className="text-zinc-300" />
                        )}
                        <span className={`text-[10px] font-black uppercase tracking-wider ${user.role === 'ADMIN' ? 'text-primary' : 'text-zinc-500'}`}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        user.status === 'active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Calendar size={14} />
                        <span className="text-xs font-bold text-zinc-600">{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <MessageSquare size={14} />
                        <span className="text-xs font-bold text-zinc-900">{user._count?.reviews || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleToggleStatus(user.id)}
                          className={`p-2 rounded-lg transition-all ${
                            user.status === 'active' 
                            ? 'text-zinc-400 hover:text-red-500 hover:bg-red-50' 
                            : 'text-green-500 hover:bg-green-50'
                          }`}
                          title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                        >
                          {user.status === 'active' ? <UserX size={18} /> : <UserCheck size={18} />}
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-lg transition-all">
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isLoading && filteredUsers.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                <Search size={24} className="text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">No users found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your search or status filter.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
