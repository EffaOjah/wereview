import React, { useState, useEffect } from 'react';
import { useGadgets } from '../../context/GadgetContext';
import { WifiOff, RefreshCw, X } from 'lucide-react';

const GlobalErrorBanner: React.FC = () => {
  const { error } = useGadgets();
  const [isDismissed, setIsDismissed] = useState(false);

  // Re-show banner if a new error arrives
  useEffect(() => {
    if (error) setIsDismissed(false);
  }, [error]);

  if (!error || isDismissed) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-[998] flex justify-center px-4 animate-[slideDown_0.3s_ease-out]">
      <div className="w-full max-w-2xl bg-red-600 text-white rounded-2xl shadow-2xl shadow-red-500/30 flex items-center gap-4 px-5 py-4">
        {/* Icon */}
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
          <WifiOff size={20} />
        </div>

        {/* Message */}
        <div className="flex-grow min-w-0">
          <p className="font-black text-sm leading-tight">Couldn't connect to the server</p>
          <p className="text-red-100 text-xs font-medium mt-0.5 leading-snug">
            Some content may be unavailable. Check your connection and try refreshing.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={13} /> Retry
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorBanner;
