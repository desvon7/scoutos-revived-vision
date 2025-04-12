
import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import HeroSection from '@/components/sections/HeroSection';
import TrustedBySection from '@/components/sections/TrustedBySection';
import BuildSection from '@/components/sections/BuildSection';
import LaunchSection from '@/components/sections/LaunchSection';
import ScaleSection from '@/components/sections/ScaleSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import CtaSection from '@/components/sections/CtaSection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardLayout>
        <HeroSection />
        <TrustedBySection />
        <BuildSection />
        <LaunchSection />
        <ScaleSection />
        <TestimonialsSection />
        <SolutionsSection />
        <CtaSection />
      </DashboardLayout>
    </div>
  );
}
