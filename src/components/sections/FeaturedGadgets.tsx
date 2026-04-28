import React, { useState } from 'react';
import { gadgets } from '../../data/gadgets';
import GadgetCard from '../ui/GadgetCard';

const FeaturedGadgets: React.FC = () => {
  const [filter, setFilter] = useState('*');

  const categories = [
    { name: 'All', value: '*' },
    { name: 'Gadgets', value: 'gadgets' },
    { name: 'Laptops', value: 'laptops' },
    { name: 'Headphones', value: 'headphones' },
  ];

  const filteredGadgets = filter === '*' 
    ? gadgets 
    : gadgets.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <section className="featured spad bg-white">
      <div className="container mx-auto px-4">
        <div className="section-title">
          <h2>Featured Gadget</h2>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-12">
          <ul className="flex flex-wrap gap-8 md:gap-12">
            {categories.map((cat) => (
              <li 
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`text-sm md:text-base font-bold uppercase tracking-widest cursor-pointer transition-all relative after:absolute after:left-0 after:-bottom-2 after:h-1 after:bg-primary after:transition-all ${
                  filter === cat.value ? 'text-dark after:w-full' : 'text-muted after:w-0 hover:text-primary'
                }`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Gadget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500">
           {filteredGadgets.map((gadget: any) => (
             <div key={gadget.id} className="animate-in fade-in duration-500">
                <GadgetCard gadget={gadget} />
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGadgets;
