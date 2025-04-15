import { v4 as uuidv4 } from 'uuid';
import {
  Workflow,
  Node,
  Connection,
  NodeType,
  ExecutionState,
  NodeExecutionState,
  ExecutionContext,
} from '../types/nodes';
import nodeRegistry from '../registry/nodeRegistry';
import connectionValidator from '../validators/connectionValidator';

export class WorkflowExecutionEngine {
  private executionContexts: Map<string, ExecutionContext> = new Map();
  private nodeHandlers: Map<NodeType, Function> = new Map();

  constructor() {
    this.registerDefaultNodeHandlers();
  }

  private registerDefaultNodeHandlers() {
    this.registerHandler(NodeType.TEXT_INPUT, this.handleTextInput);
    this.registerHandler(NodeType.GPT_4, this.handleLLM);
    this.registerHandler(NodeType.JAVASCRIPT, this.handleJavaScript);
  }

  public registerHandler(type: NodeType, handler: Function) {
    this.nodeHandlers.set(type, handler);
  }

  public async executeWorkflow(workflow: Workflow): Promise<ExecutionContext> {
    const validationResult = connectionValidator.validateWorkflow(workflow);
    if (!validationResult.valid) {
      throw new Error(`Invalid workflow: ${validationResult.errors.join(', ')}`);
    }

    const executionId = uuidv4();
    const context: ExecutionContext = {
      id: executionId,
      workflowId: workflow.id,
      state: ExecutionState.RUNNING,
      startTime: new Date(),
      nodeStates: new Map(),
      outputs: new Map(),
      variables: new Map(),
      logs: [],
    };

    this.executionContexts.set(executionId, context);

    try {
      const entryNodes = this.findEntryNodes(workflow);

      if (entryNodes.length === 0) {
        throw new Error('No entry nodes found in workflow');
      }

      for (const node of entryNodes) {
        await this.executeNode(node, workflow, context);
      }

      context.state = ExecutionState.COMPLETED;
      context.endTime = new Date();

      return context;
    } catch (error) {
      context.state = ExecutionState.ERROR;
      context.endTime = new Date();
      context.error = error.message;

      this.logError(context, error.message);

      throw error;
    }
  }

  private async executeNode(
    node: Node,
    workflow: Workflow,
    context: ExecutionContext
  ): Promise<any> {
    if (context.nodeStates.has(node.id)) {
      const state = context.nodeStates.get(node.id);
      if (state.state === ExecutionState.COMPLETED) {
        return context.outputs.get(node.id);
      }

      if (state.state === ExecutionState.ERROR) {
        throw new Error(`Node ${node.id} failed: ${state.error}`);
      }
    }

    context.nodeStates.set(node.id, {
      nodeId: node.id,
      state: ExecutionState.RUNNING,
      startTime: new Date(),
    });

    try {
      const inputs = await this.getNodeInputs(node, workflow, context);
      const handler = this.nodeHandlers.get(node.type);

      if (!handler) {
        throw new Error(`No handler registered for node type: ${node.type}`);
      }

      const output = await handler(node, inputs, context);
      context.outputs.set(node.id, output);

      context.nodeStates.set(node.id, {
        nodeId: node.id,
        state: ExecutionState.COMPLETED,
        startTime: context.nodeStates.get(node.id).startTime,
        endTime: new Date(),
        result: output,
      });

      const outgoingConnections = this.findOutgoingConnections(node.id, workflow);

      for (const connection of outgoingConnections) {
        const targetNode = workflow.nodes.find((n) => n.id === connection.target);
        if (targetNode) {
          const incomingConnections = this.findIncomingConnections(targetNode.id, workflow);
          const allInputsReady = incomingConnections.every((conn) => {
            const sourceNodeState = context.nodeStates.get(conn.source);
            return sourceNodeState && sourceNodeState.state === ExecutionState.COMPLETED;
          });

          if (allInputsReady) {
            await this.executeNode(targetNode, workflow, context);
          }
        }
      }

      return output;
    } catch (error) {
      context.nodeStates.set(node.id, {
        nodeId: node.id,
        state: ExecutionState.ERROR,
        startTime: context.nodeStates.get(node.id).startTime,
        endTime: new Date(),
        error: error.message,
      });

      this.logError(context, `Error executing node ${node.id}: ${error.message}`, node.id);

      throw error;
    }
  }

  private findEntryNodes(workflow: Workflow): Node[] {
    return workflow.nodes.filter((node) => {
      return !workflow.edges.some((conn) => conn.target === node.id);
    });
  }

  private findOutgoingConnections(nodeId: string, workflow: Workflow): Connection[] {
    return workflow.edges.filter((conn) => conn.source === nodeId);
  }

  private findIncomingConnections(nodeId: string, workflow: Workflow): Connection[] {
    return workflow.edges.filter((conn) => conn.target === nodeId);
  }

  private async getNodeInputs(
    node: Node,
    workflow: Workflow,
    context: ExecutionContext
  ): Promise<Record<string, any>> {
    const inputs: Record<string, any> = {};
    const incomingConnections = this.findIncomingConnections(node.id, workflow);

    for (const connection of incomingConnections) {
      const sourceNode = workflow.nodes.find((n) => n.id === connection.source);
      if (!sourceNode) {
        throw new Error(`Source node not found: ${connection.source}`);
      }

      const sourceOutput = context.outputs.get(sourceNode.id);
      if (sourceOutput === undefined) {
        throw new Error(`No output available for node: ${sourceNode.id}`);
      }

      const inputPort = node.data.inputs.find((p) => p.id === connection.targetHandle);
      if (!inputPort) {
        throw new Error(`Input port not found: ${connection.targetHandle}`);
      }

      inputs[inputPort.name] = sourceOutput;
    }

    for (const input of node.data.inputs) {
      if (inputs[input.name] === undefined && input.default !== undefined) {
        inputs[input.name] = input.default;
      }
    }

    return inputs;
  }

  private logInfo(context: ExecutionContext, message: string, nodeId?: string) {
    context.logs.push({
      timestamp: new Date(),
      level: 'info',
      message,
      nodeId,
    });
  }

  private logError(context: ExecutionContext, message: string, nodeId?: string) {
    context.logs.push({
      timestamp: new Date(),
      level: 'error',
      message,
      nodeId,
    });
  }

  private async handleTextInput(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ) {
    return node.data.config.value || '';
  }

  private async handleLLM(node: Node, inputs: Record<string, any>, context: ExecutionContext) {
    return `This is a response from the ${node.data.config.model || 'GPT-4'} model.`;
  }

  private async handleJavaScript(
    node: Node,
    inputs: Record<string, any>,
    context: ExecutionContext
  ) {
    try {
      const code = node.data.config.code || '';
      const processFunction = new Function('input', 'context', code);
      return processFunction(inputs, {
        log: (message: string) => this.logInfo(context, message, node.id),
      });
    } catch (error) {
      throw new Error(`JavaScript execution error: ${error.message}`);
    }
  }
}

export default new WorkflowExecutionEngine();
