
import React from 'react';
import WorkflowBuilder from '@/components/WorkflowBuilder';

const BuildSection = () => {
  return (
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
  );
};

export default BuildSection;
