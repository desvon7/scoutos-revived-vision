import { NodeType, Port } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const defaultPorts: Record<NodeType, { inputs: Port[]; outputs: Port[] }> = {
  [NodeType.TEXT_INPUT]: {
    inputs: [],
    outputs: [
      {
        id: uuidv4(),
        name: 'text',
        dataType: 'string',
        label: 'Text',
        required: true
      }
    ]
  },
  [NodeType.URL_INPUT]: {
    inputs: [],
    outputs: [
      {
        id: uuidv4(),
        name: 'url',
        dataType: 'string',
        label: 'URL',
        required: true
      }
    ]
  },
  [NodeType.JSON_INPUT]: {
    inputs: [],
    outputs: [
      {
        id: uuidv4(),
        name: 'data',
        dataType: 'json',
        label: 'JSON Data',
        required: true
      }
    ]
  },
  [NodeType.FILE_UPLOAD]: {
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
  [NodeType.GPT_4]: {
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
  [NodeType.GPT_35_TURBO]: {
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
  [NodeType.OUTPUT]: {
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
  [NodeType.STREAM_OUTPUT]: {
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
  [NodeType.CONDITION]: {
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
  [NodeType.LOOP]: {
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
  [NodeType.API]: {
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
};
