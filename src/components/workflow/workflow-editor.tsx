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
} from "reactflow"
import "reactflow/dist/style.css"
import { NodeTemplates } from "./NodeTemplates"
import { InputNode } from "./nodes/InputNode"
import { CollectionNode } from "./nodes/CollectionNode"
import { LLMNode } from "./nodes/LLMNode"
import { OutputNode } from "./nodes/OutputNode"

const nodeTypes = {
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

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
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
      if (!type) return

      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      }

      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type} node` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [nodes, setNodes]
  )

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="flex h-full">
        <div className="w-64 border-r p-4">
          <h3 className="mb-4 text-lg font-semibold">Node Types</h3>
          <div className="space-y-2">
            {NodeTemplates.map((template) => (
              <div
                key={template.type}
                className="flex cursor-move items-center rounded-lg border p-2 hover:bg-gray-50"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData(
                    "application/reactflow",
                    template.type
                  )
                }}
              >
                <template.icon className="mr-2 h-5 w-5" />
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