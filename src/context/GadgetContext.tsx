import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import type { Gadget } from '../types';
import { getApiUrl } from '../utils/api';

interface GadgetContextType {
  gadgets: Gadget[];
  deals: Gadget[];
  categories: any[];
  isLoading: boolean;
  error: string | null;
}

const GadgetContext = createContext<GadgetContextType | undefined>(undefined);

export const GadgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [deals, setDeals] = useState<Gadget[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [gadgetsRes, dealsRes, categoriesRes] = await Promise.all([
          fetch(getApiUrl('/api/gadgets')).then(r => r.json()),
          fetch(getApiUrl('/api/gadgets/deals')).then(r => r.json()),
          fetch(getApiUrl('/api/categories')).then(r => r.json())
        ]);

        if (gadgetsRes.success) setGadgets(gadgetsRes.data);
        if (dealsRes.success) setDeals(dealsRes.data);
        if (categoriesRes.success) setCategories(categoriesRes.data);
      } catch (err) {
        console.error('Error fetching global data:', err);
        setError('Failed to load application data. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <GadgetContext.Provider value={{ gadgets, deals, categories, isLoading, error }}>
      {children}
    </GadgetContext.Provider>
  );
};

export const useGadgets = () => {
  const context = useContext(GadgetContext);
  if (context === undefined) {
    throw new Error('useGadgets must be used within a GadgetProvider');
  }
  return context;
};
