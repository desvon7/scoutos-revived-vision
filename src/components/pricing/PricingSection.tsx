import React from 'react';
import PricingCard from './PricingCard';

const PricingSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Starter"
            description="Perfect for individuals and small teams just getting started with AI."
            price="$49"
            priceDescription="/month"
            features={[
              'Up to 3 AI assistants',
              '1,000 AI messages per month',
              '100K tokens per month',
              '1 workflow',
              'Basic integrations',
              'Email support',
              'Community access',
            ]}
            ctaText="Get started"
            ctaLink="/signup"
          />

          <PricingCard
            title="Professional"
            description="For growing teams looking to scale their AI capabilities."
            price="$199"
            priceDescription="/month"
            features={[
              'Up to 10 AI assistants',
              '10,000 AI messages per month',
              '1M tokens per month',
              '5 workflows',
              'Advanced integrations',
              'Priority support',
              'Analytics dashboard',
              'Custom training',
              'Team collaboration tools',
            ]}
            ctaText="Get started"
            ctaLink="/signup"
            popular={true}
          />

          <PricingCard
            title="Enterprise"
            description="For organizations requiring advanced features and dedicated support."
            price="Custom"
            priceDescription=""
            features={[
              'Unlimited AI assistants',
              'Custom message volume',
              'Custom token allocation',
              'Unlimited workflows',
              'All integrations',
              'Dedicated support',
              'Advanced analytics',
              'Custom model training',
              'Enterprise SSO',
              'Security & compliance controls',
              'Custom contracts & SLAs',
            ]}
            ctaText="Contact sales"
            ctaLink="/contact-sales"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
