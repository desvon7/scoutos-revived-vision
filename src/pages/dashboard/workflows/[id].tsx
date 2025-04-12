
import { useRouter } from 'next/router'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { WorkflowEditorWrapper } from '@/components/workflow/WorkflowEditor'

export default function WorkflowPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <DashboardLayout>
      <div className="h-full">
        <WorkflowEditorWrapper workflowId={id as string} />
      </div>
    </DashboardLayout>
  )
}
