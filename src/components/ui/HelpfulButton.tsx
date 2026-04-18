import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';

interface HelpfulButtonProps {
  initialCount: number;
}

const HelpfulButton: React.FC<HelpfulButtonProps> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  const [isHelpful, setIsHelpful] = useState(false);

  const toggleHelpful = () => {
    if (isHelpful) {
      setCount(prev => prev - 1);
      setIsHelpful(false);
    } else {
      setCount(prev => prev + 1);
      setIsHelpful(true);
    }
  };

  return (
    <button 
      onClick={toggleHelpful}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
        isHelpful 
          ? 'bg-primary/20 text-primary-dark border border-primary/30 shadow-sm' 
          : 'bg-white text-muted border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300'
      }`}
    >
      <ThumbsUp size={16} className={isHelpful ? "fill-primary text-primary" : ""} />
      Helpful ({count})
    </button>
  );
};

export default HelpfulButton;
