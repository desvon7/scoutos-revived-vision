
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Plus, 
  Settings, 
  FilePlus, 
  Box, 
  GanttChart, 
  Database, 
  Bookmark,
  CircleEllipsis
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';

const Dashboard = () => {
  // For demo purposes, we'll show the onboarding flow
  const [showOnboarding, setShowOnboarding] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState('workflows');
  const navigate = useNavigate();
  
  const handleCreateWorkflow = () => {
    navigate('/workflow-builder');
  };
  
  if (showOnboarding) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <div className="flex h-16 items-center border-b px-6 justify-between">
          <div className="flex items-center space-x-2">
            <Asterisk className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Scout</span>
          </div>
          <Button variant="ghost" onClick={() => setShowOnboarding(false)}>
            Skip tutorial
          </Button>
        </div>
        <OnboardingFlow />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container-custom py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button 
            className="flex items-center"
            onClick={handleCreateWorkflow}
          >
            <Plus className="mr-2 h-4 w-4" /> New Workflow
          </Button>
        </div>
        
        <div className="mb-8">
          <nav className="flex space-x-4 border-b">
            <button
              onClick={() => setSelectedTab('workflows')}
              className={`px-4 py-2 font-medium text-sm ${
                selectedTab === 'workflows' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              Workflows
            </button>
            <button
              onClick={() => setSelectedTab('collections')}
              className={`px-4 py-2 font-medium text-sm ${
                selectedTab === 'collections' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => setSelectedTab('templates')}
              className={`px-4 py-2 font-medium text-sm ${
                selectedTab === 'templates' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              Templates
            </button>
          </nav>
        </div>
        
        {selectedTab === 'workflows' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer" onClick={handleCreateWorkflow}>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
                  <Plus className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Create a new workflow</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start building your custom AI workflow from scratch
                  </p>
                  <Button>Create Workflow</Button>
                </CardContent>
              </Card>
              
              <Card className="border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <GanttChart className="h-6 w-6 text-primary" />
                    </div>
                    <div className="px-2 py-1 bg-secondary/20 text-xs rounded-full text-muted-foreground">
                      Active
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">Knowledge Base Assistant</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI-powered workflow that searches your docs and provides accurate answers
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-4">Created 3 days ago</span>
                    <span>23 executions</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <div className="px-2 py-1 bg-secondary/20 text-xs rounded-full text-muted-foreground">
                      Active
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">Content Generator</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Automatically create blog posts and content for your marketing campaigns
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-4">Created 5 days ago</span>
                    <span>47 executions</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
        
        {selectedTab === 'collections' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
                  <FilePlus className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Create a new collection</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add documents, websites, or other data sources
                  </p>
                  <Button>Create Collection</Button>
                </CardContent>
              </Card>
              
              <Card className="border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Box className="h-6 w-6 text-primary" />
                    </div>
                    <div className="px-2 py-1 bg-secondary/20 text-xs rounded-full text-muted-foreground">
                      15 documents
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">Product Documentation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Technical documentation and user guides for our products
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-4">Created 1 week ago</span>
                    <span>253 chunks</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Bookmark className="h-6 w-6 text-primary" />
                    </div>
                    <div className="px-2 py-1 bg-secondary/20 text-xs rounded-full text-muted-foreground">
                      3 websites
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">Marketing Materials</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Blog posts, case studies, and other marketing content
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-4">Created 3 days ago</span>
                    <span>127 chunks</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
        
        {selectedTab === 'templates' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Template cards similar to the ones in OnboardingFlow */}
              <Card className="border hover:shadow-md transition-shadow cursor-pointer" onClick={handleCreateWorkflow}>
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="font-medium mb-1">AI-Powered SEO Blog Generator</h3>
                  <p className="text-sm text-muted-foreground mb-4">Automate the creation of SEO-optimized blog posts using AI and NLP</p>
                  <Button variant="outline" size="sm">Use template</Button>
                </CardContent>
              </Card>
              
              <Card className="border hover:shadow-md transition-shadow cursor-pointer" onClick={handleCreateWorkflow}>
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">🌐</div>
                  <h3 className="font-medium mb-1">Perplexity Clone</h3>
                  <p className="text-sm text-muted-foreground mb-4">This workflow searches the web and uses an LLM to format a response</p>
                  <Button variant="outline" size="sm">Use template</Button>
                </CardContent>
              </Card>
              
              <Card className="border hover:shadow-md transition-shadow cursor-pointer" onClick={handleCreateWorkflow}>
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">🚀</div>
                  <h3 className="font-medium mb-1">Basic LLM Workflow</h3>
                  <p className="text-sm text-muted-foreground mb-4">Enhance your productivity with the Basic LLM Workflow</p>
                  <Button variant="outline" size="sm">Use template</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Simple Asterisk component for the logo
const Asterisk = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14" />
  </svg>
);

export default Dashboard;
