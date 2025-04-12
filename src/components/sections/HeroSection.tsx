
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ChatInterface from '@/components/ChatInterface';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container-custom text-center max-w-3xl mx-auto">
        <h1 className="gradient-text mb-6 font-semibold">
          Your toolkit for building scalable AI
        </h1>
        <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
          Scout expands the scope of what AI can do and what you can bring to production, faster than ever imagined.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="btn-primary w-full sm:w-auto flex items-center gap-2">
            Try for free
          </Button>
          <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
            Talk with a Scout engineer <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="container-custom mt-16">
        <ChatInterface />
      </div>
    </section>
  );
};

export default HeroSection;
