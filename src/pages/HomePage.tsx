import React from 'react';
import HeroSlider from '../components/sections/HeroSlider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthModal } from '../context/AuthModalContext';
import DealsOfTheDaySection from '../components/sections/DealsOfTheDaySection';
import SocialProofStrip from '../components/sections/SocialProofStrip';
import CategoriesSection from '../components/sections/CategoriesSection';
import TrendingGadgetsSection from '../components/sections/TrendingGadgetsSection';
import CompareSection from '../components/sections/CompareSection';
import VerifiedSellersSection from '../components/sections/VerifiedSellersSection';
import VideoReviewsSection from '../components/sections/VideoReviewsSection';
import BannerSection from '../components/sections/BannerSection';
import BlogSection from '../components/sections/BlogSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

const HomePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useAuthModal();

  React.useEffect(() => {
    const state = location.state as { openLogin?: boolean, from?: any };
    if (state?.openLogin) {
      openModal('login');
      // Clear openLogin but preserve 'from' so we can redirect after login
      navigate('.', { 
        replace: true, 
        state: { ...state, openLogin: false } 
      });
    }
  }, [location, openModal, navigate]);

  return (
    <div className="home-page">
      <HeroSlider />
      <SocialProofStrip />
      <DealsOfTheDaySection />
      <CategoriesSection />
      <TrendingGadgetsSection />
      <CompareSection />
      <VerifiedSellersSection />
      <VideoReviewsSection />
      <TestimonialsSection />
      <BannerSection />
      <BlogSection />
    </div>
  );
};

export default HomePage;
