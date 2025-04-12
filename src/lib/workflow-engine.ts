import { Node, Edge } from "reactflow"

export type NodeType = "input" | "collection" | "llm" | "output"

export interface NodeData {
  label: string
  model?: string
  collection?: string
  systemPrompt?: string
  temperature?: number
  maxResults?: number
}

export interface WorkflowNode extends Node {
  data: NodeData
}

export interface WorkflowEdge extends Edge {}

export interface Workflow {
  id: string
  name: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

export class WorkflowEngine {
  private workflow: Workflow
  private nodeResults: Map<string, any> = new Map()

  constructor(workflow: Workflow) {
    this.workflow = workflow
  }

  private getNodeById(id: string): WorkflowNode | undefined {
    return this.workflow.nodes.find((node) => node.id === id)
  }

  private getNodeInputs(nodeId: string): any[] {
    const node = this.getNodeById(nodeId)
    if (!node) return []

    const inputEdges = this.workflow.edges.filter((edge) => edge.target === nodeId)
    return inputEdges.map((edge) => this.nodeResults.get(edge.source))
  }

  private async executeInputNode(node: WorkflowNode): Promise<any> {
    // In a real implementation, this would get input from the user
    return { text: "Sample input text" }
  }

  private async executeCollectionNode(node: WorkflowNode): Promise<any> {
    const [input] = this.getNodeInputs(node.id)
    if (!input?.text) throw new Error("No input text provided")

    // In a real implementation, this would search the collection
    return {
      results: [
        { text: "Sample result 1", score: 0.9 },
        { text: "Sample result 2", score: 0.8 },
      ],
    }
  }

  private async executeLLMNode(node: WorkflowNode): Promise<any> {
    const [input] = this.getNodeInputs(node.id)
    if (!input?.results) throw new Error("No collection results provided")

    // In a real implementation, this would call the LLM API
    return {
      text: "Sample LLM response",
      model: node.data.model,
      temperature: node.data.temperature,
    }
  }

  private async executeOutputNode(node: WorkflowNode): Promise<any> {
    const [input] = this.getNodeInputs(node.id)
    if (!input?.text) throw new Error("No LLM response provided")

    return {
      output: input.text,
    }
  }

  private async executeNode(node: WorkflowNode): Promise<void> {
    let result: any

    switch (node.type) {
      case "input":
        result = await this.executeInputNode(node)
        break
      case "collection":
        result = await this.executeCollectionNode(node)
        break
      case "llm":
        result = await this.executeLLMNode(node)
        break
      case "output":
        result = await this.executeOutputNode(node)
        break
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }

    this.nodeResults.set(node.id, result)
  }

  private getExecutionOrder(): WorkflowNode[] {
    const visited = new Set<string>()
    const order: WorkflowNode[] = []

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return

      const node = this.getNodeById(nodeId)
      if (!node) return

      // Visit all input nodes first
      const inputEdges = this.workflow.edges.filter((edge) => edge.target === nodeId)
      for (const edge of inputEdges) {
        visit(edge.source)
      }

      visited.add(nodeId)
      order.push(node)
    }

    // Start with output nodes
    const outputNodes = this.workflow.nodes.filter((node) => node.type === "output")
    for (const node of outputNodes) {
      visit(node.id)
    }

    return order
  }

  public async execute(): Promise<Map<string, any>> {
    const executionOrder = this.getExecutionOrder()

    for (const node of executionOrder) {
      await this.executeNode(node)
    }

    return this.nodeResults
  }
} 