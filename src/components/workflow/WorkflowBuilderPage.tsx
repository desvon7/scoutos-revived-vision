import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodePalette } from './NodePalette';
import { PropertiesPanel } from './PropertiesPanel';
import { WorkflowConsole } from './WorkflowConsole';
import { WorkflowStatusBar } from './WorkflowStatusBar';
import { NodeSearchOverlay } from './NodeSearchOverlay';
import { useWorkflowStore } from '../../store/workflowStore';

const WorkflowBuilderPage: React.FC = () => {
  const { addNode } = useWorkflowStore();

  const handleNodeSelect = (nodeType: string) => {
    addNode({
      id: `node-${Date.now()}`,
      type: nodeType,
      position: { x: 100, y: 100 },
      data: {
        inputs: [],
        outputs: [],
        config: {}
      }
    });
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Left sidebar - Node Palette */}
        <div className="w-64 border-r border-gray-700">
          <NodePalette />
        </div>
        
        {/* Main canvas area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <WorkflowCanvas />
            <NodeSearchOverlay 
              onClose={() => {}} 
              onSelectNode={handleNodeSelect} 
            />
          </div>
          
          {/* Bottom console */}
          <WorkflowConsole />
          
          {/* Status bar */}
          <WorkflowStatusBar />
        </div>
        
        {/* Right sidebar - Properties Panel */}
        <div className="w-80 border-l border-gray-700">
          <PropertiesPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowBuilderPage; 