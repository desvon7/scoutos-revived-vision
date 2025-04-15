import { NodeType, NodeCategory, DataType } from '../types';

export interface NodePort {
  name: string;
  dataType: DataType;
  description?: string;
  required?: boolean;
  default?: any;
}

export interface NodeTypeMetadata {
  type: NodeType;
  category: NodeCategory;
  label: string;
  description: string;
  icon: string;
  color: string;
  defaultConfig: Record<string, any>;
  inputs: NodePort[];
  outputs: NodePort[];
}

export interface NodeRegistryInterface {
  registerNodeType(metadata: NodeTypeMetadata): void;
  getNodeTypeMetadata(type: NodeType): NodeTypeMetadata | undefined;
  getAllNodeTypes(): NodeType[];
  getNodeTypesByCategory(category: NodeCategory): NodeType[];
}
