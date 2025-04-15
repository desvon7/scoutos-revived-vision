
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
    
    this.edges = workflow.edges || workflow.connections.map(conn => ({
      id: conn.id,
      source: conn.from,
      target: conn.to,
      sourceHandle: conn.fromPort,
      targetHandle: conn.toPort
    }));
  }
  
  async execute(input: any, options?: ExecutionOptions) {
    const inputNodes = Array.from(this.nodes.values()).filter(node => {
      return !this.edges.some(edge => edge.target === node.id);
    });
    
    if (inputNodes.length === 0) {
      throw new Error("No input nodes found in workflow");
    }
    
    const context: ExecutionContext = {
      nodeStates: new Map(),
      variables: new Map(),
      outputs: new Map(),
      logs: []
    };
    
    // Initialize variables from options
    if (options?.variables) {
      Object.entries(options.variables).forEach(([key, value]) => {
        context.variables.set(key, value);
      });
    }
    
    const results = await Promise.all(
      inputNodes.map(inputNode => this.executeNode(inputNode.id, input, context, options))
    );
    
    return results;
  }
  
  private async executeNode(
    nodeId: string, 
    input: any, 
    context: ExecutionContext,
    options?: ExecutionOptions
  ): Promise<any> {
    const node = this.nodes.get(nodeId);
    if (!node) {
      throw new Error(`Node not found: ${nodeId}`);
    }
    
    // Call onNodeStart callback if provided
    options?.onNodeStart?.(nodeId);
    
    try {
      const executor = createNodeExecutor(node);
      const result = await executor.execute(input);
      
      // Store result in context
      context.outputs.set(nodeId, result);
      context.nodeStates.set(nodeId, { status: 'completed', result });
      
      // Call onNodeComplete callback if provided
      options?.onNodeComplete?.(nodeId, result);
      
      const outgoingEdges = this.edges.filter(edge => edge.source === nodeId);
      
      if (outgoingEdges.length === 0) {
        return result;
      }
      
      const childResults = await Promise.all(
        outgoingEdges.map(edge => this.executeNode(edge.target, result, context, options))
      );
      
      return childResults;
    } catch (error) {
      // Store error in context
      context.nodeStates.set(nodeId, { status: 'error', error });
      
      // Call onNodeError callback if provided
      options?.onNodeError?.(nodeId, error as Error);
      
      // Re-throw the error to propagate it
      throw error;
    }
  }
}
