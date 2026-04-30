import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthModal } from '../../context/AuthModalContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isLoading, isLoggingOut } = useAuthModal();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to home. Only open login modal if we're not explicitly logging out.
    return <Navigate to="/" state={{ from: location, openLogin: !isLoggingOut }} replace />;
  }

  if (adminOnly && user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
