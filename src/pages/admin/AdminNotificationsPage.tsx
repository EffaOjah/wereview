import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Info, AlertTriangle, AlertCircle, CheckCircle2, Search } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import type { AdminNotification } from '../../types';

const initialNotifications: AdminNotification[] = [
  { id: 'n1', title: 'New Review Submitted', message: 'A new review has been posted for Samsung Galaxy A54 5G.', type: 'info', date: '2 mins ago', isRead: false, link: '/admin/reviews' },
  { id: 'n2', title: 'User Flagged Content', message: 'A review has been flagged for inappropriate content by Chinedu Eze.', type: 'warning', date: '45 mins ago', isRead: false, link: '/admin/reviews?status=Flagged' },
  { id: 'n3', title: 'System Update Successful', message: 'The platform has been updated to v2.4.0 successfully.', type: 'success', date: '3 hours ago', isRead: true },
  { id: 'n4', title: 'High Server Load', message: 'Database query latency is higher than normal. Monitoring...', type: 'error', date: '5 hours ago', isRead: true },
  { id: 'n5', title: 'New User Registered', message: 'Tobi A. just joined the GadgetHub community.', type: 'info', date: '1 day ago', isRead: true },
];

const AdminNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gadgethub_notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      setNotifications(initialNotifications);
      localStorage.setItem('gadgethub_notifications', JSON.stringify(initialNotifications));
    }
  }, []);

  const handleToggleRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, isRead: !n.isRead } : n
    );
    setNotifications(updated);
    localStorage.setItem('gadgethub_notifications', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('gadgethub_notifications', JSON.stringify(updated));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
    localStorage.setItem('gadgethub_notifications', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all notifications? This action cannot be undone.')) {
      setNotifications([]);
      localStorage.setItem('gadgethub_notifications', JSON.stringify([]));
    }
  };

  const filteredNotifications = notifications.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-green-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={20} />;
      case 'error': return <AlertCircle className="text-red-500" size={20} />;
      default: return <Info className="text-primary" size={20} />;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-12 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1">Notification Center</h1>
            <p className="text-zinc-500 text-sm font-medium">Keep track of system alerts and community activity.</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={handleMarkAllRead}
               className="px-5 py-2.5 bg-zinc-100 text-zinc-600 font-bold text-xs rounded-xl hover:bg-zinc-200 transition-all flex items-center gap-2"
             >
                <Check size={14} />
                Mark all Read
             </button>
             <button 
               onClick={handleClearAll}
               className="px-5 py-2.5 bg-red-50 text-red-600 font-bold text-xs rounded-xl hover:bg-red-100 transition-all flex items-center gap-2"
             >
                <Trash2 size={14} />
                Clear All
             </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative group mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search alerts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl outline-none focus:border-primary/50 transition-all text-sm font-medium"
          />
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`group flex items-start gap-4 p-5 rounded-[1.5rem] border transition-all ${
                notif.isRead 
                ? 'bg-zinc-50/50 border-transparent text-zinc-500' 
                : 'bg-white border-zinc-100 shadow-sm text-zinc-900'
              }`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                notif.isRead ? 'bg-zinc-100' : 'bg-zinc-50'
              }`}>
                {getIcon(notif.type)}
              </div>
              
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-black truncate ${notif.isRead ? 'text-zinc-500' : 'text-zinc-900'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[10px] font-bold text-zinc-400 shrink-0 ml-4">{notif.date}</span>
                </div>
                <p className="text-xs font-medium leading-relaxed opacity-80 mb-3">{notif.message}</p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleToggleRead(notif.id)}
                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                  >
                    {notif.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                  {notif.link && (
                    <a href={notif.link} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 flex items-center gap-1">
                       View Details
                    </a>
                  )}
                </div>
              </div>

              <button 
                onClick={() => handleDelete(notif.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-zinc-300 hover:text-red-500 transition-all shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="p-20 text-center bg-zinc-50/50 border border-dashed border-zinc-200 rounded-[3rem]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-100 shadow-sm text-zinc-200">
                <Bell size={24} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">All caught up!</h3>
              <p className="text-zinc-500 text-sm">No new notifications to show right now.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationsPage;

