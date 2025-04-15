
import { NodeType, NodeCategory, DataType } from '../types';
import { NodeTypeMetadata } from './types';

export const inputNodes: NodeTypeMetadata[] = [
  {
    type: NodeType.TEXT_INPUT,
    category: NodeCategory.INPUT,
    label: 'Text Input',
    description: 'Plain text input node',
    icon: 'TextIcon',
    color: '#4CAF50',
    defaultConfig: {
      placeholder: 'Enter text...',
      multiline: false
    },
    inputs: [],
    outputs: [
      {
        name: 'text',
        dataType: DataType.STRING,
        description: 'Text output'
      }
    ]
  },
  {
    type: NodeType.URL_INPUT,
    category: NodeCategory.INPUT,
    label: 'URL Input',
    description: 'URL input node',
    icon: 'LinkIcon',
    color: '#2196F3',
    defaultConfig: {
      placeholder: 'Enter URL...',
      validateUrl: true
    },
    inputs: [],
    outputs: [
      {
        name: 'url',
        dataType: DataType.STRING,
        description: 'URL output'
      }
    ]
  }
];
