import { v4 as uuidv4 } from 'uuid';
import { 
  NodeType, NodeCategory, DataType, 
  Node, Port, NodeData 
} from '../types/nodes';

// Node metadata interface to store configuration for each node type
export interface NodeTypeMetadata {
  type: NodeType;
  category: NodeCategory;
  label: string;
  description: string;
  icon: string;
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

// Registry class to store and manage node types
class NodeRegistry {
  private registry: Map<NodeType, NodeTypeMetadata> = new Map();

  // Register a node type with its metadata
  public registerNodeType(metadata: NodeTypeMetadata): void {
    this.registry.set(metadata.type, metadata);
  }

  // Get metadata for a specific node type
  public getNodeTypeMetadata(type: NodeType): NodeTypeMetadata | undefined {
    return this.registry.get(type);
  }

  // Get all registered node types
  public getAllNodeTypes(): NodeType[] {
    return Array.from(this.registry.keys());
  }

  // Get all node types for a specific category
  public getNodeTypesByCategory(category: NodeCategory): NodeType[] {
    return Array.from(this.registry.entries())
      .filter(([_, meta]) => meta.category === category)
      .map(([type, _]) => type);
  }

  // Create a new node of a specific type
  public createNode(type: NodeType, position: { x: number; y: number }): Node {
    const metadata = this.getNodeTypeMetadata(type);
    
    if (!metadata) {
      throw new Error(`Node type not registered: ${type}`);
    }

    // Create input ports
    const inputs: Port[] = metadata.inputs.map((input, index) => ({
      id: `input-${index}`,
      name: input.name,
      dataType: input.dataType,
      description: input.description,
      required: input.required,
      default: input.default
    }));

    // Create output ports
    const outputs: Port[] = metadata.outputs.map((output, index) => ({
      id: `output-${index}`,
      name: output.name,
      dataType: output.dataType,
      description: output.description
    }));

    // Create node data
    const nodeData: NodeData = {
      label: metadata.label,
      description: metadata.description,
      inputs,
      outputs,
      config: { ...metadata.defaultConfig },
      category: metadata.category,
      type: metadata.type,
      icon: metadata.icon,
      color: metadata.color
    };

    // Create and return the node
    return {
      id: uuidv4(),
      type,
      position,
      data: nodeData,
      selected: false,
      dragging: false
    };
  }

  // Initialize the registry with default node types
  public initialize(): void {
    // Register input nodes
    this.registerNodeType({
      type: NodeType.TEXT_INPUT,
      category: NodeCategory.INPUT,
      label: 'Text Input',
      description: 'Provides text input to the workflow',
      icon: 'TextIcon',
      color: '#4CAF50',
      defaultConfig: {
        placeholder: 'Enter text...',
        multiline: false,
        maxLength: 1000
      },
      inputs: [],
      outputs: [
        {
          name: 'text',
          dataType: DataType.STRING,
          description: 'The text input value'
        }
      ]
    });

    // Register LLM nodes
    this.registerNodeType({
      type: NodeType.GPT_4,
      category: NodeCategory.LLM,
      label: 'GPT-4',
      description: 'Generate text using OpenAI GPT-4 model',
      icon: 'BrainIcon',
      color: '#10A37F',
      defaultConfig: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        systemPrompt: 'You are a helpful assistant.'
      },
      inputs: [
        {
          name: 'prompt',
          dataType: DataType.STRING,
          description: 'The prompt to send to the model',
          required: true
        },
        {
          name: 'context',
          dataType: DataType.ARRAY,
          description: 'Additional context for the model',
          required: false
        }
      ],
      outputs: [
        {
          name: 'response',
          dataType: DataType.STRING,
          description: 'The generated response'
        },
        {
          name: 'usage',
          dataType: DataType.OBJECT,
          description: 'Token usage information'
        }
      ]
    });

    // Add more node type registrations here...
  }
}

// Create and initialize the registry
const nodeRegistry = new NodeRegistry();
nodeRegistry.initialize();

export default nodeRegistry; 