
import { NodeType, NodeCategory } from '../types';
import { NodeTypeMetadata } from './types';

export const llmNodes: NodeTypeMetadata[] = [
  {
    type: NodeType.GPT_4,
    category: NodeCategory.LLM,
    label: 'GPT-4',
    description: 'OpenAI GPT-4 model',
    icon: 'BrainIcon',
    color: '#10A37F',
    defaultConfig: {
      temperature: 0.7,
      maxTokens: 1000,
      topP: 1
    },
    inputs: [
      {
        name: 'prompt',
        dataType: 'string',
        description: 'Input prompt',
        required: true
      }
    ],
    outputs: [
      {
        name: 'response',
        dataType: 'string',
        description: 'Model response'
      }
    ]
  },
  {
    type: NodeType.GPT_35_TURBO,
    category: NodeCategory.LLM,
    label: 'GPT-3.5 Turbo',
    description: 'OpenAI GPT-3.5 Turbo model',
    icon: 'BrainIcon',
    color: '#10A37F',
    defaultConfig: {
      temperature: 0.7,
      maxTokens: 1000,
      topP: 1
    },
    inputs: [
      {
        name: 'prompt',
        dataType: 'string',
        description: 'Input prompt',
        required: true
      }
    ],
    outputs: [
      {
        name: 'response',
        dataType: 'string',
        description: 'Model response'
      }
    ]
  }
];
