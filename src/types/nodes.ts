export enum NodeType {
  TEXT_INPUT = 'text_input',
  GPT_4 = 'gpt_4',
  API = 'api',
  CONDITION = 'condition',
  TRANSFORM = 'transform',
  OUTPUT = 'output',
  LOOP = 'loop',
  DATA = 'data'
}

export enum NodeCategory {
  INPUT = 'input',
  OUTPUT = 'output',
  LLM = 'llm',
  PROCESSING = 'processing',
  DATA = 'data',
  API = 'api',
  CUSTOM = 'custom'
}

export enum ExecutionState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ERROR = 'error'
}

export interface Port {
  id: string;
  name: string;
  dataType: DataType;
  label?: string;
  description?: string;
  required?: boolean;
  default?: any;
}

export interface NodeData {
  label: string;
  description?: string;
  inputs: Port[];
  outputs: Port[];
  config: Record<string, any>;
  configuration?: Record<string, any>;
  state: ExecutionState;
  error?: string;
  category: NodeCategory;
  type: NodeType;
  icon: string;
  color: string;
}

export interface Node {
  id: string;
  type: NodeType;
  data: NodeData;
  position: { x: number; y: number };
  selected?: boolean;
  dragging?: boolean;
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  connections: Connection[];
  createdAt: string;
  updatedAt: string;
}

export interface NodeExecutionState {
  nodeId: string;
  state: ExecutionState;
  startTime: Date;
  endTime?: Date;
  result?: any;
  error?: string;
}

export interface ExecutionContext {
  id: string;
  workflowId: string;
  state: ExecutionState;
  startTime: Date;
  endTime?: Date;
  error?: string;
  nodeStates: Map<string, NodeExecutionState>;
  outputs: Map<string, any>;
  variables: Map<string, any>;
  logs: LogEntry[];
}

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  nodeId?: string;
  data?: any;
}

export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
  DATE = 'date',
  ANY = 'any',
  FILE = 'file',
  HTML = 'html',
  MARKDOWN = 'markdown',
  JSON = 'json',
  STREAM = 'stream',
  VECTOR = 'vector',
  NULL = 'null',
  FUNCTION = 'function',
  PROMISE = 'promise'
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
} 