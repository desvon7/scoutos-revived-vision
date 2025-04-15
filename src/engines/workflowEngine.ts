import { v4 as uuidv4 } from 'uuid';
import {
  Workflow,
  Node,
  Connection,
  NodeType,
  ExecutionState,
  NodeExecutionState,
  DataType,
} from '../types/nodes';
import typeValidator from '../validators/typeValidator';
import nodeRegistry from '../registry/nodeRegistry';

// Define the execution context that tracks workflow state
export interface ExecutionContext {
  executionId: string;
  workflowId: string;
  state: ExecutionState;
  startTime: Date;
  endTime?: Date;
  nodeStates: Map<string, NodeExecutionState>;
  outputs: Map<string, any>;
  variables: Map<string, any>;
  logs: Array<{
    timestamp: Date;
    level: 'info' | 'debug' | 'warn' | 'error';
    message: string;
    nodeId?: string;
  }>;
}

// Define execution options
export interface ExecutionOptions {
  timeout?: number;
  variables?: Record<string, any>;
  onNodeStart?: (nodeId: string) => void;
  onNodeComplete?: (nodeId: string, output: any) => void;
  onNodeError?: (nodeId: string, error: Error) => void;
  onExecutionComplete?: (context: ExecutionContext) => void;
  onExecutionError?: (error: Error, context: ExecutionContext) => void;
  onLog?: (level: 'info' | 'debug' | 'warn' | 'error', message: string, nodeId?: string) => void;
}

// Define node handler interface
type NodeHandler = (
  node: Node,
  inputs: Record<string, any>,
  context: ExecutionContext
) => Promise<any>;

class WorkflowEngine {
  private nodeHandlers: Map<NodeType, NodeHandler> = new Map();
  private executionContexts: Map<string, ExecutionContext> = new Map();
  private executionTimeouts: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    this.registerDefaultNodeHandlers();
  }

  // Register default handlers for node types
  private registerDefaultNodeHandlers(): void {
    // Input handlers
    this.registerNodeHandler(NodeType.TEXT_INPUT, this.handleTextInput);
    this.registerNodeHandler(NodeType.GPT_4, this.handleLLM);
    this.registerNodeHandler(NodeType.JAVASCRIPT, this.handleJavaScript);
  }

  // Register a custom handler for a node type
  public registerNodeHandler(type: NodeType, handler: NodeHandler): void {
    this.nodeHandlers.set(type, handler);
  }

  // Execute a workflow
  public async executeWorkflow(
    workflow: Workflow,
    options: ExecutionOptions = {}
  ): Promise<ExecutionContext> {
    // Create a new execution context
    const executionId = uuidv4();
    const context: ExecutionContext = {
      executionId,
      workflowId: workflow.id,
      state: ExecutionState.RUNNING,
      startTime: new Date(),
      nodeStates: new Map(),
      outputs: new Map(),
      variables: new Map(),
      logs: [],
    };

    // Initialize variables
    if (options.variables) {
      Object.entries(options.variables).forEach(([key, value]) => {
        context.variables.set(key, value);
      });
    }

    // Store the execution context
    this.executionContexts.set(executionId, context);

    // Set timeout if specified
    if (options.timeout) {
      this.executionTimeouts.set(
        executionId,
        setTimeout(() => {
          this.stopExecution(executionId, new Error('Execution timeout'));
        }, options.timeout)
      );
    }

    try {
      // Find entry nodes (nodes with no incoming connections)
      const entryNodes = this.findEntryNodes(workflow);

      if (entryNodes.length === 0) {
        throw new Error('No entry nodes found in workflow');
      }

      // Log workflow start
      this.log(context, 'info', `Starting workflow execution: ${workflow.name}`);

      // Execute all entry nodes in parallel
      await Promise.all(
        entryNodes.map((node) => this.executeNode(node, workflow, context, options))
      );

      // Mark execution as completed
      context.state = ExecutionState.COMPLETED;
      context.endTime = new Date();

      // Log workflow completion
      this.log(context, 'info', 'Workflow execution completed successfully');

      // Clear timeout
      if (this.executionTimeouts.has(executionId)) {
        clearTimeout(this.executionTimeouts.get(executionId)!);
        this.executionTimeouts.delete(executionId);
      }

      // Call completion callback
      if (options.onExecutionComplete) {
        options.onExecutionComplete(context);
      }

      return context;
    } catch (error: unknown) {
      // Mark execution as failed
      context.state = ExecutionState.ERROR;
      context.endTime = new Date();

      // Log error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(context, 'error', `Workflow execution failed: ${errorMessage}`);

      // Clear timeout
      if (this.executionTimeouts.has(executionId)) {
        clearTimeout(this.executionTimeouts.get(executionId)!);
        this.executionTimeouts.delete(executionId);
      }

      // Call error callback
      if (options.onExecutionError) {
        options.onExecutionError(error instanceof Error ? error : new Error(errorMessage), context);
      }

      throw error;
    }
  }

  // Execute a single node
  private async executeNode(
    node: Node,
    workflow: Workflow,
    context: ExecutionContext,
    options: ExecutionOptions
  ): Promise<any> {
    // Check if node already executed
    if (context.nodeStates.has(node.id)) {
      const state = context.nodeStates.get(node.id)!;

      if (state.state === ExecutionState.COMPLETED) {
        return context.outputs.get(node.id);
      }

      if (state.state === ExecutionState.ERROR) {
        throw new Error(`Node execution failed: ${state.error}`);
      }
    }

    // Mark node as running
    context.nodeStates.set(node.id, {
      nodeId: node.id,
      state: ExecutionState.RUNNING,
      startTime: new Date(),
    });

    // Call node start callback
    if (options.onNodeStart) {
      options.onNodeStart(node.id);
    }

    // Log node start
    this.log(context, 'info', `Executing node: ${node.data.label}`, node.id);

    try {
      // Get node inputs
      const inputs = await this.getNodeInputs(node, workflow, context);

      // Get handler for node type
      const handler = this.nodeHandlers.get(node.type);
      if (!handler) {
        throw new Error(`No handler registered for node type: ${node.type}`);
      }

      // Execute node
      const output = await handler.call(this, node, inputs, context);

      // Store output
      context.outputs.set(node.id, output);

      // Mark node as completed
      context.nodeStates.set(node.id, {
        nodeId: node.id,
        state: ExecutionState.COMPLETED,
        startTime: context.nodeStates.get(node.id)!.startTime,
        endTime: new Date(),
        result: output,
      });

      // Log node completion
      this.log(context, 'info', `Node completed: ${node.data.label}`, node.id);

      // Call node complete callback
      if (options.onNodeComplete) {
        options.onNodeComplete(node.id, output);
      }

      // Process downstream nodes
      await this.processDownstreamNodes(node, workflow, context, options);

      return output;
    } catch (error: unknown) {
      // Mark node as failed
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      context.nodeStates.set(node.id, {
        nodeId: node.id,
        state: ExecutionState.ERROR,
        startTime: context.nodeStates.get(node.id)!.startTime,
        endTime: new Date(),
        error: errorMessage,
      });

      // Log error
      this.log(context, 'error', `Node error: ${errorMessage}`, node.id);

      // Call node error callback
      if (options.onNodeError) {
        options.onNodeError(node.id, error instanceof Error ? error : new Error(errorMessage));
      }

      throw error;
    }
  }

  // Process nodes that depend on the current node
  private async processDownstreamNodes(
    node: Node,
    workflow: Workflow,
    context: ExecutionContext,
    options: ExecutionOptions
  ): Promise<void> {
    // Find outgoing connections
    const outgoingConnections = workflow.edges.filter((conn) => conn.source === node.id);

    // Group connections by target node
    const targetNodeIds = new Set<string>();
    outgoingConnections.forEach((conn) => targetNodeIds.add(conn.target));

    // Process each target node
    const targetNodeIdsArray = Array.from(targetNodeIds);
    for (const targetNodeId of targetNodeIdsArray) {
      const targetNode = workflow.nodes.find((n) => n.id === targetNodeId);
      if (!targetNode) continue;

      // Check if all inputs are ready
      const incomingConnections = workflow.edges.filter((conn) => conn.target === targetNodeId);

      const allInputsReady = incomingConnections.every((conn) => {
        const sourceNodeState = context.nodeStates.get(conn.source);
        return sourceNodeState && sourceNodeState.state === ExecutionState.COMPLETED;
      });

      if (allInputsReady) {
        await this.executeNode(targetNode, workflow, context, options);
      }
    }
  }

  // Find entry nodes (nodes with no incoming connections)
  private findEntryNodes(workflow: Workflow): Node[] {
    // Get all target node IDs from connections
    const targetNodeIds = new Set<string>();
    workflow.edges.forEach((conn) => targetNodeIds.add(conn.target));

    // Find nodes that are not targets of any connection
    return workflow.nodes.filter((node) => !targetNodeIds.has(node.id));
  }

  // Get inputs for a node from its incoming connections
  private async getNodeInputs(
    node: Node,
    workflow: Workflow,
    context: ExecutionContext
  ): Promise<Record<string, any>> {
    const inputs: Record<string, any> = {};

    // Find incoming connections
    const incomingConnections = workflow.edges.filter((conn) => conn.target === node.id);

    // Process each connection
    for (const connection of incomingConnections) {
      // Get source node
      const sourceNode = workflow.nodes.find((n) => n.id === connection.source);
      if (!sourceNode) {
        throw new Error(`Source node not found: ${connection.source}`);
      }

      // Get source output
      const sourceOutput = context.outputs.get(sourceNode.id);

      // Get target input port
      const targetPort = node.data.inputs.find((p) => p.id === connection.targetHandle);
      if (!targetPort) {
        throw new Error(`Target port not found: ${connection.targetHandle}`);
      }

      // Get source output port
      const sourcePort = sourceNode.data.outputs.find((p) => p.id === connection.sourceHandle);
      if (!sourcePort) {
        throw new Error(`Source port not found: ${connection.sourceHandle}`);
      }

      // Check if type conversion is needed
      if (
        sourcePort.dataType !== targetPort.dataType &&
        sourcePort.dataType !== DataType.ANY &&
        targetPort.dataType !== DataType.ANY
      ) {
        const converter = typeValidator.getTypeConverter(sourcePort.dataType, targetPort.dataType);
        if (converter) {
          inputs[targetPort.name] = converter(sourceOutput);
        } else {
          throw new Error(`Cannot convert ${sourcePort.dataType} to ${targetPort.dataType}`);
        }
      } else {
        inputs[targetPort.name] = sourceOutput;
      }
    }

    // Add default values for inputs with no connections
    for (const input of node.data.inputs) {
      if (inputs[input.name] === undefined && input.default !== undefined) {
        inputs[input.name] = input.default;
      }
    }

    return inputs;
  }

  // Stop an execution
  public stopExecution(executionId: string, error?: Error): void {
    const context = this.executionContexts.get(executionId);
    if (!context) return;

    // Update context state
    context.state = error ? ExecutionState.ERROR : ExecutionState.COMPLETED;
    context.endTime = new Date();

    // Log execution stop
    if (error) {
      this.log(context, 'error', `Execution stopped with error: ${error.message}`);
    } else {
      this.log(context, 'info', 'Execution stopped by user');
    }

    // Clear timeout
    if (this.executionTimeouts.has(executionId)) {
      clearTimeout(this.executionTimeouts.get(executionId)!);
      this.executionTimeouts.delete(executionId);
    }
  }

  // Add a log entry to the execution context
  private log(
    context: ExecutionContext,
    level: 'info' | 'debug' | 'warn' | 'error',
    message: string,
    nodeId?: string
  ): void {
    context.logs.push({
      timestamp: new Date(),
      level,
      message,
      nodeId,
    });
  }

  // Node handlers

  private async handleTextInput(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<string> {
    return node.data.config.value || '';
  }

  private async handleLLM(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<string> {
    // This is a placeholder - in a real implementation, this would call the LLM API
    const prompt = inputs.prompt || '';
    const model = node.data.config.model || 'unknown';
    const systemPrompt = node.data.config.systemPrompt || '';

    this.log(context, 'debug', `Calling LLM API: ${model}`, node.id);
    this.log(context, 'debug', `System prompt: ${systemPrompt}`, node.id);
    this.log(context, 'debug', `User prompt: ${prompt}`, node.id);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return `This is a simulated response from the ${model} model for the prompt: "${prompt.substring(0, 30)}..."`;
  }

  private async handleJavaScript(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ): Promise<any> {
    try {
      const code = node.data.config.code || '';

      // Create a safe execution context
      const sandboxContext = {
        inputs,
        console: {
          log: (message: string) => this.log(context, 'info', message, node.id),
          error: (message: string) => this.log(context, 'error', message, node.id),
          warn: (message: string) => this.log(context, 'warn', message, node.id),
          debug: (message: string) => this.log(context, 'debug', message, node.id),
        },
      };

      // Create and execute function
      const fn = new Function('inputs', 'console', `${code}\nreturn process(inputs);`);

      return fn(inputs, sandboxContext.console);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`JavaScript execution error: ${errorMessage}`);
    }
  }
}

export default new WorkflowEngine();
