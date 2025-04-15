
import { NodeType, NodeCategory, DataType, Port } from './types';

// Define node metadata
interface NodeTypeMetadata {
  label: string;
  category: NodeCategory;
  description: string;
  inputs: Port[];
  outputs: Port[];
  defaults: Record<string, any>;
}

// Define the registry
const nodeTypes: Record<NodeType, NodeTypeMetadata> = {
  // Input nodes
  [NodeType.TEXT_INPUT]: {
    label: 'Text Input',
    category: 'input',
    description: 'Plain text input node',
    inputs: [],
    outputs: [
      { id: 'output', type: 'string', name: 'Text' }
    ],
    defaults: {
      text: 'Enter your text here...'
    }
  },
  [NodeType.URL_INPUT]: {
    label: 'URL Input',
    category: 'input',
    description: 'URL input node',
    inputs: [],
    outputs: [
      { id: 'output', type: 'string', name: 'URL' }
    ],
    defaults: {
      url: 'https://'
    }
  },
  [NodeType.JSON_INPUT]: {
    label: 'JSON Input',
    category: 'input',
    description: 'JSON data input node',
    inputs: [],
    outputs: [
      { id: 'output', type: 'object', name: 'JSON' }
    ],
    defaults: {
      json: '{}'
    }
  },
  [NodeType.FILE_UPLOAD]: {
    label: 'File Upload',
    category: 'input',
    description: 'File upload node',
    inputs: [],
    outputs: [
      { id: 'output', type: 'file', name: 'File' }
    ],
    defaults: {}
  },
  
  // LLM nodes
  [NodeType.GPT_4]: {
    label: 'GPT-4',
    category: 'llm',
    description: 'OpenAI GPT-4 model',
    inputs: [
      { id: 'input', type: 'string', name: 'Prompt' }
    ],
    outputs: [
      { id: 'output', type: 'string', name: 'Response' }
    ],
    defaults: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1000
    }
  },
  [NodeType.GPT_35_TURBO]: {
    label: 'GPT-3.5 Turbo',
    category: 'llm',
    description: 'OpenAI GPT-3.5 Turbo model',
    inputs: [
      { id: 'input', type: 'string', name: 'Prompt' }
    ],
    outputs: [
      { id: 'output', type: 'string', name: 'Response' }
    ],
    defaults: {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1000
    }
  },
  [NodeType.CLAUDE_3_OPUS]: {
    label: 'Claude 3 Opus',
    category: 'llm',
    description: 'Anthropic Claude 3 Opus model',
    inputs: [
      { id: 'input', type: 'string', name: 'Prompt' }
    ],
    outputs: [
      { id: 'output', type: 'string', name: 'Response' }
    ],
    defaults: {
      model: 'claude-3-opus',
      temperature: 0.7,
      maxTokens: 1000
    }
  },
  [NodeType.CLAUDE_3_SONNET]: {
    label: 'Claude 3 Sonnet',
    category: 'llm',
    description: 'Anthropic Claude 3 Sonnet model',
    inputs: [
      { id: 'input', type: 'string', name: 'Prompt' }
    ],
    outputs: [
      { id: 'output', type: 'string', name: 'Response' }
    ],
    defaults: {
      model: 'claude-3-sonnet',
      temperature: 0.7,
      maxTokens: 1000
    }
  },
  
  // Processing nodes
  [NodeType.JAVASCRIPT]: {
    label: 'JavaScript',
    category: 'code',
    description: 'Run JavaScript code',
    inputs: [
      { id: 'input', type: 'any', name: 'Input' }
    ],
    outputs: [
      { id: 'output', type: 'any', name: 'Output' }
    ],
    defaults: {
      code: '// Your code here\nreturn input;'
    }
  },
  [NodeType.PYTHON]: {
    label: 'Python',
    category: 'code',
    description: 'Run Python code',
    inputs: [
      { id: 'input', type: 'any', name: 'Input' }
    ],
    outputs: [
      { id: 'output', type: 'any', name: 'Output' }
    ],
    defaults: {
      code: '# Your code here\nreturn input'
    }
  },
  
  // Logic nodes
  [NodeType.CONDITION]: {
    label: 'Condition',
    category: 'logic',
    description: 'Conditional branching',
    inputs: [
      { id: 'input', type: 'any', name: 'Input' },
      { id: 'condition', type: 'boolean', name: 'Condition' }
    ],
    outputs: [
      { id: 'true', type: 'any', name: 'True' },
      { id: 'false', type: 'any', name: 'False' }
    ],
    defaults: {
      condition: 'input === true'
    }
  },
  [NodeType.LOOP]: {
    label: 'Loop',
    category: 'logic',
    description: 'Loop through items',
    inputs: [
      { id: 'items', type: 'array', name: 'Items' }
    ],
    outputs: [
      { id: 'item', type: 'any', name: 'Item' },
      { id: 'complete', type: 'array', name: 'Complete' }
    ],
    defaults: {}
  },
  
  // Output nodes
  [NodeType.TEXT_OUTPUT]: {
    label: 'Text Output',
    category: 'output',
    description: 'Text output node',
    inputs: [
      { id: 'input', type: 'string', name: 'Text' }
    ],
    outputs: [],
    defaults: {}
  },
  [NodeType.JSON_OUTPUT]: {
    label: 'JSON Output',
    category: 'output',
    description: 'JSON output node',
    inputs: [
      { id: 'input', type: 'object', name: 'Data' }
    ],
    outputs: [],
    defaults: {}
  },
  
  // Integration nodes
  [NodeType.API]: {
    label: 'API Request',
    category: 'integration',
    description: 'Make API requests',
    inputs: [
      { id: 'input', type: 'any', name: 'Input' }
    ],
    outputs: [
      { id: 'output', type: 'any', name: 'Response' }
    ],
    defaults: {
      url: 'https://api.example.com',
      method: 'GET'
    }
  },
  [NodeType.WEBHOOK]: {
    label: 'Webhook',
    category: 'integration',
    description: 'Webhook integration',
    inputs: [
      { id: 'input', type: 'any', name: 'Payload' }
    ],
    outputs: [
      { id: 'output', type: 'any', name: 'Response' }
    ],
    defaults: {
      url: 'https://webhook.example.com'
    }
  },
  
  // Data nodes
  [NodeType.COLLECTION]: {
    label: 'Collection',
    category: 'data',
    description: 'Data collection',
    inputs: [
      { id: 'query', type: 'string', name: 'Query' }
    ],
    outputs: [
      { id: 'results', type: 'array', name: 'Results' }
    ],
    defaults: {
      collection: 'documents'
    }
  },
  [NodeType.VECTOR_DB]: {
    label: 'Vector Database',
    category: 'data',
    description: 'Vector database node',
    inputs: [
      { id: 'query', type: 'string', name: 'Query' },
      { id: 'embed', type: 'any', name: 'Embedding' }
    ],
    outputs: [
      { id: 'results', type: 'array', name: 'Results' }
    ],
    defaults: {
      namespace: 'default'
    }
  }
};

export { nodeTypes };

// Export types for ReactFlow
export const nodeComponentTypes = Object.fromEntries(
  Object.values(NodeType).map(type => [type, type])
);

export const edgeTypes = {
  default: 'default',
  animated: 'animated'
};

export default {
  getNodeTypeMetadata: (type: NodeType): NodeTypeMetadata => nodeTypes[type]
};
