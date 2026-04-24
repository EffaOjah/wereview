import React from 'react';
import HeroSlider from '../components/sections/HeroSlider';
import DealsOfTheDaySection from '../components/sections/DealsOfTheDaySection';
import SocialProofStrip from '../components/sections/SocialProofStrip';
import CategoriesSection from '../components/sections/CategoriesSection';
import TrendingProductsSection from '../components/sections/TrendingProductsSection';
import VerifiedSellersSection from '../components/sections/VerifiedSellersSection';
import VideoReviewsSection from '../components/sections/VideoReviewsSection';
import BannerSection from '../components/sections/BannerSection';
import BlogSection from '../components/sections/BlogSection';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <SocialProofStrip />
      <DealsOfTheDaySection />
      <CategoriesSection />
      <TrendingProductsSection />
      <VerifiedSellersSection />
      <VideoReviewsSection />
      <BannerSection />
      <BlogSection />
    </div>
  );
};

export default HomePage;
