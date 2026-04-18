import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { useCarousel } from '../../hooks/useCarousel';
import { Link } from 'react-router-dom';
import SearchBar from '../layout/SearchBar';

const HeroSlider: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(() => window.innerWidth >= 1024);

  const slides = [
    {
      title: "Real Reviews From Real Nigerians",
      subtitle: "Community Powered",
      description: "Don't guess. Read what thousands of Nigerians actually think before you buy.",
      image: "/img/hero/phone3.png",
      cta: "BROWSE REVIEWS",
      path: "/reviews"
    },
    {
      title: "What Does Nigeria Think?",
      subtitle: "Trusted Opinions",
      description: "Honest ratings on the gadgets that matter — phones, laptops, earbuds and more.",
      image: "/img/hero/tablet.png",
      cta: "SEE TOP RATED",
      path: "/products"
    },
    {
      title: "Find The Best Gadget For Your Budget",
      subtitle: "Nigerian Market Prices",
      description: "Compare Jumia, Konga, and Slot prices side by side. Never overpay again.",
      image: "/img/hero/cat-3.png",
      cta: "COMPARE PRICES",
      path: "/products"
    }
  ];

  const { currentIndex, goTo, onInteraction } = useCarousel({ itemCount: slides.length });

  const categories = [
    'Smartphones',
    'Laptops & PCs',
    'Audio & Headphones',
    'Tablets',
    'Smartwatches',
    'Gaming Consoles',
    'Cameras'
  ];

  return (
    <section className="hero pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Categories Sidebar — desktop only */}
          <div className="lg:w-1/4">
            <div className="hero__categories border border-zinc-200">
              <div
                className="bg-primary px-6 lg:px-10 py-3 text-white font-bold flex items-center gap-2.5 cursor-pointer"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                <Menu size={18} />
                <span className="uppercase tracking-widest text-sm">All Departments</span>
                <ChevronDown size={18} className={`ml-auto transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </div>
              <ul className={`bg-white py-2 transition-all overflow-hidden ${isCategoriesOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                {categories.map((cat, idx) => (
                  <li key={idx} className="px-6 lg:px-10 py-1 hover:bg-primary group transition-colors">
                    <Link 
                      to={`/products?category=${encodeURIComponent(cat)}`} 
                      className="text-dark group-hover:text-white text-sm font-bold block py-2"
                    >{cat}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-3/4 flex flex-col gap-4">

            {/* Search Bar */}
            <SearchBar />

            {/* Carousel */}
            <div className="relative bg-[hsl(26,100%,97%)] overflow-hidden rounded-sm">

              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 ease-in-out ${
                    idx === currentIndex ? 'block opacity-100' : 'hidden opacity-0'
                  }`}
                >
                  {/* md+ layout: side by side. Mobile: stacked */}
                  <div className="flex flex-col md:flex-row md:items-center py-8 px-6 md:px-10 md:py-10 lg:px-12 lg:py-12 gap-6 pb-10">
                    
                    {/* Image — top on mobile, right on tablet+ */}
                    <div className="flex justify-center md:order-2 md:w-1/2">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-48 md:max-h-[260px] lg:max-h-[300px] w-auto object-contain drop-shadow-xl"
                      />
                    </div>

                    {/* Text — bottom on mobile, left on tablet+ */}
                    <div className="md:order-1 md:w-1/2 flex flex-col items-start gap-3">
                      <span className="text-primary font-bold uppercase tracking-[4px] text-xs">{slide.subtitle}</span>
                      <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-dark leading-tight">{slide.title}</h2>
                      <p className="text-muted font-medium text-sm lg:text-base">{slide.description}</p>
                      <Link to={slide.path} className="primary-btn mt-2 inline-block">{slide.cta}</Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Indicators — absolute to carousel, bottom-center */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { goTo(idx); onInteraction(); }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-primary w-7' : 'bg-zinc-300 w-2'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
