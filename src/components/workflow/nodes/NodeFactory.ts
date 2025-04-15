import { NodeType, NodeObject, NodeData } from '../types';
import { createNode } from './utils/nodeCreator';
import { NodeFactoryConfig, NodeTemplate } from './types/factory';

export class NodeFactory {
  static createNode(
    type: NodeType,
    position: { x: number; y: number },
    data?: Partial<NodeData>
  ): NodeObject {
    return createNode(type, position, data);
  }

  static createNodeFromTemplate(template: NodeTemplate): NodeObject {
    return this.createNode(template.type, { x: 0, y: 0 }, template.data);
  }

  static updateNode(node: NodeObject, updates: Partial<NodeObject>): NodeObject {
    return {
      ...node,
      ...updates,
      data: {
        ...node.data,
        ...(updates.data || {}),
      },
    };
  }
}
