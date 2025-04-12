
import React from 'react';

interface DashboardTabsProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const DashboardTabs = ({ selectedTab, onSelectTab }: DashboardTabsProps) => {
  return (
    <div className="mb-8">
      <nav className="flex space-x-4 border-b">
        <button
          onClick={() => onSelectTab('workflows')}
          className={`px-4 py-2 font-medium text-sm ${
            selectedTab === 'workflows' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground'
          }`}
        >
          Workflows
        </button>
        <button
          onClick={() => onSelectTab('collections')}
          className={`px-4 py-2 font-medium text-sm ${
            selectedTab === 'collections' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground'
          }`}
        >
          Collections
        </button>
        <button
          onClick={() => onSelectTab('templates')}
          className={`px-4 py-2 font-medium text-sm ${
            selectedTab === 'templates' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-muted-foreground'
          }`}
        >
          Templates
        </button>
      </nav>
    </div>
  );
};

export default DashboardTabs;
