import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  priceDescription: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

const PricingCard = ({
  title,
  description,
  price,
  priceDescription,
  features,
  ctaText,
  ctaLink,
  popular = false,
}: PricingCardProps) => {
  return (
    <div
      className={`rounded-xl border ${popular ? 'border-primary/50 shadow-lg' : 'border-border'} bg-card overflow-hidden`}
    >
      {popular && (
        <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1.5">
          Most Popular
        </div>
      )}
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>

        <div className="mb-6">
          <div className="flex items-end gap-2 mb-1">
            <span className="text-4xl font-semibold">{price}</span>
            {priceDescription && (
              <span className="text-muted-foreground text-sm mb-1">{priceDescription}</span>
            )}
          </div>
        </div>

        <Button
          className={`w-full mb-8 ${popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'}`}
          variant={popular ? 'default' : 'secondary'}
          asChild
        >
          <Link to={ctaLink}>{ctaText}</Link>
        </Button>

        <div className="space-y-4">
          <div className="text-sm font-medium">Includes:</div>
          {features.map((feature, index) => (
            <div key={index} className="flex gap-3 items-start">
              <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
