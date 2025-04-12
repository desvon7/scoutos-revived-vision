
import React from 'react';
import EmptyWorkflowCard from './EmptyWorkflowCard';
import WorkflowCard from './WorkflowCard';

interface WorkflowsTabProps {
  onCreateWorkflow: () => void;
}

const WorkflowsTab = ({ onCreateWorkflow }: WorkflowsTabProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EmptyWorkflowCard onClick={onCreateWorkflow} />
        
        <WorkflowCard 
          title="Knowledge Base Assistant"
          description="AI-powered workflow that searches your docs and provides accurate answers"
          icon="ganttChart"
          status="Active"
          createdDate="3 days ago"
          executions={23}
        />
        
        <WorkflowCard 
          title="Content Generator"
          description="Automatically create blog posts and content for your marketing campaigns"
          icon="database"
          status="Active"
          createdDate="5 days ago"
          executions={47}
        />
      </div>
    </div>
  );
};

export default WorkflowsTab;
