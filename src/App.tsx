import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthModalProvider } from './context/AuthModalContext';
import AuthModal from './components/auth/AuthModal';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ScrollToTop from './components/ui/ScrollToTop';
import BackToTopButton from './components/ui/BackToTopButton';

// Real Pages
import HomePage from './pages/HomePage';
import ReviewsPage from './pages/ReviewsPage';
import GadgetDetailsPage from './pages/GadgetDetailsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import GadgetsPage from './pages/GadgetsPage';
import CartPage from './pages/CartPage';
import ComparePage from './pages/ComparePage';
import ProfilePage from './pages/ProfilePage';
import PublicProfilePage from './pages/PublicProfilePage';
import SellersPage from './pages/SellersPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AIAssistantWidget from './components/ui/AIAssistantWidget';
import GlobalErrorBanner from './components/ui/GlobalErrorBanner';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminGadgetsPage from './pages/admin/AdminGadgetsPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';

import { GadgetProvider } from './context/GadgetContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen relative">
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <GlobalErrorBanner />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/gadgets/:id" element={<GadgetDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/gadgets" element={<GadgetsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/user/:userId" element={<PublicProfilePage />} />
          <Route path="/sellers" element={<SellersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/gadgets" element={<ProtectedRoute adminOnly><AdminGadgetsPage /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute adminOnly><AdminReviewsPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute adminOnly><AdminCategoriesPage /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute adminOnly><AdminSettingsPage /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute adminOnly><AdminNotificationsPage /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isProfilePage && !isAdminPage && <Footer />}
      <BackToTopButton />
      {!isAdminPage && <AIAssistantWidget />}
      <AuthModal />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GadgetProvider>
      <AuthModalProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </AuthModalProvider>
    </GadgetProvider>
  );
};

export default App;
