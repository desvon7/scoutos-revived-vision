
export type DataType = 
  | 'string' 
  | 'number' 
  | 'boolean' 
  | 'date'
  | 'object'
  | 'array'
  | 'file'
  | 'stream'
  | 'json'
  | 'html'
  | 'markdown'
  | 'vector'
  | 'any';

export enum NodeCategory {
  INPUT = 'input',
  LLM = 'llm',
  COLLECTION = 'collection',
  TEXT_PROCESSING = 'text_processing',
  LOGIC = 'logic',
  INTEGRATION = 'integration',
  DATA = 'data',
  CODE = 'code',
  OUTPUT = 'output'
}

export enum NodeType {
  TEXT_INPUT = 'text_input',
  URL_INPUT = 'url_input',
  JSON_INPUT = 'json_input',
  FILE_UPLOAD = 'file_upload',
  
  GPT_4 = 'gpt_4',
  GPT_35_TURBO = 'gpt_35_turbo',
  
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
  
  CONDITION = 'condition',
  LOOP = 'loop',
  
  OUTPUT = 'output',
  STREAM_OUTPUT = 'stream_output',
  
  API = 'api',
  WEBHOOK = 'webhook'
}

export interface Port {
  id: string;
  name: string;
  label?: string;
  description?: string;
  dataType: DataType;
  required?: boolean;
  default?: any;
}

export interface NodeData {
  label: string;
  description?: string;
  inputs: Port[];
  outputs: Port[];
  config: Record<string, any>;
  category: NodeCategory;
  type: NodeType;
  icon?: string;
  color?: string;
}

export interface Node {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: NodeData;
  selected?: boolean;
  dragging?: boolean;
}
