import { NodeType, Port, DataType } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Default port configurations for different node types
const defaultPorts: Record<NodeType, { inputs: Port[]; outputs: Port[] }> = {
  'text-input': {
    inputs: [],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'text',
        required: true,
        label: 'Text',
      },
    ],
  },
  'url-input': {
    inputs: [],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'url',
        required: true,
        label: 'URL',
      },
    ],
  },
  'json-input': {
    inputs: [],
    outputs: [
      {
        id: uuidv4(),
        type: 'json',
        name: 'data',
        required: true,
        label: 'JSON Data',
      },
    ],
  },
  'file-upload': {
    inputs: [],
    outputs: [
      {
        id: uuidv4(),
        type: 'file',
        name: 'file',
        required: true,
        label: 'File',
      },
    ],
  },
  'gpt-4': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'gpt-3.5-turbo': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'claude-3-opus': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'claude-3-sonnet': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'claude-3-haiku': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'anthropic': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'gemini-pro': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'gemini-ultra': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'mistral': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'llama-2': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'custom-llm': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'prompt',
        required: true,
        label: 'Prompt',
      },
      {
        id: uuidv4(),
        type: 'object',
        name: 'config',
        required: false,
        label: 'Configuration',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'stream-output': {
    inputs: [
      {
        id: uuidv4(),
        type: 'string',
        name: 'input',
        required: true,
        label: 'Input',
      },
    ],
    outputs: [],
  },
  'output': {
    inputs: [
      {
        id: uuidv4(),
        type: 'any',
        name: 'input',
        required: true,
        label: 'Input',
      },
    ],
    outputs: [],
  },
  'condition': {
    inputs: [
      {
        id: uuidv4(),
        type: 'boolean',
        name: 'condition',
        required: true,
        label: 'Condition',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'any',
        name: 'true',
        required: true,
        label: 'True',
      },
      {
        id: uuidv4(),
        type: 'any',
        name: 'false',
        required: true,
        label: 'False',
      },
    ],
  },
  'loop': {
    inputs: [
      {
        id: uuidv4(),
        type: 'array',
        name: 'items',
        required: true,
        label: 'Items',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'any',
        name: 'item',
        required: true,
        label: 'Item',
      },
    ],
  },
  'transform': {
    inputs: [
      {
        id: uuidv4(),
        type: 'any',
        name: 'input',
        required: true,
        label: 'Input',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'any',
        name: 'output',
        required: true,
        label: 'Output',
      },
    ],
  },
  'api': {
    inputs: [
      {
        id: uuidv4(),
        type: 'object',
        name: 'request',
        required: true,
        label: 'Request',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'object',
        name: 'response',
        required: true,
        label: 'Response',
      },
    ],
  },
  'data': {
    inputs: [
      {
        id: uuidv4(),
        type: 'any',
        name: 'input',
        required: true,
        label: 'Input',
      },
    ],
    outputs: [
      {
        id: uuidv4(),
        type: 'any',
        name: 'output',
        required: true,
        label: 'Output',
      },
    ],
  },
};

// Default configurations for different node types
const defaultConfigs: Record<NodeType, Record<string, any>> = {
  'text-input': {
    placeholder: 'Enter text...',
    multiline: false,
  },
  'url-input': {
    placeholder: 'Enter URL...',
    validateUrl: true,
  },
  'json-input': {
    placeholder: 'Enter JSON...',
    validateJson: true,
  },
  'file-upload': {
    accept: '*/*',
    multiple: false,
  },
  'gpt-4': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
  'gpt-3.5-turbo': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
  'claude-3-opus': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  'claude-3-sonnet': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  'claude-3-haiku': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  'anthropic': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  'gemini-pro': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  'gemini-ultra': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  'mistral': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  'llama-2': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  'custom-llm': {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  'stream-output': {
    format: 'text',
  },
  'output': {
    format: 'text',
  },
  'condition': {
    operator: 'equals',
  },
  'loop': {
    type: 'foreach',
  },
  'transform': {
    type: 'map',
  },
  'api': {
    method: 'GET',
    headers: {},
  },
  'data': {
    type: 'transform',
  },
};

export function getNodeInputs(type: NodeType): Port[] {
  return defaultPorts[type]?.inputs || [];
}

export function getNodeOutputs(type: NodeType): Port[] {
  return defaultPorts[type]?.outputs || [];
}

export function getNodeConfig(type: NodeType): Record<string, any> {
  return defaultConfigs[type] || {};
}

export function getNodeComponent(type: NodeType): React.ComponentType<any> | null {
  // This will be implemented when we create the actual node components
  return null;
} 