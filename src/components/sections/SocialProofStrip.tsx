import React from 'react';
import { Users, ShieldCheck, TrendingUp, MessageSquare } from 'lucide-react';

const stats = [
  { icon: ShieldCheck, value: '100%', label: 'Verified Sellers', color: 'text-primary', bg: 'bg-primary/5' },
  { icon: TrendingUp, value: '100%', label: 'Accurate Pricing', color: 'text-primary', bg: 'bg-primary/5' },
  { icon: MessageSquare, value: '5k+', label: 'Trusted Reviews', color: 'text-primary', bg: 'bg-primary/5' },
  { icon: Users, value: '10k+', label: 'Smarter Decisions', color: 'text-primary', bg: 'bg-primary/5' },
];

const SocialProofStrip: React.FC = () => {
  return (
    <div className="bg-white border-y border-zinc-100">
      <div className="container py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map(({ icon: Icon, value, label, color, bg }) => (
            <div key={label} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} className={color} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-dark leading-none">{value}</span>
                <span className="text-xs font-bold text-muted mt-1">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProofStrip;
