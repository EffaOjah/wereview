import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const techCategories = [
  'All Categories',
  'Smartphones',
  'Laptops & PCs',
  'Audio & Headphones',
  'Tablets',
  'Smartwatches',
  'Gaming Consoles',
  'Cameras',
];

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedCategory && selectedCategory !== 'All Categories') params.set('category', selectedCategory);
    
    navigate(`/products?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-0 border border-zinc-200 rounded-lg bg-white overflow-visible h-[55px] shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        
        {/* Category Dropdown Trigger */}
        <div
          ref={dropdownRef}
          className="relative flex items-center gap-2 px-3 md:px-5 h-full border-r border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-colors whitespace-nowrap min-w-[110px] md:min-w-[190px] select-none shrink-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-dark font-bold text-xs md:text-sm flex-grow truncate max-w-[80px] md:max-w-none">{selectedCategory}</span>
          <ChevronDown
            size={14}
            className={`text-muted transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          />

          {/* Dropdown List */}
          {isOpen && (
            <ul className="absolute left-0 top-[calc(100%+8px)] min-w-[220px] bg-white border border-zinc-200 rounded-xl shadow-xl z-[100] py-2 overflow-hidden">
              {techCategories.map((cat) => (
                <li
                  key={cat}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(cat);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary/5 text-primary font-bold'
                      : 'text-dark hover:bg-zinc-50'
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && <Check size={14} className="text-primary" />}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Input */}
        <div className="flex-grow h-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="What gadget are you looking for?"
            className="w-full h-full px-5 outline-none text-dark bg-transparent text-sm"
          />
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="bg-dark hover:bg-primary text-white px-5 sm:px-8 h-full font-bold uppercase tracking-widest transition-colors flex items-center gap-2 rounded-r-lg"
        >
          <Search size={18} />
          <span className="hidden sm:inline text-sm">Search</span>
        </button>

      </div>
    </div>
  );
};

export default SearchBar;
