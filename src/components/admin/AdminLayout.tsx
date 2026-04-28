import React, { useState, useEffect, type ReactNode } from 'react';
import { LayoutDashboard, Package, MessageSquare, Users, Tags, Settings, LogOut, Bell, Search, Menu, X, Info, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import type { AdminNotification } from '../../types';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout, user } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Notification State
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gadgethub_notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, [location.pathname]); // Refresh when navigating

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    setNotifications(updated);
    localStorage.setItem('gadgethub_notifications', JSON.stringify(updated));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-green-500" size={16} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={16} />;
      case 'error': return <AlertCircle className="text-red-500" size={16} />;
      default: return <Info className="text-primary" size={16} />;
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Gadgets', path: '/admin/gadgets' },
    { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Tags, label: 'Categories', path: '/admin/categories' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-outfit flex overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-zinc-200 flex flex-col p-6 z-[70] transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-10 px-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight text-zinc-900">Admin<span className="text-primary">Panel</span></span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-zinc-400 hover:text-zinc-900"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-grow space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.label}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-900/10' 
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-500 font-bold text-sm transition-colors"
          >
            <LogOut size={18} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-4 md:px-8 lg:px-12 shrink-0 z-50">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-zinc-600 hover:bg-zinc-50 rounded-lg"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex-1 max-w-md hidden md:flex items-center bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-2 group focus-within:border-primary/50 transition-all">
              <Search className="text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-3 text-sm font-medium w-full text-zinc-900" />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            {/* Notification Dropdown Container */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative p-2 rounded-xl transition-all ${isNotifOpen ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-zinc-900 text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)} />
                  <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-zinc-100 rounded-[2rem] shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-6 border-b border-zinc-50 flex items-center justify-between">
                       <h3 className="font-black text-sm text-zinc-900">Notifications</h3>
                       <Link to="/admin/notifications" onClick={() => setIsNotifOpen(false)} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.slice(0, 5).map(notif => (
                          <div 
                            key={notif.id} 
                            onClick={() => { markAsRead(notif.id); if(notif.link) navigate(notif.link); setIsNotifOpen(false); }}
                            className={`p-4 flex gap-4 hover:bg-zinc-50 cursor-pointer transition-colors border-b border-zinc-50 last:border-0 ${notif.isRead ? 'opacity-60' : ''}`}
                          >
                             <div className="shrink-0 w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center">
                               {getIcon(notif.type)}
                             </div>
                             <div className="flex-1 min-w-0">
                               <p className="text-xs font-black text-zinc-900 truncate">{notif.title}</p>
                               <p className="text-[10px] font-medium text-zinc-500 line-clamp-2 mt-0.5">{notif.message}</p>
                               <p className="text-[9px] font-bold text-zinc-400 mt-2">{notif.date}</p>
                             </div>
                             {!notif.isRead && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />}
                          </div>
                        ))
                      ) : (
                        <div className="p-10 text-center">
                           <p className="text-xs font-bold text-zinc-400">No notifications yet</p>
                        </div>
                      )}
                    </div>
                    {notifications.length > 5 && (
                      <div className="p-4 bg-zinc-50 text-center">
                         <Link to="/admin/notifications" onClick={() => setIsNotifOpen(false)} className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-zinc-900 transition-colors">See {notifications.length - 5} more notifications</Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden xl:block">
                <p className="text-sm font-black text-zinc-900 leading-none">{user?.name || 'System Admin'}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden shrink-0">
                 <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-black">
                   {user?.name?.charAt(0) || 'A'}
                 </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

