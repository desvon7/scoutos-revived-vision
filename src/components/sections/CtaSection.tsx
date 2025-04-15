import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container-custom text-center max-w-2xl mx-auto">
        <h2 className="gradient-text mb-6 font-semibold">Ready to get started?</h2>
        <p className="text-lg mb-10 text-muted-foreground">
          Sign up for free or chat live with a Scout engineer.
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
    </section>
  );
};

export default CtaSection;
