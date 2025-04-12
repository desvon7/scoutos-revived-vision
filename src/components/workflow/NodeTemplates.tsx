
import React from 'react';
import { 
  MessageSquare, 
  Database, 
  Cpu, 
  ArrowRight, 
  Brain,
  FileText 
} from 'lucide-react';
import { NodeType } from './types';

export interface NodeTemplate {
  type: NodeType;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const nodeTemplates: NodeTemplate[] = [
  {
    type: 'input',
    name: 'Input',
    description: 'Starting point for data',
    icon: <MessageSquare size={16} />,
  },
  {
    type: 'process',
    name: 'Process',
    description: 'Transform or process data',
    icon: <Cpu size={16} />,
  },
  {
    type: 'output',
    name: 'Output',
    description: 'Final result destination',
    icon: <ArrowRight size={16} />,
  },
  {
    type: 'memory',
    name: 'Memory',
    description: 'Store data for later use',
    icon: <FileText size={16} />,
  },
  {
    type: 'llm',
    name: 'LLM',
    description: 'Language model processing',
    icon: <Brain size={16} />,
  },
  {
    type: 'collection',
    name: 'Collection',
    description: 'Connect to data collections',
    icon: <Database size={16} />,
  },
];
