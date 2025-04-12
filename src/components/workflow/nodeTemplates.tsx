
import React from "react"
import { Database, MessageSquare, FileInput, FileOutput } from "lucide-react"

export interface NodeTemplate {
  type: string
  name: string
  icon: React.ReactNode
  description?: string
}

export const nodeTemplates: NodeTemplate[] = [
  {
    type: "input",
    name: "Input",
    icon: <FileInput className="h-4 w-4" />,
    description: "Starting point for your workflow"
  },
  {
    type: "collection",
    name: "Collection",
    icon: <Database className="h-4 w-4" />,
    description: "Access data from your collections"
  },
  {
    type: "llm",
    name: "LLM",
    icon: <MessageSquare className="h-4 w-4" />,
    description: "Process with language model"
  },
  {
    type: "output",
    name: "Output",
    icon: <FileOutput className="h-4 w-4" />,
    description: "Final result"
  }
]
