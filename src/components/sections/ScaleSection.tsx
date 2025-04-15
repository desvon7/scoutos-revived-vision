import React from 'react';
import { Button } from '@/components/ui/button';
import MeasurementCard from '@/components/MeasurementCard';

const ScaleSection = () => {
  return (
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
                For a Workflow to continually deliver high quality results we offer evaluations and
                real time monitoring.
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
                Use built-in logging to iterate quickly{' '}
                <span className="text-foreground">
                  and keep an eye on the status of your workflows, latency, and costs.
                </span>
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
  );
};

export default ScaleSection;
