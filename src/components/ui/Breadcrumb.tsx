import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  title: string;
  items: { name: string; path: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, items }) => {
  return (
    <section className="breadcrumb-section relative py-20 overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600')" }}></div>
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-wider">{title}</h2>
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={14} className="text-zinc-400" />
                {idx === items.length - 1 ? (
                  <span className="text-zinc-400">{item.name}</span>
                ) : (
                  <Link to={item.path} className="hover:text-primary transition-colors">{item.name}</Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
