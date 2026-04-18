import React from 'react';
import { Star, Users, ShieldCheck, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Star, value: '4,200+', label: 'Reviews This Month', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: Users, value: '12,800+', label: 'Nigerian Reviewers', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: ShieldCheck, value: '98%', label: 'Verified Purchases', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: TrendingUp, value: '350+', label: 'Gadgets Reviewed', color: 'text-[#e85d2c]', bg: 'bg-orange-50' },
];

const SocialProofStrip: React.FC = () => {
  return (
    <div className="bg-white border-y border-zinc-100">
      <div className="container mx-auto px-4 py-6">
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
