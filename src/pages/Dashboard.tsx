
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardOnboarding from '@/components/dashboard/DashboardOnboarding';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import WorkflowsTab from '@/components/dashboard/WorkflowsTab';
import CollectionsTab from '@/components/dashboard/CollectionsTab';
import TemplatesTab from '@/components/dashboard/TemplatesTab';

const Dashboard = () => {
  // For demo purposes, we'll show the onboarding flow
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedTab, setSelectedTab] = useState('workflows');
  const navigate = useNavigate();
  
  const handleCreateWorkflow = () => {
    navigate('/workflow-builder');
  };

  const handleCreateTemplate = () => {
    navigate('/template-builder');
  };
  
  const handleCreateCollection = () => {
    // This would navigate to a collection creation page in a real app
    console.log("Create collection");
  };
  
  if (showOnboarding) {
    return <DashboardOnboarding onSkip={() => setShowOnboarding(false)} />;
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container-custom py-8">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
