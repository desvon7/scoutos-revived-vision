import { Node, Edge } from "reactflow"

export interface WorkflowNodeData {
  label: string
  [key: string]: any
}

export interface WorkflowNode extends Node {
  data: WorkflowNodeData
}

export interface WorkflowEdgeData {
  [key: string]: any
}

export interface WorkflowEdge extends Edge {
  data?: WorkflowEdgeData
}

export interface Workflow {
  id: string
  name: string
  description?: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  createdAt: Date
  updatedAt: Date
}

export class WorkflowEngine {
  private workflow: Workflow

  constructor(workflow: Workflow) {
    this.workflow = workflow
  }

  private getNodeById(id: string): WorkflowNode | undefined {
    return this.workflow.nodes.find((node) => node.id === id)
  }

  private getNodeConnections(nodeId: string): {
    inputs: WorkflowEdge[]
    outputs: WorkflowEdge[]
  } {
    return {
      inputs: this.workflow.edges.filter((edge) => edge.target === nodeId),
      outputs: this.workflow.edges.filter((edge) => edge.source === nodeId),
    }
  }

  private async executeNode(node: WorkflowNode): Promise<any> {
    const { inputs } = this.getNodeConnections(node.id)

    // Get input values from connected nodes
    const inputValues = await Promise.all(
      inputs.map(async (edge) => {
        const sourceNode = this.getNodeById(edge.source)
        if (!sourceNode) {
          throw new Error(`Source node ${edge.source} not found`)
        }
        return this.executeNode(sourceNode)
      })
    )

    // Execute node based on type
    switch (node.type) {
      case "input":
        return node.data.value
      case "collection":
        return this.executeCollectionNode(node, inputValues)
      case "llm":
        return this.executeLLMNode(node, inputValues)
      case "output":
        return inputValues[0]
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  }

  private async executeCollectionNode(
    node: WorkflowNode,
    inputs: any[]
  ): Promise<any> {
    // Implementation for collection node
    return inputs
  }

  private async executeLLMNode(
    node: WorkflowNode,
    inputs: any[]
  ): Promise<any> {
    // Implementation for LLM node
    return inputs[0]
  }

  public async execute(): Promise<any> {
    // Find output nodes
    const outputNodes = this.workflow.nodes.filter(
      (node) => node.type === "output"
    )

    if (outputNodes.length === 0) {
      throw new Error("No output nodes found in workflow")
    }

    // Execute each output node
    const results = await Promise.all(
      outputNodes.map((node) => this.executeNode(node))
    )

    return results
  }
} 