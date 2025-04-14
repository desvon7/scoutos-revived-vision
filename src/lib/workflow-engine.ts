
import { 
  NodeObject, 
  WorkflowData,
  ConnectionObject,
  WorkflowEdge
} from "@/components/workflow/types";

interface NodeExecution {
  execute: (input: any) => Promise<any>;
}

class InputNode implements NodeExecution {
  constructor(private node: NodeObject) {}
  
  async execute(input: any) {
    return input;
  }
}

class LLMNode implements NodeExecution {
  constructor(private node: NodeObject) {}
  
  async execute(input: any) {
    const model = this.node.data?.model || 'gpt-4';
    const temp = this.node.data?.temperature || 0.7;
    
    console.log(`Running LLM with model ${model} at temp ${temp}`);
    
    // Simulate a delay for processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return `Processed by ${model}: ${input}`;
  }
}

// Factory to create node executors
const createNodeExecutor = (node: NodeObject): NodeExecution => {
  switch (node.type) {
    case 'input':
      return new InputNode(node);
    case 'llm':
      return new LLMNode(node);
    default:
      return {
        execute: async (input: any) => {
          console.log(`Default execution for node type: ${node.type}`);
          return input;
        }
      };
  }
};

// Main workflow engine
export class WorkflowEngine {
  private nodes: Map<string, NodeObject>;
  private edges: WorkflowEdge[];
  
  constructor(workflow: WorkflowData) {
    this.nodes = new Map();
    workflow.nodes.forEach(node => {
      this.nodes.set(node.id, node);
    });
    
    // Convert connections to edges
    this.edges = workflow.connections.map(conn => ({
      id: conn.id,
      source: conn.from,
      target: conn.to,
      // Use empty string as default since the properties might not exist
      sourceHandle: "",
      targetHandle: ""
    }));
  }
  
  async execute(input: any) {
    // Find all input nodes (nodes with no incoming edges)
    const inputNodes = Array.from(this.nodes.values()).filter(node => {
      return !this.edges.some(edge => edge.target === node.id);
    });
    
    if (inputNodes.length === 0) {
      throw new Error("No input nodes found in workflow");
    }
    
    // Execute the workflow starting from each input node
    const results = await Promise.all(
      inputNodes.map(inputNode => this.executeNode(inputNode.id, input))
    );
    
    return results;
  }
  
  private async executeNode(nodeId: string, input: any): Promise<any> {
    const node = this.nodes.get(nodeId);
    if (!node) {
      throw new Error(`Node not found: ${nodeId}`);
    }
    
    // Execute this node
    const executor = createNodeExecutor(node);
    const result = await executor.execute(input);
    
    // Find all outgoing edges
    const outgoingEdges = this.edges.filter(edge => edge.source === nodeId);
    
    if (outgoingEdges.length === 0) {
      // This is an output node
      return result;
    }
    
    // Execute all child nodes and return their results
    const childResults = await Promise.all(
      outgoingEdges.map(edge => this.executeNode(edge.target, result))
    );
    
    return childResults;
  }
}
