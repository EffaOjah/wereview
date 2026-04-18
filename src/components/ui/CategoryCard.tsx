import type { Category } from '../../types';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="categories__item group relative overflow-hidden bg-[hsl(26,100%,97%)] transition-all duration-300 hover:scale-105 cursor-pointer h-[270px]">
      {/* Badges */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
        {category.badges.map((badge, idx) => (
          <span 
            key={idx} 
            className={`text-[10px] px-2 py-0.5 rounded-full text-white font-bold whitespace-nowrap
              ${badge.includes('New') ? 'bg-red-500' : 
                badge.includes('Hottest') ? 'bg-info bg-cyan-500' : 
                'bg-primary'}`}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Image */}
      <div className="h-full w-full flex items-center justify-center p-8">
        <img 
          src={category.image} 
          alt={category.name} 
          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110" 
        />
      </div>

      {/* Title */}
      <div className="absolute left-0 bottom-5 w-full px-5 text-center">
        <h5 className="bg-white py-3 px-4 text-sm font-bold uppercase tracking-widest text-[#e85d2c] shadow-sm group-hover:bg-[#e85d2c] group-hover:text-white transition-colors cursor-pointer">
          <Link to={`/products?category=${encodeURIComponent(category.name)}`} className="block w-full h-full">{category.name}</Link>
        </h5>
      </div>
    </div>
  );
};

export default CategoryCard;
