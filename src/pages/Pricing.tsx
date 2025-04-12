import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PricingCard = ({ 
  title, 
  description,
  price,
  priceDescription,
  features,
  ctaText,
  ctaLink,
  popular = false
}) => {
  return (
    <div className={`rounded-xl border ${popular ? 'border-primary/50 shadow-lg' : 'border-border'} bg-card overflow-hidden`}>
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

const Pricing = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="gradient-text mb-6 font-semibold">
            Simple, transparent pricing
          </h1>
          <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your business, from startups to enterprise organizations.
          </p>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              title="Starter"
              description="Perfect for individuals and small teams just getting started with AI."
              price="$49"
              priceDescription="/month"
              features={[
                "Up to 3 AI assistants",
                "1,000 AI messages per month",
                "100K tokens per month",
                "1 workflow",
                "Basic integrations",
                "Email support",
                "Community access"
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
                "Up to 10 AI assistants",
                "10,000 AI messages per month",
                "1M tokens per month",
                "5 workflows",
                "Advanced integrations",
                "Priority support",
                "Analytics dashboard",
                "Custom training",
                "Team collaboration tools"
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
                "Unlimited AI assistants",
                "Custom message volume",
                "Custom token allocation",
                "Unlimited workflows",
                "All integrations",
                "Dedicated support",
                "Advanced analytics",
                "Custom model training",
                "Enterprise SSO",
                "Security & compliance controls",
                "Custom contracts & SLAs"
              ]}
              ctaText="Contact sales"
              ctaLink="/contact-sales"
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-3xl font-medium mb-16 text-center gradient-text">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-3">
                What are tokens and how are they counted?
              </h3>
              <p className="text-muted-foreground">
                Tokens are the basic units of text that AI models process. In English, a token is approximately 4 characters or 3/4 of a word. We count both input and output tokens against your plan's token limit. Our dashboard provides real-time token usage statistics so you can monitor your consumption.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-3">
                Can I upgrade or downgrade my plan at any time?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can change your plan at any time. When upgrading, the new features and limits are available immediately, with prorated charges for the remainder of the billing cycle. When downgrading, the changes take effect at the start of the next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-3">
                Do you offer a free trial?
              </h3>
              <p className="text-muted-foreground">
                Yes, we offer a 14-day free trial on our Starter and Professional plans. No credit card is required to start your trial. You'll have access to all the features of the plan you choose so you can fully evaluate Scout before committing.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-3">
                What happens if I exceed my plan limits?
              </h3>
              <p className="text-muted-foreground">
                If you approach your plan limits, we'll notify you so you can upgrade if needed. If you exceed your limits, your service will continue to function, and you'll be billed for the additional usage at our standard overage rates. Enterprise customers can configure custom behavior for limit handling.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-3">
                Do you offer discounts for startups or non-profits?
              </h3>
              <p className="text-muted-foreground">
                Yes, we offer special pricing for eligible startups, non-profit organizations, and educational institutions. Please contact our sales team to learn more about our discount programs and eligibility requirements.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal. Enterprise customers have the option for invoice-based billing with net-30 terms.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Have more questions? We're here to help.
            </p>
            <Button variant="outline" className="flex items-center mx-auto">
              Contact support <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
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
      
      <Footer />
    </div>
  );
};

export default Pricing;
