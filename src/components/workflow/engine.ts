
import { NodeObject, ConnectionObject, WorkflowData } from './types';
import { ConnectionValidator } from './validation';

export class WorkflowEngine {
  private nodes: NodeObject[];
  private connections: ConnectionObject[];
  private executionState: Map<string, any>;
  private executionOrder: string[];

  constructor(workflow: WorkflowData) {
    this.nodes = workflow.nodes;
    this.connections = workflow.connections;
    this.executionState = new Map();
    this.executionOrder = [];
  }

  public async execute(): Promise<Map<string, any>> {
    // Validate workflow before execution
    const validation = ConnectionValidator.validateWorkflow(this.nodes, this.connections);
    if (!validation.isValid) {
      throw new Error(`Invalid workflow: ${validation.errors.join(', ')}`);
    }

    // Determine execution order
    this.executionOrder = this.calculateExecutionOrder();

    // Execute nodes in order
    for (const nodeId of this.executionOrder) {
      const node = this.nodes.find(n => n.id === nodeId);
      if (!node) continue;

      try {
        await this.executeNode(node);
      } catch (error) {
        console.error(`Error executing node ${node.title}:`, error);
        throw error;
      }
    }

    return this.executionState;
  }

  private async executeNode(node: NodeObject): Promise<void> {
    // Get input values from connected nodes
    const inputs = await this.getNodeInputs(node);

    // Execute node-specific logic
    const outputs = await this.processNode(node, inputs);

    // Store outputs in execution state
    this.executionState.set(node.id, outputs);
  }

  private async getNodeInputs(node: NodeObject): Promise<Record<string, any>> {
    const inputs: Record<string, any> = {};

    // Find all incoming connections
    const incomingConnections = this.connections.filter(conn => conn.to === node.id);

    for (const conn of incomingConnections) {
      const sourceNode = this.nodes.find(n => n.id === conn.from);
      if (!sourceNode) continue;

      const sourceOutputs = this.executionState.get(sourceNode.id);
      if (!sourceOutputs) continue;

      inputs[conn.toPort] = sourceOutputs[conn.fromPort];
    }

    return inputs;
  }

  private async processNode(node: NodeObject, inputs: Record<string, any>): Promise<Record<string, any>> {
    // This is a placeholder for node-specific processing logic
    // In a real implementation, this would dispatch to appropriate handlers
    // based on node type and configuration

    switch (node.data.type) {
      case 'llm':
        return await this.processLLMNode(node, inputs);
      case 'input':
        return await this.processInputNode(node, inputs);
      case 'output':
        return await this.processOutputNode(node, inputs);
      // Add more cases for other node types
      default:
        throw new Error(`Unsupported node type: ${node.data.type}`);
    }
  }

  private async processLLMNode(node: NodeObject, inputs: Record<string, any>): Promise<Record<string, any>> {
    // Placeholder for LLM processing logic
    // In a real implementation, this would call the appropriate LLM API
    const model = node.data.config?.model || 'default-model';
    const temperature = node.data.config?.temperature || 0.7;
    const maxTokens = node.data.config?.maxTokens || 1000;
    const prompt = inputs.prompt || '';

    // Simulate LLM response
    return {
      response: `Simulated response from ${model} with temperature ${temperature}`,
    };
  }

  private async processInputNode(node: NodeObject, inputs: Record<string, any>): Promise<Record<string, any>> {
    // Placeholder for input processing logic
    return {
      value: node.data.config?.defaultValue || '',
    };
  }

  private async processOutputNode(node: NodeObject, inputs: Record<string, any>): Promise<Record<string, any>> {
    // Placeholder for output processing logic
    return {
      value: inputs.value || '',
    };
  }

  private calculateExecutionOrder(): string[] {
    const graph = new Map<string, string[]>();
    const inDegree = new Map<string, number>();
    const order: string[] = [];

    // Initialize graph and in-degree
    this.nodes.forEach(node => {
      graph.set(node.id, []);
      inDegree.set(node.id, 0);
    });

    // Build graph and calculate in-degree
    this.connections.forEach(conn => {
      const fromNodeList = graph.get(conn.from);
      if (fromNodeList) {
        fromNodeList.push(conn.to);
      }
      inDegree.set(conn.to, (inDegree.get(conn.to) || 0) + 1);
    });

    // Find nodes with no incoming edges
    const queue: string[] = [];
    this.nodes.forEach(node => {
      if (inDegree.get(node.id) === 0) {
        queue.push(node.id);
      }
    });

    // Perform topological sort
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      order.push(nodeId);

      const neighbors = graph.get(nodeId) || [];
      for (const neighbor of neighbors) {
        inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    // Check for cycles
    if (order.length !== this.nodes.length) {
      throw new Error('Workflow contains cycles');
    }

    return order;
  }
}
