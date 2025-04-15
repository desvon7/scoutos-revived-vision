import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/pricing/HeroSection';
import PricingSection from '@/components/pricing/PricingSection';
import FaqSection from '@/components/pricing/FaqSection';
import CtaSection from '@/components/pricing/CtaSection';

const Pricing = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <HeroSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Pricing;
