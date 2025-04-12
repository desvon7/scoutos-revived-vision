
import React, { useState } from 'react';
import TemplateCard from './TemplateCard';
import { 
  Search, 
  X, 
  ChevronDown, 
  FileText, 
  MessageSquare, 
  Brain, 
  BarChart, 
  Globe,
  Zap
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TemplatesTabProps {
  onUseTemplate: () => void;
}

// Template categories
const templateCategories = [
  { id: 'all', name: 'All Templates' },
  { id: 'ai', name: 'AI & Machine Learning' },
  { id: 'customer-support', name: 'Customer Support' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'sales', name: 'Sales' },
  { id: 'data', name: 'Data Processing' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'product', name: 'Product' },
  { id: 'personal', name: 'Personal' },
];

// Templates data
const templatesData = [
  {
    id: 'seo-blog',
    emoji: '📝',
    title: 'AI-Powered SEO Blog Generator',
    description: 'Automate the creation of SEO-optimized blog posts using AI and NLP',
    category: 'marketing',
    backgroundColor: '#10b981'
  },
  {
    id: 'perplexity',
    emoji: '🌐',
    title: 'Perplexity Clone',
    description: 'This workflow searches the web and uses an LLM to format a response',
    category: 'ai',
    backgroundColor: '#4f46e5'
  },
  {
    id: 'basic-llm',
    emoji: '🚀',
    title: 'Basic LLM Workflow',
    description: 'Enhance your productivity with the Basic LLM Workflow',
    category: 'ai',
    backgroundColor: '#b91c1c'
  },
  {
    id: 'slack-rag',
    emoji: '💬',
    title: 'AI Slack RAG Bot (Simple)',
    description: 'This workflow is the second part of a two-part system',
    category: 'customer-support',
    backgroundColor: '#7c3aed'
  },
  {
    id: 'rag',
    emoji: '📊',
    title: 'Basic RAG Workflow',
    description: "A basic RAG workflow template using Scout's powerful workflow builder",
    category: 'ai',
    backgroundColor: '#db2777'
  },
  {
    id: 'model-comparison',
    emoji: '⚖️',
    title: 'LLM Model Comparison Tool',
    description: 'Compare the performance, cost, and output of multiple AI language models',
    category: 'ai',
    backgroundColor: '#059669'
  },
  {
    id: 'email-generator',
    emoji: '📧',
    title: 'AI Email Generator',
    description: 'Generate professional emails with customizable templates and tone',
    category: 'marketing',
    backgroundColor: '#d97706'
  },
  {
    id: 'data-analysis',
    emoji: '📈',
    title: 'Data Analysis Pipeline',
    description: 'Process and analyze data from multiple sources',
    category: 'data',
    backgroundColor: '#0ea5e9'
  },
  {
    id: 'customer-service',
    emoji: '🎭',
    title: 'Customer Service Agent',
    description: 'AI-powered customer service agent workflow',
    category: 'customer-support',
    backgroundColor: '#8b5cf6'
  }
];

const TemplatesTab = ({ onUseTemplate }: TemplatesTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter templates based on search and category
  const filteredTemplates = templatesData.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getCategoryName = () => {
    const category = templateCategories.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'All Templates';
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Templates</h2>
        
        <div className="flex gap-3 flex-col sm:flex-row">
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
          <div className="relative">
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

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <div className="mb-3">
            <Search className="h-12 w-12 mx-auto text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-1">No templates found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard 
              key={template.id}
              emoji={template.emoji}
              title={template.title}
              description={template.description}
              onClick={onUseTemplate}
              backgroundColor={template.backgroundColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesTab;
