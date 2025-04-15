import React from 'react';
import TestimonialCard from '@/components/TestimonialCard';

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container-custom">
        <h2 className="text-center mb-16 gradient-text font-semibold">
          Crafted for tomorrow's builders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="The Scout GenAI system has helped transform how we can improve customer service for all our government customers."
            author="Bratton Riley"
            role="CEO"
            company="Citizen"
          />
          <TestimonialCard
            quote="Scout allowed us to test, iterate, and refine. They worked with us to find alignment with our business."
            author="Charles Lane"
            role="CTO"
            company="Acme Inc"
          />
          <TestimonialCard
            quote="A great experience, tailored to a unique brief and content, used to take days to minutes."
            author="Jane Smith"
            role="VP Product"
            company="TechForward"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
