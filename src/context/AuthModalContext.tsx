import React, { createContext, useState, useContext, type ReactNode } from 'react';
import { getApiUrl } from '../utils/api';

export type AuthView = 'login' | 'signup';

interface User {
  name: string;
  email: string;
}

interface AuthModalContextType {
  isOpen: boolean;
  view: AuthView;
  user: User | null;
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
            localStorage.removeItem('gadgethub_token');
          }
        } catch (err) {
          console.error('Auth check failed', err);
        }
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
    setUser(userData);
    if (token) {
      localStorage.setItem('gadgethub_token', token);
    }
    setIsOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gadgethub_token');
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, view, user, openModal, closeModal, login, logout }}>
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
