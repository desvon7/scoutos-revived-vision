import { Metadata } from "next"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import WorkflowEditor from "@/components/workflow/workflow-editor"

export const metadata: Metadata = {
  title: "Workflow Editor",
  description: "Edit your workflow",
}

interface WorkflowEditorPageProps {
  params: {
    id: string
  }
}

export default function WorkflowEditorPage({ params }: WorkflowEditorPageProps) {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="mb-6 text-3xl font-bold">Workflow Editor</h1>
        <WorkflowEditor workflowId={params.id} />
      </div>
    </DashboardLayout>
  )
} 