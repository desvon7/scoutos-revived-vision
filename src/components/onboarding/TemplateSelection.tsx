
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GanttChart, Database, Search, ChevronDown, X } from 'lucide-react';
import WorkflowBuilder from '@/components/WorkflowBuilder';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TemplateSelectionProps {
  navigate: (path: string) => void;
}

// Template categories
const templateCategories = [
  { id: 'all', name: 'All Templates' },
  { id: 'ai', name: 'AI & Machine Learning' },
  { id: 'customer-support', name: 'Customer Support' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'data', name: 'Data Processing' },
];

// Templates data
const templates = [
  {
    id: 'seo',
    title: 'AI-Powered SEO Blog Generator',
    description: 'Automate the creation of SEO-optimized blog posts using AI and NLP',
    icon: '📝',
    category: 'marketing',
    backgroundColor: '#10b981'
  },
  {
    id: 'perplexity',
    title: 'Perplexity Clone',
    description: 'This workflow searches the web and uses an LLM to format a response',
    icon: '🌐',
    category: 'ai',
    backgroundColor: '#4f46e5'
  },
  {
    id: 'basic',
    title: 'Basic LLM Workflow',
    description: 'Enhance your productivity with the Basic LLM Workflow',
    icon: '🚀',
    category: 'ai',
    backgroundColor: '#b91c1c'
  },
  {
    id: 'slack',
    title: 'AI Slack RAG Bot (Simple)',
    description: 'This workflow is the second part of a two-part system',
    icon: '💬',
    category: 'customer-support',
    backgroundColor: '#7c3aed'
  },
  {
    id: 'rag',
    title: 'Basic RAG Workflow',
    description: "A basic RAG workflow template using Scout's powerful workflow builder",
    icon: '📊',
    category: 'ai',
    backgroundColor: '#db2777'
  },
  {
    id: 'comparison',
    title: 'LLM Model Comparison Tool',
    description: 'Compare the performance, cost, and output of multiple AI language models',
    icon: '⚖️',
    category: 'ai',
    backgroundColor: '#059669'
  }
];

const TemplateSelection = ({ navigate }: TemplateSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleUseTemplate = () => {
    navigate('/template-builder');
  };
  
  const handleStartFromScratch = () => {
    navigate('/template-builder');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getCategoryName = () => {
    const category = templateCategories.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'All Templates';
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Choose a Template</h2>
        
        <div className="flex gap-3 flex-col sm:flex-row w-full sm:w-auto">
          {/* Category dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto justify-between">
                {getCategoryName()}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {templateCategories.map((category) => (
                <DropdownMenuItem 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search input */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 w-full sm:w-[200px]"
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 h-7 w-7 text-gray-400 hover:text-gray-600"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className="border border-border hover:shadow-md transition-all cursor-pointer hover:translate-y-[-2px]" 
            onClick={handleUseTemplate}
          >
            <CardContent className="p-5">
              <div 
                className="w-10 h-10 flex items-center justify-center rounded-md text-white mb-4 text-xl"
                style={{ backgroundColor: template.backgroundColor }}
              >
                {template.icon}
              </div>
              <h3 className="font-medium mb-2">{template.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              <Button variant="outline" size="sm">Use template</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="border border-border hover:shadow-md transition-shadow cursor-pointer" onClick={handleUseTemplate}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <GanttChart className="h-8 w-8 mb-4" />
            <h3 className="font-medium mb-1">View all templates</h3>
            <p className="text-sm text-muted-foreground">Premade templates for everything</p>
          </CardContent>
        </Card>
        
        <Card className="border border-border hover:shadow-md transition-shadow cursor-pointer" onClick={handleStartFromScratch}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Database className="h-8 w-8 mb-4" />
            <h3 className="font-medium mb-1">Start from scratch</h3>
            <p className="text-sm text-muted-foreground">Build your own custom workflow</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-medium mb-6">Workflow Builder Preview</h3>
        <WorkflowBuilder />
      </div>
    </div>
  );
};

export default TemplateSelection;
