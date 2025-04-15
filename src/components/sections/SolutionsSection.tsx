import React from 'react';
import SolutionCard from '@/components/SolutionCard';

const SolutionsSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            SUPPORT YOUR ENTIRE TEAM
          </h2>
          <h2 className="gradient-text font-semibold mb-4">
            Solutions tailored for every possible need
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SolutionCard
            title="Customer Support"
            description="Improve response times, accuracy, and overall customer experience with AI-driven support."
            link="/solutions/customer-support"
          />
          <SolutionCard
            title="Startup Toolkit"
            description="Quickly build and launch AI-powered apps or startup initiatives with a fraction of the resources."
            link="/solutions/startup-toolkit"
          />
          <SolutionCard
            title="Sales"
            description="Streamline RFPs, security questionnaires, meeting follow ups and sales outreach with AI-powered workflows."
            link="/solutions/sales"
          />
          <SolutionCard
            title="Marketing & Content Creation"
            description="Use AI to generate personalized, SEO-optimized content and marketing campaigns."
            link="/solutions/marketing"
          />
          <SolutionCard
            title="Customer Success"
            description="Use AI for follow-ups, success plan building and personalized outreach to scale customer success."
            link="/solutions/customer-success"
          />
          <SolutionCard
            title="Legal & Compliance"
            description="Simplify legal and compliance processes with AI-driven document generation, analysis and review."
            link="/solutions/legal"
          />
          <SolutionCard
            title="Internal Operations & Team Management"
            description="Streamline onboarding, QA, internal policy creation, project workflows and team management."
            link="/solutions/operations"
          />
          <SolutionCard
            title="Product Management"
            description="Customer feedback analysis, documentation generation, and comprehensive content creation for product development."
            link="/solutions/product"
          />
          <SolutionCard
            title="Reporting & Analysis"
            description="Automatic generation of detailed reports, proposals, and satisfaction summaries using AI."
            link="/solutions/reporting"
          />
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
