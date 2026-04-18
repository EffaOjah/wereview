import React from 'react';

interface NairaPriceProps {
  amount: number;
  className?: string;
  showCurrency?: boolean;
}

const NairaPrice: React.FC<NairaPriceProps> = ({ amount, className = '', showCurrency = true }) => {
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);

  return (
    <span className={`inline-flex items-center font-bold font-outfit ${className}`}>
      {showCurrency && <span className="mr-0.5">₦</span>}
      {formattedAmount}
    </span>
  );
};

export default NairaPrice;
