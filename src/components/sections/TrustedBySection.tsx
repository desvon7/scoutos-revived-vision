import React from 'react';

const TrustedBySection = () => {
  return (
    <section className="py-12 border-y border-border/40 bg-secondary/10">
      <div className="container-custom">
        <p className="text-sm text-center text-muted-foreground mb-8">
          Trusted by teams building the future
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
          <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
          <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
          <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
          <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
