import React, { useState } from 'react';
import TemplateFilters from './TemplateFilters';
import TemplateList from './TemplateList';
import TemplateActions from './TemplateActions';
import WorkflowBuilder from '@/components/WorkflowBuilder';

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
    backgroundColor: '#10b981',
  },
  {
    id: 'perplexity',
    title: 'Perplexity Clone',
    description: 'This workflow searches the web and uses an LLM to format a response',
    icon: '🌐',
    category: 'ai',
    backgroundColor: '#4f46e5',
  },
  {
    id: 'basic',
    title: 'Basic LLM Workflow',
    description: 'Enhance your productivity with the Basic LLM Workflow',
    icon: '🚀',
    category: 'ai',
    backgroundColor: '#b91c1c',
  },
  {
    id: 'slack',
    title: 'AI Slack RAG Bot (Simple)',
    description: 'This workflow is the second part of a two-part system',
    icon: '💬',
    category: 'customer-support',
    backgroundColor: '#7c3aed',
  },
  {
    id: 'rag',
    title: 'Basic RAG Workflow',
    description: "A basic RAG workflow template using Scout's powerful workflow builder",
    icon: '📊',
    category: 'ai',
    backgroundColor: '#db2777',
  },
  {
    id: 'comparison',
    title: 'LLM Model Comparison Tool',
    description: 'Compare the performance, cost, and output of multiple AI language models',
    icon: '⚖️',
    category: 'ai',
    backgroundColor: '#059669',
  },
];

const TemplateSelection = ({ navigate }: TemplateSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter templates based on search and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;

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

  return (
    <div>
      <TemplateFilters
        categories={templateCategories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
        handleClearSearch={handleClearSearch}
      />

      <TemplateList
        templates={templates}
        filteredTemplates={filteredTemplates}
        searchQuery={searchQuery}
        handleUseTemplate={handleUseTemplate}
      />

      <TemplateActions
        onUseTemplate={handleUseTemplate}
        onStartFromScratch={handleStartFromScratch}
      />

      <div className="mt-12">
        <h3 className="text-xl font-medium mb-6">Workflow Builder Preview</h3>
        <WorkflowBuilder />
      </div>
    </div>
  );
};

export default TemplateSelection;
