import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import HeroSection from '@/components/sections/HeroSection';
import TrustedBySection from '@/components/sections/TrustedBySection';
import BuildSection from '@/components/sections/BuildSection';
import LaunchSection from '@/components/sections/LaunchSection';
import ScaleSection from '@/components/sections/ScaleSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import CtaSection from '@/components/sections/CtaSection';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Navbar />

      <HeroSection />
      <TrustedBySection />
      <BuildSection />
      <LaunchSection />
      <ScaleSection />
      <TestimonialsSection />
      <SolutionsSection />
      <CtaSection />

      <Footer />
    </div>
  );
};

export default Index;
