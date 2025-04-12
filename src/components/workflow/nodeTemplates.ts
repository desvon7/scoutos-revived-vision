
import { NodeType } from './Node';

export interface NodeTemplate {
  type: NodeType;
  title: string;
  description: string;
}

export const nodeTemplates: NodeTemplate[] = [
  { type: 'input', title: 'User Input', description: 'Start with user message' },
  { type: 'memory', title: 'Memory', description: 'Access stored information' },
  { type: 'process', title: 'Process', description: 'Transform data' },
  { type: 'llm', title: 'LLM', description: 'Generate AI responses' },
  { type: 'output', title: 'Output', description: 'Return final response' }
];
