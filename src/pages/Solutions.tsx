
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SolutionCard from '@/components/SolutionCard';

const Solutions = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="gradient-text mb-6 font-semibold">
            Solutions for every industry and use case
          </h1>
          <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
            Discover how Scout's AI platform can transform your business operations and customer experiences.
          </p>
        </div>
      </section>
      
      {/* Industry Solutions */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-16 text-center gradient-text">Industry Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-3">Financial Services</h3>
              <p className="text-muted-foreground mb-4">
                AI solutions for risk assessment, fraud detection, customer service, and regulatory compliance in financial institutions.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Automated document processing
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Intelligent customer assistants
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Compliance monitoring and reporting
                </li>
              </ul>
              <Link to="/solutions/financial-services" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-3">Healthcare</h3>
              <p className="text-muted-foreground mb-4">
                AI applications for patient care, administrative efficiency, and healthcare research and development.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Patient engagement solutions
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Medical documentation assistance
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Healthcare knowledge management
                </li>
              </ul>
              <Link to="/solutions/healthcare" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-3">Retail & E-commerce</h3>
              <p className="text-muted-foreground mb-4">
                AI solutions to enhance customer experience, optimize operations, and drive sales growth in retail environments.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Personalized shopping assistants
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Inventory and supply chain optimization
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Product description generation
                </li>
              </ul>
              <Link to="/solutions/retail" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-3">Technology & SaaS</h3>
              <p className="text-muted-foreground mb-4">
                AI integrations for technology companies and SaaS platforms to enhance product capabilities and user experiences.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  In-app AI assistants
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Developer workflow automation
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Customer support enhancements
                </li>
              </ul>
              <Link to="/solutions/technology" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-3">Government & Public Sector</h3>
              <p className="text-muted-foreground mb-4">
                AI solutions for government agencies and public sector organizations to improve citizen services and operational efficiency.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Citizen service automation
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Document processing and compliance
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Public information access solutions
                </li>
              </ul>
              <Link to="/solutions/government" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <h3 className="text-xl font-medium mb-3">Education</h3>
              <p className="text-muted-foreground mb-4">
                AI tools for educational institutions to enhance learning experiences, administrative processes, and research capabilities.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Learning content generation
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Student support assistants
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Research and writing assistance
                </li>
              </ul>
              <Link to="/solutions/education" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Business Functions */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-16 text-center gradient-text">Business Function Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SolutionCard 
              title="Customer Support"
              description="Improve response times, accuracy, and overall customer experience with AI-driven support."
              link="/solutions/customer-support"
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
              title="Internal Operations"
              description="Streamline onboarding, QA, internal policy creation, project workflows and team management."
              link="/solutions/operations"
            />
            <SolutionCard 
              title="Product Management"
              description="Customer feedback analysis, documentation generation, and comprehensive content creation for product development."
              link="/solutions/product"
            />
            <SolutionCard 
              title="Human Resources"
              description="Enhance recruitment, employee onboarding, and internal knowledge management with AI solutions."
              link="/solutions/hr"
            />
            <SolutionCard 
              title="Research & Development"
              description="Accelerate research processes, literature reviews, and innovation workflows with AI assistance."
              link="/solutions/research"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="gradient-text mb-6 font-semibold">
            Not sure which solution is right for you?
          </h2>
          <p className="text-lg mb-10 text-muted-foreground">
            Our AI experts can help you identify the perfect solution for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-primary w-full sm:w-auto flex items-center gap-2">
              Schedule a consultation
            </Button>
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
              Browse case studies <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Solutions;
