import { NodeType, DataType, NodeCategory } from './nodes';

export interface NodeTemplate {
  type: NodeType;
  name: string;
  description: string;
  category: NodeCategory;
  icon: string;
  color: string;
  defaultData: {
    config: Record<string, any>;
    inputs: Array<{
      id: string;
      name: string;
      dataType: DataType;
      required: boolean;
    }>;
    outputs: Array<{
      id: string;
      name: string;
      dataType: DataType;
    }>;
  };
}

export const NODE_TEMPLATES: NodeTemplate[] = [
  {
    type: NodeType.TEXT_INPUT,
    name: 'Text Input',
    description: 'Input text data into the workflow',
    category: NodeCategory.INPUT,
    icon: 'text',
    color: '#4CAF50',
    defaultData: {
      config: {
        placeholder: 'Enter text...',
        multiline: false,
      },
      inputs: [],
      outputs: [
        {
          id: 'output',
          name: 'Text',
          dataType: DataType.STRING,
        },
      ],
    },
  },
  {
    type: NodeType.FILE_INPUT,
    name: 'File Input',
    description: 'Upload and process files',
    category: NodeCategory.INPUT,
    icon: 'file',
    color: '#2196F3',
    defaultData: {
      config: {
        accept: '*/*',
        multiple: false,
      },
      inputs: [],
      outputs: [
        {
          id: 'output',
          name: 'File',
          dataType: DataType.FILE,
        },
      ],
    },
  },
  {
    type: NodeType.TEXT_PROCESSING,
    name: 'Text Processing',
    description: 'Process and transform text data',
    category: NodeCategory.PROCESSING,
    icon: 'text-processing',
    color: '#9C27B0',
    defaultData: {
      config: {
        operation: 'uppercase',
      },
      inputs: [
        {
          id: 'input',
          name: 'Text',
          dataType: DataType.STRING,
          required: true,
        },
      ],
      outputs: [
        {
          id: 'output',
          name: 'Processed Text',
          dataType: DataType.STRING,
        },
      ],
    },
  },
  {
    type: NodeType.CONDITIONAL,
    name: 'Conditional',
    description: 'Branch workflow based on conditions',
    category: NodeCategory.PROCESSING,
    icon: 'conditional',
    color: '#FF9800',
    defaultData: {
      config: {
        condition: '',
      },
      inputs: [
        {
          id: 'input',
          name: 'Value',
          dataType: DataType.ANY,
          required: true,
        },
      ],
      outputs: [
        {
          id: 'true',
          name: 'True',
          dataType: DataType.ANY,
        },
        {
          id: 'false',
          name: 'False',
          dataType: DataType.ANY,
        },
      ],
    },
  },
  {
    type: NodeType.GPT_4,
    name: 'GPT-4',
    description: 'Process text using GPT-4',
    category: NodeCategory.LLM,
    icon: 'gpt',
    color: '#00BCD4',
    defaultData: {
      config: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
      },
      inputs: [
        {
          id: 'input',
          name: 'Prompt',
          dataType: DataType.STRING,
          required: true,
        },
      ],
      outputs: [
        {
          id: 'output',
          name: 'Response',
          dataType: DataType.STRING,
        },
      ],
    },
  },
  {
    type: NodeType.COLLECT,
    name: 'Collect',
    description: 'Collect and combine multiple inputs',
    category: NodeCategory.DATA,
    icon: 'collect',
    color: '#E91E63',
    defaultData: {
      config: {
        maxItems: 10,
      },
      inputs: [
        {
          id: 'input',
          name: 'Item',
          dataType: DataType.ANY,
          required: true,
        },
      ],
      outputs: [
        {
          id: 'output',
          name: 'Collection',
          dataType: DataType.ARRAY,
        },
      ],
    },
  },
  {
    type: NodeType.TEXT_OUTPUT,
    name: 'Text Output',
    description: 'Display or save text output',
    category: NodeCategory.OUTPUT,
    icon: 'text-output',
    color: '#607D8B',
    defaultData: {
      config: {
        format: 'plain',
      },
      inputs: [
        {
          id: 'input',
          name: 'Text',
          dataType: DataType.STRING,
          required: true,
        },
      ],
      outputs: [],
    },
  },
  {
    type: NodeType.API,
    name: 'HTTP Request',
    description: 'Make HTTP requests to external APIs',
    category: NodeCategory.API,
    icon: 'api',
    color: '#795548',
    defaultData: {
      config: {
        method: 'GET',
        url: '',
        headers: {},
      },
      inputs: [
        {
          id: 'body',
          name: 'Request Body',
          dataType: DataType.ANY,
          required: false,
        },
      ],
      outputs: [
        {
          id: 'response',
          name: 'Response',
          dataType: DataType.OBJECT,
        },
      ],
    },
  },
  {
    type: NodeType.DELAY,
    name: 'Delay',
    description: 'Add a time delay in the workflow',
    category: NodeCategory.PROCESSING,
    icon: 'delay',
    color: '#9E9E9E',
    defaultData: {
      config: {
        duration: 1000,
      },
      inputs: [
        {
          id: 'input',
          name: 'Input',
          dataType: DataType.ANY,
          required: true,
        },
      ],
      outputs: [
        {
          id: 'output',
          name: 'Output',
          dataType: DataType.ANY,
        },
      ],
    },
  },
  {
    type: NodeType.JAVASCRIPT,
    name: 'JavaScript',
    description: 'Execute custom JavaScript code',
    category: NodeCategory.CUSTOM,
    icon: 'code',
    color: '#FFC107',
    defaultData: {
      config: {
        code: '',
      },
      inputs: [
        {
          id: 'input',
          name: 'Input',
          dataType: DataType.ANY,
          required: false,
        },
      ],
      outputs: [
        {
          id: 'output',
          name: 'Output',
          dataType: DataType.ANY,
        },
      ],
    },
  },
];
