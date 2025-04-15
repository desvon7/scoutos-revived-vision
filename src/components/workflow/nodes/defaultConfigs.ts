import { NodeType } from '../types';

export const defaultConfigs: Record<NodeType, Record<string, any>> = {
  [NodeType.TEXT_INPUT]: {
    placeholder: 'Enter text...',
    multiline: false,
  },
  [NodeType.URL_INPUT]: {
    placeholder: 'Enter URL...',
    validateUrl: true,
  },
  [NodeType.JSON_INPUT]: {
    placeholder: 'Enter JSON...',
    validateJson: true,
  },
  [NodeType.FILE_UPLOAD]: {
    accept: '*/*',
    multiple: false,
  },
  [NodeType.GPT_4]: {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  [NodeType.GPT_35_TURBO]: {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  },
  [NodeType.JAVASCRIPT]: {
    code: '// Write your JavaScript code here',
  },
  [NodeType.PYTHON]: {
    code: '# Write your Python code here',
  },
  [NodeType.CONDITION]: {
    condition: 'input > 0',
  },
  [NodeType.LOOP]: {
    iterations: 5,
  },
  [NodeType.OUTPUT]: {
    format: 'text',
  },
  [NodeType.STREAM_OUTPUT]: {
    format: 'text',
  },
  [NodeType.API]: {
    url: '',
    method: 'GET',
    headers: {},
  },
  [NodeType.WEBHOOK]: {
    url: '',
  },
};
