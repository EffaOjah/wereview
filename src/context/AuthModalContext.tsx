import React, { createContext, useState, useContext, type ReactNode } from 'react';

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
  login: (userData: User) => void;
  logout: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>('login');
  const [user, setUser] = useState<User | null>(null);

  const openModal = (newView: AuthView = 'login') => {
    setView(newView);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsOpen(false);
  };

  const logout = () => {
    setUser(null);
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
