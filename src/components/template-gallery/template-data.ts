
import { 
  Brain, 
  MessageSquare, 
  Database, 
  Cpu, 
  Code, 
  FileText,
  FileOutput,
  BarChart,
  BookOpen,
  Mail,
  Globe,
  Search,
  Zap,
  Layers,
  Star,
  Users,
  DollarSign
} from 'lucide-react';
import React from 'react';

export interface Template {
  id: string;
  emoji: string;
  title: string;
  description: string;
  category: string;
  backgroundColor: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Templates', icon: Layers },
  { id: 'ai', name: 'AI & Machine Learning', icon: Brain },
  { id: 'customer-support', name: 'Customer Support', icon: MessageSquare },
  { id: 'marketing', name: 'Marketing', icon: Mail },
  { id: 'sales', name: 'Sales', icon: DollarSign },
  { id: 'data', name: 'Data Processing', icon: Database },
  { id: 'engineering', name: 'Engineering', icon: Code },
  { id: 'popular', name: 'Popular', icon: Star },
  { id: 'product', name: 'Product', icon: Cpu },
  { id: 'personal', name: 'Personal', icon: Users },
];

export const templates: Template[] = [
  {
    id: 'seo-blog',
    emoji: '📝',
    title: 'AI-Powered SEO Blog Generator',
    description: 'Automate the creation of SEO-optimized blog posts using AI and NLP',
    category: 'marketing',
    backgroundColor: '#10b981',
    featured: true
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
  },
  {
    id: 'newsletter',
    emoji: '📰',
    title: 'Newsletter Generator',
    description: 'Create engaging newsletters with AI assistance',
    category: 'marketing',
    backgroundColor: '#ec4899'
  },
  {
    id: 'code-review',
    emoji: '🔍',
    title: 'AI Code Reviewer',
    description: 'Automated code reviews using AI',
    category: 'engineering',
    backgroundColor: '#6366f1'
  },
  {
    id: 'knowledge-base',
    emoji: '📚',
    title: 'Knowledge Base Builder',
    description: 'Build and organize your knowledge base efficiently',
    category: 'data',
    backgroundColor: '#0f766e'
  }
];
