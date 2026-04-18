import React from 'react';
import HeroSlider from '../components/sections/HeroSlider';
import SocialProofStrip from '../components/sections/SocialProofStrip';
import CategoriesSection from '../components/sections/CategoriesSection';
import TrendingProductsSection from '../components/sections/TrendingProductsSection';
import BannerSection from '../components/sections/BannerSection';
import BlogSection from '../components/sections/BlogSection';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <SocialProofStrip />
      <CategoriesSection />
      <TrendingProductsSection />
      <BannerSection />
      <BlogSection />
    </div>
  );
};

export default HomePage;
