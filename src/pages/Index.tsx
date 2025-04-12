
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessagesSquare, Bot, Workflow, Layers, Zap, BarChart3 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import ChatInterface from '@/components/ChatInterface';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import TestimonialCard from '@/components/TestimonialCard';
import MeasurementCard from '@/components/MeasurementCard';
import SolutionCard from '@/components/SolutionCard';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="gradient-text mb-6 font-semibold">
            Your toolkit for building scalable AI
          </h1>
          <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
            Scout expands the scope of what AI can do and what you can bring to production, faster than ever imagined.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-primary w-full sm:w-auto flex items-center gap-2">
              Try for free
            </Button>
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
              Talk with a Scout engineer <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="container-custom mt-16">
          <ChatInterface />
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="py-12 border-y border-border/40 bg-secondary/10">
        <div className="container-custom">
          <p className="text-sm text-center text-muted-foreground mb-8">Trusted by teams building the future</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
            <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
            <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
            <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
            <img src="/placeholder.svg" alt="Company Logo" className="h-6 opacity-60" />
          </div>
        </div>
      </section>
      
      {/* Build Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col-reverse lg:flex-row gap-16">
            <div className="flex-1">
              <div className="sticky top-24">
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-xs font-medium mb-6">
                  <span className="mr-2">1</span> BUILD
                </div>
                <h2 className="mb-6 gradient-text font-semibold">
                  Create AI workflows and build AI ready data sets
                </h2>
                <p className="text-muted-foreground mb-10 max-w-lg">
                  Build powerful AI workflows that can handle complex tasks with ease. Connect to data sources, create custom logic, and deploy with confidence.
                </p>
                <WorkflowBuilder />
              </div>
            </div>
            <div className="flex-1 space-y-16">
              <div>
                <h3 className="text-xl font-medium mb-4">Workflow Builder</h3>
                <p className="text-muted-foreground mb-6">
                  Create AI workflow automations using AI models, web scraping, data storage, API calls, customized logic and more.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Customizable Data Sources</h3>
                <p className="text-muted-foreground mb-6">
                  Set up automated content ingestion from your site, documentation, historical conversations, and more.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">LLM Chaining</h3>
                <p className="text-muted-foreground mb-6">
                  Connect multiple LLMs within a single workflow to find the perfect solution for your use case.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Launch Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1">
              <div className="sticky top-24">
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-xs font-medium mb-6">
                  <span className="mr-2">2</span> LAUNCH
                </div>
                <h2 className="mb-6 gradient-text font-semibold">
                  Deploy your solution in seconds
                </h2>
                <p className="text-muted-foreground mb-10 max-w-lg">
                  Launch your AI solution quickly with our simple deployment process. Get your AI tools into production in seconds, not days.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <div className="mb-4">
                      <MessagesSquare className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Copilots</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Deliver AI-powered answers to your customers, without leaving your site.
                    </p>
                    <Link to="/learn-more" className="text-sm font-medium inline-flex items-center hover:underline">
                      Learn more <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <div className="mb-4">
                      <Bot className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Slack</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Build a Slack bot that interacts with your customers directly in Slack.
                    </p>
                    <Link to="/learn-more" className="text-sm font-medium inline-flex items-center hover:underline">
                      Learn more <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <div className="mb-4">
                      <Workflow className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">API & SDK</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Build completely custom AI apps at scale using Scout's SDKs and APIs.
                    </p>
                    <Link to="/learn-more" className="text-sm font-medium inline-flex items-center hover:underline">
                      Learn more <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              {/* Image or illustration would go here */}
            </div>
          </div>
        </div>
      </section>
      
      {/* Scale Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col-reverse lg:flex-row gap-16">
            <div className="flex-1">
              <div className="sticky top-24">
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-xs font-medium mb-6">
                  <span className="mr-2">3</span> SCALE
                </div>
                <h2 className="mb-6 gradient-text font-semibold">
                  Full control with comprehensive testing and tuning
                </h2>
                <p className="text-muted-foreground mb-10 max-w-lg">
                  For a Workflow to continually deliver high quality results we offer evaluations and real time monitoring.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MeasurementCard title="Faithfulness" value={7.2} />
                  <MeasurementCard title="Relevance" value={8.5} />
                  <MeasurementCard title="Recall" value={7.4} />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-16">
              <div>
                <p className="text-muted-foreground mb-6">
                  Use built-in logging to iterate quickly <span className="text-foreground">and keep an eye on the status of your workflows, latency, and costs.</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Cost
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Errors
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Latency
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
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
      
      {/* Solutions Section */}
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
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="gradient-text mb-6 font-semibold">
            Ready to get started?
          </h2>
          <p className="text-lg mb-10 text-muted-foreground">
            Sign up for free or chat live with a Scout engineer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-primary w-full sm:w-auto flex items-center gap-2">
              Try for free
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

export default Index;
