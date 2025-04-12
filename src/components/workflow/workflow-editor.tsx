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
} from "reactflow"
import "reactflow/dist/style.css"
import { nodeTemplates } from "./NodeTemplates"
import InputNode from "./nodes/InputNode"
import CollectionNode from "./nodes/CollectionNode"
import LLMNode from "./nodes/LLMNode"
import OutputNode from "./nodes/OutputNode"

const nodeTypes = {
  input: InputNode,
  collection: CollectionNode,
  llm: LLMNode,
  output: OutputNode,
}

interface NodeTemplate {
  type: string
  label: string
  icon: React.ReactNode
}

export function WorkflowEditor({ workflowId }: { workflowId: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { project } = useReactFlow()

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault()

    const type = event.dataTransfer.getData("application/reactflow")
    const template = nodeTemplates.find((t) => t.type === type)

    if (typeof type === "undefined" || !template) {
      return
    }

    const position = project({
      x: event.clientX,
      y: event.clientY,
    })

    const newNode = {
      id: `${type}-${nodes.length + 1}`,
      type,
      position,
      data: { label: template.label },
    }

    setNodes((nds) => nds.concat(newNode))
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="flex h-full">
        <div className="w-64 border-r bg-gray-50 p-4">
          <h3 className="mb-4 text-lg font-semibold">Node Types</h3>
          <div className="space-y-2">
            {nodeTemplates.map((template) => (
              <div
                key={template.type}
                className="flex cursor-move items-center rounded-lg border bg-white p-2 shadow-sm"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData(
                    "application/reactflow",
                    template.type
                  )
                }}
              >
                <span className="mr-2">{template.icon}</span>
                <span>{template.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
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
      </div>
    </div>
  )
}
