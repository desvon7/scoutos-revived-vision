import AnnouncementBar from '@/components/AnnouncementBar';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import BuildSection from '@/components/sections/BuildSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import ScaleSection from '@/components/sections/ScaleSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import TrustedBySection from '@/components/sections/TrustedBySection';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

// Import BuildSection as a client component
const DynamicBuildSection = dynamic(() => import('@/components/sections/BuildSection'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <header className="border-b border-border">
        <div className="container">
          <Navigation />
        </div>
      </header>
      <main>
        <HeroSection />
        <TrustedBySection />
        <DynamicBuildSection />
        <SolutionsSection />
        <ScaleSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
} 