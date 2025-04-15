import { NodeType, NodeData, NodeObject, Port } from '../../types';

export interface NodeFactoryConfig {
  type: NodeType;
  position: { x: number; y: number };
  data?: Partial<NodeData>;
  width?: number;
  height?: number;
}

export interface NodeTemplate {
  type: NodeType;
  data: Partial<NodeData>;
}
