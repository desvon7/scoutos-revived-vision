import { useCallback, useState } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  NodeTypes,
} from "reactflow"
import "reactflow/dist/style.css"
import { NodeTemplate, nodeTemplates } from "./NodeTemplates"
import { NodePanel } from "./NodePanel"
import { InputNode } from "./nodes/InputNode"
import { CollectionNode } from "./nodes/CollectionNode"
import { LLMNode } from "./nodes/LLMNode"
import { OutputNode } from "./nodes/OutputNode"

const nodeTypes: NodeTypes = {
  input: InputNode,
  collection: CollectionNode,
  llm: LLMNode,
  output: OutputNode,
}

interface WorkflowEditorProps {
  workflowId: string
}

export function WorkflowEditor({ workflowId }: WorkflowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { project } = useReactFlow()
  const [showNodePanel, setShowNodePanel] = useState(false)

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow")
      const template = nodeTemplates.find((t) => t.type === type)
      if (!template) return

      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      }

      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: template.name },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [nodes, setNodes]
  )

  const handleSelectNode = (template: NodeTemplate) => {
    const newNode: Node = {
      id: `${template.type}-${nodes.length + 1}`,
      type: template.type,
      position: { x: 100, y: 100 },
      data: { label: template.name },
    }

    setNodes((nds) => nds.concat(newNode))
    setShowNodePanel(false)
  }

  return (
    <div className="h-full w-full">
      <div className="absolute right-4 top-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setShowNodePanel(true)}
        >
          Add Node
        </button>
      </div>
      {showNodePanel && (
        <NodePanel
          templates={nodeTemplates}
          onClose={() => setShowNodePanel(false)}
          onSelectNode={handleSelectNode}
        />
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
