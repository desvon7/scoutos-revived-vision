
import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container-custom text-center max-w-3xl mx-auto">
        <h1 className="gradient-text mb-6 font-semibold">
          Simple, transparent pricing
        </h1>
        <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that's right for your business, from startups to enterprise organizations. 
          All plans include core features and access to our powerful AI platform.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
