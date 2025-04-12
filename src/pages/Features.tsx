
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Bot, Brain, BarChart3, Zap, FileText, Workflow, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Features = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="gradient-text mb-6 font-semibold">
            Powerful features for AI-driven solutions
          </h1>
          <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
            Scout provides everything you need to build, deploy, and scale AI applications that deliver real business value.
          </p>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-lg">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Knowledge Management</h3>
              <p className="text-muted-foreground mb-4">
                Connect your data sources, create AI-ready knowledge bases, and build retrieval systems for accurate and context-aware responses.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Comprehensive document processing
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Automatic chunking and indexing
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Semantic search capabilities
                </li>
              </ul>
              <Link to="/features/knowledge-management" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-lg">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">AI Assistants</h3>
              <p className="text-muted-foreground mb-4">
                Build and deploy customized AI assistants that understand your business context and can be integrated into your existing workflows.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Custom AI personalities and tones
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Multi-platform deployment options
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Conversation memory and context retention
                </li>
              </ul>
              <Link to="/features/ai-assistants" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-lg">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Model Management</h3>
              <p className="text-muted-foreground mb-4">
                Access, manage, and optimize a wide range of AI models to find the perfect balance of performance, cost, and capabilities for your use case.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Support for leading LLM providers
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Fine-tuning and prompt engineering tools
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Model version management
                </li>
              </ul>
              <Link to="/features/model-management" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-lg">
                <Workflow className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Workflow Automation</h3>
              <p className="text-muted-foreground mb-4">
                Create complex AI workflows that combine multiple models, data sources, and business logic to solve sophisticated problems.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Visual workflow builder
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Conditional logic and branching
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  API integrations and webhooks
                </li>
              </ul>
              <Link to="/features/workflow-automation" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Analytics & Monitoring</h3>
              <p className="text-muted-foreground mb-4">
                Gain deep insights into your AI systems' performance, usage patterns, and costs to continuously optimize your solutions.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Real-time performance monitoring
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Cost tracking and optimization
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Usage analytics and reporting
                </li>
              </ul>
              <Link to="/features/analytics" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Content Generation</h3>
              <p className="text-muted-foreground mb-4">
                Create high-quality, customized content at scale for marketing, documentation, support, and more.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Template-based generation
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Multi-format output (text, images, code)
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Brand voice customization
                </li>
              </ul>
              <Link to="/features/content-generation" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-lg">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Developer Tools</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive APIs, SDKs, and developer resources to build custom AI-powered applications with full flexibility.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  RESTful APIs and webhooks
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Multiple SDK options (JavaScript, Python, etc.)
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Extensive documentation and examples
                </li>
              </ul>
              <Link to="/features/developer-tools" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-lg">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-3">Enterprise Controls</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive security, compliance, and governance features designed for enterprise-grade AI deployments.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Role-based access control
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Audit logging and compliance reporting
                </li>
                <li className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span> 
                  Data privacy and security features
                </li>
              </ul>
              <Link to="/features/enterprise" className="text-sm font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2 className="gradient-text mb-6 font-semibold">
            Ready to experience Scout's powerful features?
          </h2>
          <p className="text-lg mb-10 text-muted-foreground">
            Start building scalable AI solutions today with our comprehensive toolkit.
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

export default Features;
