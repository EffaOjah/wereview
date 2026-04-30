import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown, Heart } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, openModal, logout } = useAuthModal();

  return (
    <header className="bg-[#f9f8f8] border-b border-zinc-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">

        {/* Left: Logo */}
        <Link to="/" className="text-[26px] font-black text-primary tracking-tight hover:opacity-90 transition-opacity">
          GadgetHub
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className={`text-[13px] font-black uppercase tracking-[2px] transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-zinc-900 hover:text-primary'}`}>HOME</Link>
          <Link to="/reviews" className={`text-[13px] font-black uppercase tracking-[2px] transition-colors ${location.pathname === '/reviews' ? 'text-primary' : 'text-zinc-900 hover:text-primary'}`}>REVIEWS</Link>
          <Link to="/compare" className={`text-[13px] font-black uppercase tracking-[2px] transition-colors ${location.pathname === '/compare' ? 'text-primary' : 'text-zinc-900 hover:text-primary'}`}>COMPARE</Link>
          <Link to="/blog" className={`text-[13px] font-black uppercase tracking-[2px] transition-colors ${location.pathname === '/blog' ? 'text-primary' : 'text-zinc-900 hover:text-primary'}`}>BLOG</Link>
          <Link to="/sellers" className={`text-[13px] font-black uppercase tracking-[2px] transition-colors ${location.pathname === '/sellers' ? 'text-primary' : 'text-zinc-900 hover:text-primary'}`}>SELLERS</Link>
          <Link to="/gadgets" className={`text-[13px] font-black uppercase tracking-[2px] transition-colors ${location.pathname === '/gadgets' ? 'text-primary' : 'text-zinc-900 hover:text-primary'}`}>GADGETS</Link>
        </nav>

        {/* Right: Wishlist & Auth (Desktop) */}
        <div className="hidden lg:flex items-center gap-5">

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className={`relative flex items-center gap-1.5 group transition-colors ${location.pathname === '/wishlist' ? 'text-primary' : 'text-zinc-600 hover:text-primary'}`}
          >
            <Heart
              size={22}
              strokeWidth={2}
              className={`transition-all group-hover:scale-110 ${location.pathname === '/wishlist' ? 'fill-primary text-primary' : ''}`}
            />
            <span className="text-sm font-bold hidden xl:inline">Wishlist</span>
          </Link>

          {/* Divider */}
          <span className="text-zinc-300 font-light text-xl">|</span>

          {/* Auth Section */}
          {user ? (
            <div className="group relative cursor-pointer flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="text-sm font-bold text-dark">{user.name.split(' ')[0]}</span>
              <ChevronDown size={14} className="text-zinc-500" />

              <ul className="absolute right-0 top-full mt-4 bg-white border border-zinc-200 text-dark w-40 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg rounded-xl z-50 overflow-hidden">
                <li className="px-4 py-2.5 hover:bg-zinc-50 text-sm font-bold cursor-pointer transition-colors border-b border-zinc-50">
                  <Link to="/profile">My Profile</Link>
                </li>
                <li
                  onClick={logout}
                  className="px-4 py-2.5 hover:bg-red-50 text-sm font-bold text-red-600 cursor-pointer transition-colors"
                >
                  Logout
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => openModal('login')}
              className="flex items-center gap-2 text-sm font-medium text-zinc-800 hover:text-primary transition-colors cursor-pointer outline-none"
            >
              <User size={16} className="fill-zinc-800" strokeWidth={2} /> Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-white z-[999] transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4 border-b flex justify-between items-center bg-[#f9f8f8]">
          <Link to="/" className="text-2xl font-black text-primary" onClick={() => setIsMobileMenuOpen(false)}>GadgetHub</Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white rounded-full shadow-sm"><X size={24} /></button>
        </div>
        <div className="flex flex-col p-6 gap-6">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-zinc-900">HOME</Link>
          <Link to="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-zinc-900">REVIEWS</Link>
          <Link to="/compare" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-zinc-900">COMPARE</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-zinc-900">BLOG</Link>
          <Link to="/sellers" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-zinc-900">SELLERS</Link>
          <Link to="/gadgets" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-zinc-900">GADGETS</Link>
          <Link
            to="/wishlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-lg font-black uppercase tracking-widest flex items-center gap-2 ${location.pathname === '/wishlist' ? 'text-primary' : 'text-zinc-900'}`}
          >
            <Heart size={18} className={location.pathname === '/wishlist' ? 'fill-primary' : ''} /> WISHLIST
          </Link>

          <div className="w-full h-px bg-zinc-100 my-2" />

          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xl">
                  {user.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black text-dark leading-tight">{user.name}</span>
                  <span className="text-xs font-bold text-muted">{user.email}</span>
                </div>
              </div>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest text-zinc-900 px-2">MY PROFILE</Link>
              <button
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="text-lg font-black uppercase tracking-widest text-red-600 px-2 text-left"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setIsMobileMenuOpen(false); openModal('login'); }}
              className="text-lg font-black uppercase tracking-widest text-primary flex items-center gap-2 outline-none text-left"
            >
              <User size={20} className="fill-primary" /> Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
