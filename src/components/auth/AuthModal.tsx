import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuthModal } from '../../context/AuthModalContext';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

const AuthModal: React.FC = () => {
  const { isOpen, view, closeModal } = useAuthModal();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSuccess = () => {
    closeModal();
    
    // Check if there's a redirect path from a protected route
    const state = location.state as { from?: { pathname: string } };
    if (state?.from) {
      navigate(state.from.pathname, { replace: true });
    } else {
      // Fallback: Redirect to profile after manual login
      navigate('/profile', { replace: true });
    }
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar z-10 animate-in fade-in zoom-in-95 duration-200">
         {/* Close Button floating over AuthForm */}
         <button 
           onClick={closeModal}
           className="absolute top-4 right-4 md:right-8 w-8 h-8 md:w-10 md:h-10 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full flex items-center justify-center transition-colors shadow-sm focus:outline-none"
         >
           <X size={20} />
         </button>

         {/* Form handles the toggle logic natively inside itself via AuthForm Context overrides if needed, but we pass initial view */}
         <AuthForm 
            initialView={view} 
            onSuccess={handleSuccess} 
         />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default AuthModal;
