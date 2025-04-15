import React from 'react';
import { Link } from 'react-router-dom';
import { MessagesSquare, Bot, Workflow, ArrowRight } from 'lucide-react';

const LaunchSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <div className="sticky top-24">
              <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-xs font-medium mb-6">
                <span className="mr-2">2</span> LAUNCH
              </div>
              <h2 className="mb-6 gradient-text font-semibold">Deploy your solution in seconds</h2>
              <p className="text-muted-foreground mb-10 max-w-lg">
                Launch your AI solution quickly with our simple deployment process. Get your AI
                tools into production in seconds, not days.
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
                  <Link
                    to="/learn-more"
                    className="text-sm font-medium inline-flex items-center hover:underline"
                  >
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
                  <Link
                    to="/learn-more"
                    className="text-sm font-medium inline-flex items-center hover:underline"
                  >
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
                  <Link
                    to="/learn-more"
                    className="text-sm font-medium inline-flex items-center hover:underline"
                  >
                    Learn more <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">{/* Image or illustration would go here */}</div>
        </div>
      </div>
    </section>
  );
};

export default LaunchSection;
