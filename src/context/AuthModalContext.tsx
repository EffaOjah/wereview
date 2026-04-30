import React, { createContext, useState, useContext, type ReactNode } from 'react';
import { getApiUrl } from '../utils/api';

export type AuthView = 'login' | 'signup';

interface User {
  name: string;
  email: string;
  role?: string;
}

interface AuthModalContextType {
  isOpen: boolean;
  view: AuthView;
  user: User | null;
  isLoading: boolean;
  isLoggingOut: boolean;
  openModal: (view?: AuthView) => void;
  closeModal: () => void;
  login: (userData: User, token?: string) => void;
  logout: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('gadgethub_token');
      if (token) {
        try {
          const res = await fetch(getApiUrl('/api/auth/me'), {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            setUser(data.data);
          } else {
            console.warn('Session restoration failed:', data.message);
            localStorage.removeItem('gadgethub_token');
          }
        } catch (err) {
          console.error('Auth check network/server error:', err);
          // Don't remove token on network error, might be temporary
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const openModal = (newView: AuthView = 'login') => {
    setView(newView);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const login = (userData: User, token?: string) => {
    // Spread user data to ensure a new reference for React state reactivity
    setUser({ ...userData });
    
    if (token) {
      localStorage.setItem('gadgethub_token', token);
    }
  };

  const logout = () => {
    setIsLoggingOut(true);
    setUser(null);
    localStorage.removeItem('gadgethub_token');
    // Reset the flag after a short delay to allow navigation to complete
    setTimeout(() => setIsLoggingOut(false), 500);
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, view, user, isLoading, isLoggingOut, openModal, closeModal, login, logout }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};
