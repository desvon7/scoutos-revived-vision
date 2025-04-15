
import React, { CSSProperties } from 'react';

// Base Types
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

// Node Categories
export type NodeCategory = 
  | 'input'
  | 'llm'
  | 'collection'
  | 'text-processing'
  | 'logic'
  | 'integration'
  | 'data-transformation'
  | 'code'
  | 'search'
  | 'data';

// Execution states
export enum ExecutionState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ERROR = 'error'
}

// Node types
export enum NodeType {
  // Input types
  TEXT_INPUT = 'text_input',
  URL_INPUT = 'url_input',
  JSON_INPUT = 'json_input',
  FILE_UPLOAD = 'file_upload',
  
  // LLM types
  GPT_4 = 'gpt_4',
  GPT_35_TURBO = 'gpt_35_turbo',
  CLAUDE_3_OPUS = 'claude_3_opus',
  CLAUDE_3_SONNET = 'claude_3_sonnet',
  
  // Processing types
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
  
  // Logic types
  CONDITION = 'condition',
  LOOP = 'loop',
  
  // Output types
  TEXT_OUTPUT = 'text_output',
  JSON_OUTPUT = 'json_output',
  
  // Integration types
  API = 'api',
  WEBHOOK = 'webhook',
  
  // Data types
  COLLECTION = 'collection',
  VECTOR_DB = 'vector_db'
}

// Port Interface
export interface Port {
  id: string;
  type: DataType;
  name: string;
  description?: string;
  required?: boolean;
  default?: any;
}

// Node Data Interface
export interface NodeData {
  category?: NodeCategory;
  type: NodeType;
  label?: string;
  inputs?: Port[];
  outputs?: Port[];
  config?: Record<string, any>;
  state?: 'idle' | 'running' | 'completed' | 'error';
  error?: string;
  metadata?: {
    description?: string;
    icon?: string;
    color?: string;
  };
  [key: string]: any;
}

// Node Object Interface
export interface NodeObject {
  id: string;
  type: NodeType;
  title: string;
  category?: NodeCategory;
  x: number;
  y: number;
  data: NodeData;
  width?: number;
  height?: number;
  selected?: boolean;
  dragging?: boolean;
  zIndex?: number;
  position?: {
    x: number;
    y: number;
  };
}

// Log Entry Interface
export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  nodeId?: string;
  data?: any;
}

// Node Props Interface
export interface NodeProps {
  id: string;
  type: NodeType;
  title: string;
  category: NodeCategory;
  x: number;
  y: number;
  data: NodeData;
  isSelected: boolean;
  width?: number;
  height?: number;
  onClick: () => void;
  onDragStart: (e: React.MouseEvent) => void;
  onDragMove: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
  onUpdate: (data: Partial<NodeData>) => void;
  onDelete: (id: string) => void;
}

// Node Palette Props
export interface NodePaletteProps {
  onDragStart: (type: NodeType) => void;
}

// WorkflowCanvas Props
export interface WorkflowCanvasProps {
  nodes: NodeObject[];
  connections: any[];
  onNodeClick: (id: string) => void;
}

// PropertiesPanel Props
export interface PropertiesPanelProps {
  selectedNodeId: string | null;
  onUpdate: (id: string, data: Partial<NodeData>) => void;
  onDelete: (id: string) => void;
}
