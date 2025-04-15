
import { NodeType, NodeCategory, DataType, Port } from '../types';

export interface NodeTypeMetadata {
  type: NodeType;
  category: NodeCategory;
  label: string;
  description: string;
  icon?: string;
  color: string;
  defaultConfig: Record<string, any>;
  inputs: {
    name: string;
    dataType: DataType;
    description?: string;
    required?: boolean;
    default?: any;
  }[];
  outputs: {
    name: string;
    dataType: DataType;
    description?: string;
  }[];
}

export interface NodeRegistryInterface {
  registerNodeType: (metadata: NodeTypeMetadata) => void;
  getNodeTypeMetadata: (type: NodeType) => NodeTypeMetadata | undefined;
  getAllNodeTypes: () => NodeType[];
  getNodeTypesByCategory: (category: NodeCategory) => NodeType[];
  createNode: (type: NodeType, position: { x: number; y: number }) => Node;
}
