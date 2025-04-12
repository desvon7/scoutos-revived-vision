import React from 'react';
import { 
  MessageSquare, 
  Database, 
  Cpu, 
  ArrowRight, 
  Brain,
  FileText,
  FileOutput
} from 'lucide-react';
import { NodeType } from './types';

export interface NodeTemplate {
  type: string;
  label: string;
  icon: React.ReactNode;
  name: string;
  description: string;
}

export const nodeTemplates: NodeTemplate[] = [
  {
    type: 'input',
    label: 'Input',
    icon: <FileText className="h-5 w-5" />,
    name: 'Input Node',
    description: 'Start your workflow with user input'
  },
  {
    type: 'collection',
    label: 'Collection',
    icon: <Database className="h-5 w-5" />,
    name: 'Collection Node',
    description: 'Connect to a data collection'
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: <Brain className="h-5 w-5" />,
    name: 'LLM Node',
    description: 'Process with language model'
  },
  {
    type: 'output',
    label: 'Output',
    icon: <FileOutput className="h-5 w-5" />,
    name: 'Output Node',
    description: 'End your workflow with output'
  },
];
