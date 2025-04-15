import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle } from 'lucide-react';

const FaqSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/10">
      <div className="container-custom max-w-4xl mx-auto">
        <h2 className="text-3xl font-medium mb-16 text-center gradient-text">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-3">What are tokens and how are they counted?</h3>
            <p className="text-muted-foreground">
              Tokens are the basic units of text that AI models process. In English, a token is
              approximately 4 characters or 3/4 of a word. We count both input and output tokens
              against your plan's token limit. Our dashboard provides real-time token usage
              statistics so you can monitor your consumption.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">
              Can I upgrade or downgrade my plan at any time?
            </h3>
            <p className="text-muted-foreground">
              Yes, you can change your plan at any time. When upgrading, the new features and limits
              are available immediately, with prorated charges for the remainder of the billing
              cycle. When downgrading, the changes take effect at the start of the next billing
              cycle.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">Do you offer a free trial?</h3>
            <p className="text-muted-foreground">
              Yes, we offer a 14-day free trial on our Starter and Professional plans. No credit
              card is required to start your trial. You'll have access to all the features of the
              plan you choose so you can fully evaluate Scout before committing.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">What happens if I exceed my plan limits?</h3>
            <p className="text-muted-foreground">
              If you approach your plan limits, we'll notify you so you can upgrade if needed. If
              you exceed your limits, your service will continue to function, and you'll be billed
              for the additional usage at our standard overage rates. Enterprise customers can
              configure custom behavior for limit handling.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">
              Do you offer discounts for startups or non-profits?
            </h3>
            <p className="text-muted-foreground">
              Yes, we offer special pricing for eligible startups, non-profit organizations, and
              educational institutions. Please contact our sales team to learn more about our
              discount programs and eligibility requirements.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards (Visa, Mastercard, American Express, Discover) as
              well as PayPal. Enterprise customers have the option for invoice-based billing with
              net-30 terms.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">Have more questions? We're here to help.</p>
          <Button variant="outline" className="flex items-center mx-auto">
            Contact support <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
