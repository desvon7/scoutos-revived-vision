
import { NodeType, NodeCategory, Node } from '../types';
import { NodeTypeMetadata, NodeRegistryInterface } from './types';
import { inputNodes } from './inputNodes';
import { llmNodes } from './llmNodes';
import { v4 as uuidv4 } from 'uuid';

class NodeRegistry implements NodeRegistryInterface {
  private registry: Map<NodeType, NodeTypeMetadata> = new Map();

  constructor() {
    this.initialize();
  }

  public registerNodeType(metadata: NodeTypeMetadata): void {
    this.registry.set(metadata.type, metadata);
  }

  public getNodeTypeMetadata(type: NodeType): NodeTypeMetadata | undefined {
    return this.registry.get(type);
  }

  public getAllNodeTypes(): NodeType[] {
    return Array.from(this.registry.keys());
  }

  public getNodeTypesByCategory(category: NodeCategory): NodeType[] {
    return Array.from(this.registry.entries())
      .filter(([_, meta]) => meta.category === category)
      .map(([type, _]) => type);
  }

  public createNode(type: NodeType, position: { x: number; y: number }): Node {
    const metadata = this.getNodeTypeMetadata(type);
    if (!metadata) {
      throw new Error(`Node type not registered: ${type}`);
    }

    return {
      type,
      position,
      data: {
        label: metadata.label,
        description: metadata.description,
        inputs: metadata.inputs,
        outputs: metadata.outputs,
        config: { ...metadata.defaultConfig },
        category: metadata.category,
        type: metadata.type
      },
      id: uuidv4()
    };
  }

  private initialize(): void {
    inputNodes.forEach(node => this.registerNodeType(node));
    llmNodes.forEach(node => this.registerNodeType(node));
  }
}

const nodeRegistry = new NodeRegistry();
export default nodeRegistry;
