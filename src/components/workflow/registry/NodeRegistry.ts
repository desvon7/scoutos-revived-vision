
import { NodeType, NodeCategory } from '../types';
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
      id: uuidv4(),
      type,
      position,
      data: {
        label: metadata.label,
        description: metadata.description,
        inputs: metadata.inputs,
        outputs: metadata.outputs,
        config: { ...metadata.defaultConfig },
        type: metadata.type,
        category: metadata.category
      }
    };
  }

  private initialize(): void {
    // Register input nodes
    inputNodes.forEach(node => this.registerNodeType(node));
    
    // Register LLM nodes
    llmNodes.forEach(node => this.registerNodeType(node));
  }
}

// Create and export singleton instance
const nodeRegistry = new NodeRegistry();
export default nodeRegistry;
