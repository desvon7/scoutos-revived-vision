import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Box, Database, Save, Play } from 'lucide-react';

const TemplateBuilderPage = () => {
  const [templateName, setTemplateName] = useState('Untitled Template');
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleSave = () => {
    // Save template logic would go here
  };

  const handleRun = () => {
    // Run template logic would go here
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 container-custom py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleBackToDashboard}
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>

            <div className="flex-1">
              <Input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="max-w-xs font-semibold text-lg"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleSave} className="flex items-center gap-2">
                <Save size={16} />
                Save
              </Button>
              <Button onClick={handleRun} className="flex items-center gap-2">
                <Play size={16} />
                Run
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Template Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md hover:bg-accent/5 cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <Box className="text-primary" size={20} />
                        <div>
                          <div className="font-medium">Input</div>
                          <div className="text-xs text-muted-foreground">
                            Starting point for data
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-md hover:bg-accent/5 cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <Database className="text-primary" size={20} />
                        <div>
                          <div className="font-medium">Data Source</div>
                          <div className="text-xs text-muted-foreground">
                            Connect to collections
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* More component types would be added here */}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardContent className="p-0">
                  <WorkflowBuilder />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplateBuilderPage;
