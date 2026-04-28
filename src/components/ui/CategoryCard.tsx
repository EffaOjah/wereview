import React from 'react';
import type { Category } from '../../types';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/gadgets?category=${encodeURIComponent(category.name)}`}
      className="group flex flex-col items-center gap-4 transition-all duration-300 active:scale-95"
    >
      {/* Circle Image Container */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-zinc-100 border-2 border-transparent group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Text Label */}
      <div className="text-center">
        <h5 className="text-sm font-black text-dark uppercase tracking-widest group-hover:text-primary transition-colors">
          {category.name}
        </h5>
        {category.badges.length > 0 && (
          <span className="text-[9px] font-bold text-muted uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
            {category.badges[0]}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;
