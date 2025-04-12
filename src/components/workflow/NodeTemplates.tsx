
import React from 'react';
import { 
  MessageSquare, 
  Database, 
  Cpu, 
  ArrowRight, 
  Brain,
  FileText,
  FileOutput,
  BarChart,
  Code,
  BookOpen,
  Mail,
  Globe,
  Search,
  Zap
} from 'lucide-react';
import { NodeType } from './types';

export interface NodeTemplate {
  type: string;
  label: string;
  icon: React.ReactNode;
  name: string;
  description: string;
  category: string;
  backgroundColor?: string;
}

export const nodeTemplates: NodeTemplate[] = [
  {
    type: 'input',
    label: 'Input',
    icon: <FileText className="h-5 w-5" />,
    name: 'Input Node',
    description: 'Start your workflow with user input',
    category: 'Basic',
    backgroundColor: '#4f46e5'
  },
  {
    type: 'collection',
    label: 'Collection',
    icon: <Database className="h-5 w-5" />,
    name: 'Collection Node',
    description: 'Connect to a data collection',
    category: 'Data',
    backgroundColor: '#7c3aed'
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: <Brain className="h-5 w-5" />,
    name: 'LLM Node',
    description: 'Process with language model',
    category: 'AI',
    backgroundColor: '#b91c1c'
  },
  {
    type: 'output',
    label: 'Output',
    icon: <FileOutput className="h-5 w-5" />,
    name: 'Output Node',
    description: 'End your workflow with output',
    category: 'Basic',
    backgroundColor: '#10b981'
  },
  {
    type: 'analysis',
    label: 'Analysis',
    icon: <BarChart className="h-5 w-5" />,
    name: 'Analysis Node',
    description: 'Analyze and process data',
    category: 'Data',
    backgroundColor: '#0ea5e9'
  },
  {
    type: 'code',
    label: 'Code',
    icon: <Code className="h-5 w-5" />,
    name: 'Code Node',
    description: 'Run custom code snippets',
    category: 'Engineering',
    backgroundColor: '#6366f1'
  },
  {
    type: 'knowledge',
    label: 'Knowledge',
    icon: <BookOpen className="h-5 w-5" />,
    name: 'Knowledge Base',
    description: 'Connect to your knowledge base',
    category: 'AI',
    backgroundColor: '#059669'
  },
  {
    type: 'email',
    label: 'Email',
    icon: <Mail className="h-5 w-5" />,
    name: 'Email Node',
    description: 'Send automated emails',
    category: 'Marketing',
    backgroundColor: '#d97706'
  },
  {
    type: 'web',
    label: 'Web',
    icon: <Globe className="h-5 w-5" />,
    name: 'Web Scraper',
    description: 'Extract data from websites',
    category: 'Data',
    backgroundColor: '#0891b2'
  },
  {
    type: 'search',
    label: 'Search',
    icon: <Search className="h-5 w-5" />,
    name: 'Search Node',
    description: 'Search across data sources',
    category: 'Data',
    backgroundColor: '#db2777'
  }
];

// Template categories
export const nodeCategories = [
  { id: 'all', name: 'All Templates' },
  { id: 'basic', name: 'Basic' },
  { id: 'ai', name: 'AI' },
  { id: 'data', name: 'Data' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'marketing', name: 'Marketing' }
];
