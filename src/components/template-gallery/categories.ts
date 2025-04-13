
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
  DollarSign,
  Bot,
  BookMarked,
  Languages,
  Scroll,
  LineChart,
  Newspaper,
  BarChartHorizontal,
  Share2,
  CloudRain,
  FileSpreadsheet
} from 'lucide-react';
import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Templates', icon: Layers },
  { id: 'ai-assistants', name: 'AI Assistants & Bots', icon: Bot },
  { id: 'content-generation', name: 'Content Generation', icon: FileText },
  { id: 'data-analysis', name: 'Data Analysis & Research', icon: LineChart },
  { id: 'seo', name: 'SEO & Metadata', icon: Search },
  { id: 'social-media', name: 'Social Media & Integration', icon: Share2 },
  { id: 'specialized-tools', name: 'Specialized Tools', icon: Zap },
  { id: 'marketing', name: 'Marketing', icon: Mail },
  { id: 'customer-support', name: 'Customer Support', icon: MessageSquare },
  { id: 'engineering', name: 'Engineering', icon: Code },
  { id: 'ai', name: 'AI & Machine Learning', icon: Brain },
  { id: 'popular', name: 'Popular', icon: Star },
  { id: 'sales', name: 'Sales', icon: DollarSign },
  { id: 'product', name: 'Product', icon: Cpu },
  { id: 'personal', name: 'Personal', icon: Users },
];
