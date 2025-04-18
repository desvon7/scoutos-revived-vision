import { NodeType, NodeData } from '@/types/nodes';
import { NODE_TEMPLATES, NodeTemplate } from '@/types/nodeTemplates';

export const nodeTypes = {
  [NodeType.TEXT_INPUT]: {
    name: 'Text Input',
    description: 'Input text data into the workflow',
    category: 'input',
    icon: 'text',
    color: '#4CAF50',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.TEXT_INPUT)
      ?.defaultData,
  },
  [NodeType.FILE_INPUT]: {
    name: 'File Input',
    description: 'Upload and process files',
    category: 'input',
    icon: 'file',
    color: '#2196F3',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.FILE_INPUT)
      ?.defaultData,
  },
  [NodeType.TEXT_PROCESSING]: {
    name: 'Text Processing',
    description: 'Process and transform text data',
    category: 'processing',
    icon: 'text-processing',
    color: '#9C27B0',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.TEXT_PROCESSING)
      ?.defaultData,
  },
  [NodeType.CONDITIONAL]: {
    name: 'Conditional',
    description: 'Branch workflow based on conditions',
    category: 'processing',
    icon: 'conditional',
    color: '#FF9800',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.CONDITIONAL)
      ?.defaultData,
  },
  [NodeType.GPT_4]: {
    name: 'GPT-4',
    description: 'Process text using GPT-4',
    category: 'ai',
    icon: 'gpt',
    color: '#00BCD4',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.GPT_4)?.defaultData,
  },
  [NodeType.COLLECT]: {
    name: 'Collect',
    description: 'Collect and combine multiple inputs',
    category: 'collection',
    icon: 'collect',
    color: '#E91E63',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.COLLECT)?.defaultData,
  },
  [NodeType.TEXT_OUTPUT]: {
    name: 'Text Output',
    description: 'Display or save text output',
    category: 'output',
    icon: 'text-output',
    color: '#607D8B',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.TEXT_OUTPUT)
      ?.defaultData,
  },
  [NodeType.API]: {
    name: 'HTTP Request',
    description: 'Make HTTP requests to external APIs',
    category: 'integration',
    icon: 'api',
    color: '#795548',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.API)?.defaultData,
  },
  [NodeType.DELAY]: {
    name: 'Delay',
    description: 'Add a delay to the workflow',
    category: 'utility',
    icon: 'delay',
    color: '#9E9E9E',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.DELAY)?.defaultData,
  },
  [NodeType.JAVASCRIPT]: {
    name: 'JavaScript',
    description: 'Execute custom JavaScript code',
    category: 'custom',
    icon: 'code',
    color: '#FFC107',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.JAVASCRIPT)
      ?.defaultData,
  },
  [NodeType.CONDITION]: {
    name: 'Condition',
    description: 'Evaluate conditions and branch workflow',
    category: 'processing',
    icon: 'condition',
    color: '#FF5722',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.CONDITION)
      ?.defaultData,
  },
  [NodeType.TRANSFORM]: {
    name: 'Transform',
    description: 'Transform data between different formats',
    category: 'processing',
    icon: 'transform',
    color: '#673AB7',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.TRANSFORM)
      ?.defaultData,
  },
  [NodeType.OUTPUT]: {
    name: 'Output',
    description: 'Output data from the workflow',
    category: 'output',
    icon: 'output',
    color: '#009688',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.OUTPUT)?.defaultData,
  },
  [NodeType.LOOP]: {
    name: 'Loop',
    description: 'Repeat operations on collections',
    category: 'processing',
    icon: 'loop',
    color: '#3F51B5',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.LOOP)?.defaultData,
  },
  [NodeType.DATA]: {
    name: 'Data',
    description: 'Store and manage data',
    category: 'data',
    icon: 'data',
    color: '#795548',
    defaultData: NODE_TEMPLATES.find((t: NodeTemplate) => t.type === NodeType.DATA)?.defaultData,
  },
};
