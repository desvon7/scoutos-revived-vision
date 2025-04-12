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
}

export const nodeTemplates: NodeTemplate[] = [
  {
    type: 'input',
    label: 'Input',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    type: 'collection',
    label: 'Collection',
    icon: <Database className="h-5 w-5" />,
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: <Brain className="h-5 w-5" />,
  },
  {
    type: 'output',
    label: 'Output',
    icon: <FileOutput className="h-5 w-5" />,
  },
];
