import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if we scroll past the hero banner or just 400px down
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-28 right-9 w-14 h-14 bg-dark text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-[90] focus:outline-none hover:bg-primary ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ChevronUp size={28} />
    </button>
  );
};

export default BackToTopButton;
