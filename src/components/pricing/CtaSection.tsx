
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom text-center max-w-2xl mx-auto">
        <h2 className="gradient-text mb-6 font-semibold">
          Ready to get started with Scout?
        </h2>
        <p className="text-lg mb-10 text-muted-foreground">
          Join thousands of businesses transforming their operations with Scout's AI platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="btn-primary w-full sm:w-auto">
            Start your free trial
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
