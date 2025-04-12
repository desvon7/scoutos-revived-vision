
import React from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WorkflowEditorWrapper } from '@/components/workflow/WorkflowEditor';

const WorkflowBuilderPage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <DashboardLayout>
      <div className="h-full">
        <WorkflowEditorWrapper workflowId={id} />
      </div>
    </DashboardLayout>
  );
};

export default WorkflowBuilderPage;
