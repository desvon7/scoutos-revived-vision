
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Database, Globe } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const CollectionsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateCollection = (type: string) => {
    setIsDialogOpen(false);
    toast({
      title: "Collection creation started",
      description: `Setting up ${type} collection. This may take a moment.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Collections</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> Create Collection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Collection</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold">Build your knowledge base</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Collections make your AI workflows smarter by giving them access to stored knowledge.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div 
                      className="border rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => handleCreateCollection('CSV')}
                    >
                      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Upload CSV</h3>
                      <p className="text-sm text-muted-foreground">Import your info from a CSV file</p>
                    </div>
                    
                    <div 
                      className="border rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => handleCreateCollection('Notion')}
                    >
                      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4.5 4.5c0-.55.45-1 1-1h3.5V7H5.5c-.55 0-1-.45-1-1V4.5zm5.5 0V3h4v1.5c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1zm6 0c0-.55.45-1 1-1H20c.55 0 1 .45 1 1V6c0 .55-.45 1-1 1h-3V4.5zm-1 5c.55 0 1-.45 1-1V7h3c.55 0 1 .45 1 1v9.5c0 .55-.45 1-1 1h-13c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h3v1.5c0 .55.45 1 1 1h5z" />
                        </svg>
                      </div>
                      <h3 className="font-medium mb-2">Sync with Notion</h3>
                      <p className="text-sm text-muted-foreground">Sync data via your API</p>
                    </div>
                    
                    <div 
                      className="border rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => handleCreateCollection('Website')}
                    >
                      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Scrape a website</h3>
                      <p className="text-sm text-muted-foreground">Gather data from your website</p>
                    </div>
                    
                    <div 
                      className="border rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => handleCreateCollection('API')}
                    >
                      <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Database className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Upload from API</h3>
                      <p className="text-sm text-muted-foreground">Add data to your collection via Scout API</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center max-w-md mx-auto">
          <img 
            src="/lovable-uploads/da9794b5-141e-41d7-a9d2-3c9c353778d1.png" 
            alt="Collections"
            className="w-72 h-auto mb-4 opacity-75"
          />
          <h2 className="text-2xl font-bold">Build your knowledge base</h2>
          <p className="text-muted-foreground">
            Collections make your AI workflows smarter by giving them access to stored knowledge.
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Collection
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CollectionsPage;
