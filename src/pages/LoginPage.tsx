import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="login-page bg-zinc-50/50 py-16 min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-4 flex justify-center">
        <AuthForm 
          initialView="login" 
          onNavigate={(view) => navigate(`/${view}`)} 
          onSuccess={() => navigate('/profile')} 
        />
      </div>
    </div>
  );
};

export default LoginPage;
