
import { NodeObject, WorkflowData, WorkflowEdge } from '../types';
import { ExecutionContext, ExecutionOptions } from './types';
import { createNodeExecutor } from './nodeExecutors';

export class WorkflowExecutor {
  private nodes: Map<string, NodeObject>;
  private edges: WorkflowEdge[];
  
  constructor(workflow: WorkflowData) {
    this.nodes = new Map();
    workflow.nodes.forEach(node => {
      this.nodes.set(node.id, node);
    });
    
    this.edges = workflow.connections.map(conn => ({
      id: conn.id,
      source: conn.from,
      target: conn.to,
      sourceHandle: "",
      targetHandle: ""
    }));
  }
  
  async execute(input: any) {
    const inputNodes = Array.from(this.nodes.values()).filter(node => {
      return !this.edges.some(edge => edge.target === node.id);
    });
    
    if (inputNodes.length === 0) {
      throw new Error("No input nodes found in workflow");
    }
    
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
    
    const executor = createNodeExecutor(node);
    const result = await executor.execute(input);
    
    const outgoingEdges = this.edges.filter(edge => edge.source === nodeId);
    
    if (outgoingEdges.length === 0) {
      return result;
    }
    
    const childResults = await Promise.all(
      outgoingEdges.map(edge => this.executeNode(edge.target, result))
    );
    
    return childResults;
  }
}
