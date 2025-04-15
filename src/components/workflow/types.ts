
import { DataType, NodeCategory, ExecutionState } from '../../types/nodes';

export interface Port {
  id: string;
  name: string;
  dataType: DataType;
  label?: string;
  description?: string;
  required?: boolean;
  default?: any;
}

export interface NodeObject {
  id: string;
  type: string;
  position: { x: number; y: number };
  data?: Record<string, any>;
  selected?: boolean;
  dragging?: boolean;
}

export interface NodeProps {
  node: NodeObject;
  selected: boolean;
  onSelect: (id: string) => void;
}

export interface NodePaletteProps {
  onDragStart: (type: string) => void;
}

export interface WorkflowCanvasProps {
  nodes: NodeObject[];
  connections: WorkflowEdge[];
  onNodeClick: (id: string) => void;
}

export interface PropertiesPanelProps {
  selectedNodeId: string | null;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

export interface ConnectionObject {
  id: string;
  from: string;
  to: string;
  fromPort?: string;
  toPort?: string;
  type?: string;
  animated?: boolean;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  animated?: boolean;
  label?: string;
  type?: string;
}

export interface WorkflowData {
  id: string;
  name: string;
  description?: string;
  version: string;
  nodes: NodeObject[];
  connections: ConnectionObject[];
  edges?: WorkflowEdge[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  nodeId?: string;
  data?: any;
}

// Node types for the palette
export enum NodeType {
  // Input Nodes
  TEXT_INPUT = 'text_input',
  URL_INPUT = 'url_input',
  JSON_INPUT = 'json_input',
  FILE_UPLOAD = 'file_upload',
  
  // LLM Nodes
  GPT_4 = 'gpt_4',
  GPT_35_TURBO = 'gpt_35_turbo',
  CLAUDE_3_OPUS = 'claude_3_opus',
  CLAUDE_3_SONNET = 'claude_3_sonnet',
  
  // Logic Nodes
  CONDITION = 'condition',
  LOOP = 'loop',
  
  // Processing Nodes
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
  
  // Integration Nodes
  API = 'api',
  WEBHOOK = 'webhook',
  
  // Data Nodes
  COLLECTION = 'collection',
  VECTOR_DB = 'vector_db',
  
  // Output Nodes
  OUTPUT = 'output',
  STREAM_OUTPUT = 'stream_output'
}
