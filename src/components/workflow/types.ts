import {
  DataType,
  NodeCategory,
  ExecutionState,
  NodeType as CoreNodeType,
} from '../../types/nodes';

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
  type: CoreNodeType;
  position: { x: number; y: number };
  data?: NodeData;
  selected?: boolean;
  dragging?: boolean;
}

export interface NodeData {
  label: string;
  description?: string;
  inputs: Port[];
  outputs: Port[];
  config: Record<string, any>;
  state: ExecutionState;
  error?: string;
  category: NodeCategory;
  type: CoreNodeType;
  icon: string;
  color: string;
}

export interface NodeProps {
  node: NodeObject;
  selected: boolean;
  onSelect: (id: string) => void;
}

export interface NodePaletteProps {
  onDragStart: (type: CoreNodeType) => void;
}

export interface WorkflowCanvasProps {
  nodes: NodeObject[];
  connections: WorkflowEdge[];
  onNodeClick: (id: string) => void;
}

export interface PropertiesPanelProps {
  selectedNodeId: string | null;
  onUpdate: (id: string, updates: Partial<NodeData>) => void;
  onDelete: (id: string) => void;
}

export interface ConnectionObject {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  type?: string;
  animated?: boolean;
}

export interface WorkflowEdge extends ConnectionObject {
  label?: string;
}

export interface WorkflowData {
  id: string;
  name: string;
  description: string;
  nodes: NodeObject[];
  connections: ConnectionObject[];
  edges?: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  nodeId?: string;
  data?: any;
}

// Re-export the core types for convenience
export { CoreNodeType as NodeType, NodeCategory, ExecutionState, DataType };
