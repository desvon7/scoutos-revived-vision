
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
        name: 'file',
        dataType: 'file',
        label: 'File',
        required: true
      }
    ]
  },
  [NodeType.GPT_4]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'prompt',
        dataType: 'string',
        label: 'Prompt',
        required: true
      },
      {
        id: uuidv4(),
        name: 'config',
        dataType: 'object',
        label: 'Configuration',
        required: false
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'response',
        dataType: 'string',
        label: 'Response',
        required: true
      }
    ]
  },
  [NodeType.GPT_35_TURBO]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'prompt',
        dataType: 'string',
        label: 'Prompt',
        required: true
      },
      {
        id: uuidv4(),
        name: 'config',
        dataType: 'object',
        label: 'Configuration',
        required: false
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'response',
        dataType: 'string',
        label: 'Response',
        required: true
      }
    ]
  },
  [NodeType.CLAUDE_3_OPUS]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'prompt',
        dataType: 'string',
        label: 'Prompt',
        required: true
      },
      {
        id: uuidv4(),
        name: 'config',
        dataType: 'object',
        label: 'Configuration',
        required: false
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'response',
        dataType: 'string',
        label: 'Response',
        required: true
      }
    ]
  },
  [NodeType.CLAUDE_3_SONNET]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'prompt',
        dataType: 'string',
        label: 'Prompt',
        required: true
      },
      {
        id: uuidv4(),
        name: 'config',
        dataType: 'object',
        label: 'Configuration',
        required: false
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'response',
        dataType: 'string',
        label: 'Response',
        required: true
      }
    ]
  },
  [NodeType.OUTPUT]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'input',
        dataType: 'any',
        label: 'Input',
        required: true
      }
    ],
    outputs: []
  },
  [NodeType.STREAM_OUTPUT]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'input',
        dataType: 'string',
        label: 'Input',
        required: true
      }
    ],
    outputs: []
  },
  [NodeType.CONDITION]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'condition',
        dataType: 'boolean',
        label: 'Condition',
        required: true
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'true',
        dataType: 'any',
        label: 'True',
        required: true
      },
      {
        id: uuidv4(),
        name: 'false',
        dataType: 'any',
        label: 'False',
        required: true
      }
    ]
  },
  [NodeType.LOOP]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'items',
        dataType: 'array',
        label: 'Items',
        required: true
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'item',
        dataType: 'any',
        label: 'Item',
        required: true
      }
    ]
  },
  [NodeType.API]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'request',
        dataType: 'object',
        label: 'Request',
        required: true
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'response',
        dataType: 'object',
        label: 'Response',
        required: true
      }
    ]
  },
  [NodeType.WEBHOOK]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'request',
        dataType: 'object',
        label: 'Request',
        required: true
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'response',
        dataType: 'object',
        label: 'Response',
        required: true
      }
    ]
  },
  [NodeType.COLLECTION]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'query',
        dataType: 'string',
        label: 'Query',
        required: true
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'results',
        dataType: 'array',
        label: 'Results',
        required: true
      }
    ]
  },
  [NodeType.VECTOR_DB]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'embedding',
        dataType: 'vector',
        label: 'Embedding',
        required: true
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'results',
        dataType: 'array',
        label: 'Results',
        required: true
      }
    ]
  },
  [NodeType.JAVASCRIPT]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'input',
        dataType: 'any',
        label: 'Input',
        required: true
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'output',
        dataType: 'any',
        label: 'Output',
        required: true
      }
    ]
  },
  [NodeType.PYTHON]: {
    inputs: [
      {
        id: uuidv4(),
        name: 'input',
        dataType: 'any',
        label: 'Input',
        required: true
      }
    ],
    outputs: [
      {
        id: uuidv4(),
        name: 'output',
        dataType: 'any',
        label: 'Output',
        required: true
      }
    ]
  }
};
