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

// Input Node Types
export type InputNodeType = 
  | 'text-input'
  | 'url-input'
  | 'json-input'
  | 'file-upload'
  | 'webhook-trigger'
  | 'schedule-trigger'
  | 'api-trigger';

// LLM Node Types
export type LLMNodeType = 
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'claude-3-opus'
  | 'claude-3-sonnet'
  | 'claude-3-haiku'
  | 'anthropic'
  | 'gemini-pro'
  | 'gemini-ultra'
  | 'mistral'
  | 'llama-2'
  | 'custom-llm'
  | 'stream-output';

// Collection Node Types
export type CollectionNodeType = 
  | 'collection-query'
  | 'collection-save'
  | 'collection-update'
  | 'collection-delete'
  | 'vector-query'
  | 'vector-save';

// Text Processing Node Types
export type TextProcessingNodeType = 
  | 'text-splitter'
  | 'text-formatter'
  | 'text-extractor'
  | 'html-to-text'
  | 'markdown-to-html';

// Logic Node Types
export type LogicNodeType = 
  | 'conditional'
  | 'switch'
  | 'loop'
  | 'merge'
  | 'map'
  | 'filter'
  | 'delay';

// Integration Node Types
export type IntegrationNodeType = 
  | 'http-request'
  | 'api-connection'
  | 'email-sender'
  | 'slack-integration'
  | 'discord-integration';

// Data Transformation Node Types
export type DataTransformationNodeType = 
  | 'json-transform'
  | 'csv-parser'
  | 'data-mapping';

// Code Node Types
export type CodeNodeType = 
  | 'javascript'
  | 'python'
  | 'shell';

// Search Node Types
export type SearchNodeType = 
  | 'web-search'
  | 'web-scraper'
  | 'serp-results';

// Combined Node Type
export type NodeType = 
  | 'input'
  | 'output'
  | 'llm'
  | 'condition'
  | 'loop'
  | 'transform'
  | 'api'
  | 'data'
  | 'collection'
  | 'memory'
  | 'process'
  | 'gpt-4';

// Port Interface
export interface Port {
  id: string;
  type: DataType;
  name: string;
  description?: string;
}

// Node Data Interface
export interface NodeData {
  category: NodeCategory;
  type: NodeType;
  label: string;
  inputs: Port[];
  outputs: Port[];
  config: Record<string, any>;
  state: 'idle' | 'running' | 'completed' | 'error';
  error?: string;
  metadata: {
    description?: string;
    icon?: string;
    color?: string;
  };
}

// Node Object Interface
export interface NodeObject {
  id: string;
  type: NodeType;
  title: string;
  category: NodeCategory;
  x: number;
  y: number;
  data: NodeData;
}

// Connection Object Interface
export interface ConnectionObject {
  id: string;
  type: string;
  from: string;
  to: string;
  fromPort: string;
  toPort: string;
  animated?: boolean;
  style?: CSSProperties;
}

// Connection Props Interface
export interface ConnectionProps {
  id: string;
  type: string;
  from: string;
  to: string;
  fromPort: string;
  toPort: string;
  animated?: boolean;
  style?: CSSProperties;
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
  onClick: () => void;
  onDragStart: (e: React.MouseEvent) => void;
  onDragMove: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
  onUpdate: (data: NodeData) => void;
  onDelete: () => void;
}

// Workflow Data Interface
export interface WorkflowData {
  id: string;
  name: string;
  version: string;
  timestamp: number;
  nodes: NodeObject[];
  connections: ConnectionObject[];
}

// Workflow Edge Interface
export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type: DataType;
  animated?: boolean;
}

// Template Interface
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  workflow: WorkflowData;
  requiredBlocks: NodeType[];
  documentation?: string;
  version: string;
  author?: string;
  rating?: number;
  downloads?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export enum ExecutionState {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ERROR = 'error'
}

export interface ConsoleMessage {
  id: string;
  timestamp: Date;
  level: 'info' | 'debug' | 'warn' | 'error';
  message: string;
  nodeId?: string;
  data?: any;
}

export type BackgroundVariant = 'dots' | 'lines' | 'cross';

export interface CustomComponents {
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
}
