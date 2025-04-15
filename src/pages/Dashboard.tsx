import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import DashboardOnboarding from '@/components/dashboard/DashboardOnboarding';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import WorkflowsTab from '@/components/dashboard/WorkflowsTab';
import CollectionsTab from '@/components/dashboard/CollectionsTab';
import TemplatesTab from '@/components/dashboard/TemplatesTab';
import { useNewUserStatus } from '@/hooks/useNewUserStatus';

const Dashboard = () => {
  const { isNewUser } = useNewUserStatus();
  const [showOnboarding, setShowOnboarding] = useState(isNewUser);
  const [selectedTab, setSelectedTab] = useState('workflows');
  const navigate = useNavigate();
  
  const handleCreateWorkflow = () => {
    navigate('/workflow-builder');
  };

  const handleCreateTemplate = () => {
    navigate('/template-gallery');
  };
  
  const handleCreateCollection = () => {
    // This would navigate to a collection creation page in a real app
    console.log('Create collection');
  };
  
  if (showOnboarding) {
    return <DashboardOnboarding onSkip={() => setShowOnboarding(false)} />;
  }
  
  return (
    <DashboardLayout>
      <div className='container-custom py-8'>
        <DashboardHeader 
          title="Dashboard"
          onCreateTemplate={handleCreateTemplate}
          onCreateWorkflow={handleCreateWorkflow}
        />
        
        <DashboardTabs 
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
        />
        
        {selectedTab === 'workflows' && (
          <WorkflowsTab onCreateWorkflow={handleCreateWorkflow} />
        )}
        
        {selectedTab === 'collections' && (
          <CollectionsTab onCreateCollection={handleCreateCollection} />
        )}
        
        {selectedTab === 'templates' && (
          <TemplatesTab onUseTemplate={handleCreateTemplate} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
