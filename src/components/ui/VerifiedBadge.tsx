import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface VerifiedBadgeProps {
  className?: string;
  showText?: boolean;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ className = '', showText = true }) => {
  return (
    <div className={`inline-flex items-center gap-1.5 text-emerald-600 ${className}`}>
      <CheckCircle2 size={16} className="fill-emerald-100" />
      {showText && <span className="text-xs font-bold uppercase tracking-wider">Verified Purchase</span>}
    </div>
  );
};

export default VerifiedBadge;
