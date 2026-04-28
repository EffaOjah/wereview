import React, { useState, useEffect } from 'react';
import { Search, UserCheck, UserX, Calendar, MessageSquare, ExternalLink, Shield } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import type { User } from '../../types';

const initialUsers: User[] = [
  { id: 'u1', name: 'Effa Ojah', email: 'effa.ojah@example.com', role: 'admin', status: 'active', joinDate: 'Jan 12, 2024', reviewCount: 15, avatar: 'https://i.pravatar.cc/150?u=effa' },
  { id: 'u2', name: 'Chinedu Eze', email: 'chinedu.eze@example.com', role: 'user', status: 'active', joinDate: 'Feb 05, 2024', reviewCount: 8, avatar: 'https://i.pravatar.cc/150?u=chinedu' },
  { id: 'u3', name: 'Amina Bello', email: 'amina.b@example.com', role: 'user', status: 'active', joinDate: 'Mar 18, 2024', reviewCount: 12, avatar: 'https://i.pravatar.cc/150?u=amina' },
  { id: 'u4', name: 'Tunde Badmus', email: 'tunde.badmus@example.com', role: 'user', status: 'suspended', joinDate: 'Apr 02, 2024', reviewCount: 3, avatar: 'https://i.pravatar.cc/150?u=tunde' },
  { id: 'u5', name: 'Nneka Nwosu', email: 'nneka.nwosu@example.com', role: 'user', status: 'active', joinDate: 'May 10, 2024', reviewCount: 5, avatar: 'https://i.pravatar.cc/150?u=nneka' },
  { id: 'u6', name: 'Tobi A.', email: 'tobi.a@example.com', role: 'user', status: 'active', joinDate: 'Jun 22, 2024', reviewCount: 2, avatar: 'https://i.pravatar.cc/150?u=tobi' },
];

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'active' | 'suspended'>('All');

  useEffect(() => {
    const savedUsers = localStorage.getItem('gadgethub_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(initialUsers);
      localStorage.setItem('gadgethub_users', JSON.stringify(initialUsers));
    }
  }, []);

  const handleToggleStatus = (id: string) => {
    const updated = users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'active' ? 'suspended' : 'active';
        return { ...u, status: newStatus as 'active' | 'suspended' };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('gadgethub_users', JSON.stringify(updated));
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
                 <img key={u.id} className="inline-block h-10 w-10 rounded-full ring-4 ring-white" src={u.avatar} alt={u.name} />
               ))}
               <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 ring-4 ring-white text-[10px] font-black text-zinc-400">
                 +{users.length - 4}
               </div>
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
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-zinc-900 leading-none mb-1">{user.name}</p>
                          <p className="text-[10px] text-zinc-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'admin' ? (
                          <Shield size={14} className="text-primary" />
                        ) : (
                          <Shield size={14} className="text-zinc-300" />
                        )}
                        <span className={`text-[10px] font-black uppercase tracking-wider ${user.role === 'admin' ? 'text-primary' : 'text-zinc-500'}`}>
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
                        <span className="text-xs font-bold text-zinc-600">{user.joinDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <MessageSquare size={14} />
                        <span className="text-xs font-bold text-zinc-900">{user.reviewCount}</span>
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

          {filteredUsers.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-100">
                <Search size={24} className="text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">No users found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your search or status filter.</p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
           <div className="bg-white border border-zinc-200 p-6 rounded-3xl">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">New Users (This Month)</p>
              <h4 className="text-2xl font-black text-zinc-900">24</h4>
              <p className="text-[10px] text-green-600 font-bold mt-2">+12% from last month</p>
           </div>
           <div className="bg-white border border-zinc-200 p-6 rounded-3xl">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Active Contributors</p>
              <h4 className="text-2xl font-black text-zinc-900">156</h4>
              <p className="text-[10px] text-primary font-bold mt-2">65% of total users</p>
           </div>
           <div className="bg-white border border-zinc-200 p-6 rounded-3xl">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Reported Users</p>
              <h4 className="text-2xl font-black text-red-600">3</h4>
              <p className="text-[10px] text-zinc-400 font-bold mt-2">Requires immediate attention</p>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;

