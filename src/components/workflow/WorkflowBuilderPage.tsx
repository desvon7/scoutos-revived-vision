import React from 'react';
import { toast } from '@/hooks/use-toast';
import WorkflowConsole from './WorkflowConsole';
import WorkflowStatusBar from './WorkflowStatusBar';
import NodeSearchOverlay from './NodeSearchOverlay';
import NodePalette from './NodePalette';
import PropertiesPanel from './PropertiesPanel';
import { WorkflowCanvas } from './WorkflowCanvas';
import { useWorkflowStore } from '../../store/workflowStore';
import { NodeCategory, ExecutionState } from '@/types/nodes';
import { NodeType as CoreNodeType } from './types';
import { ReactFlowProvider } from 'reactflow';

const WorkflowBuilderPage: React.FC = () => {
  const { addNode } = useWorkflowStore();

  const handleNodeSelect = (nodeType: CoreNodeType) => {
    addNode({
      id: `node-${Date.now()}`,
      type: nodeType,
      position: { x: 100, y: 100 },
      data: {
        label: nodeType,
        inputs: [],
        outputs: [],
        config: {},
        state: ExecutionState.IDLE,
        category: NodeCategory.CUSTOM,
        type: nodeType,
        icon: 'default',
        color: '#000000'
      }
    });
  };

  const handleSearchNodeSelect = (type: string) => {
    handleNodeSelect(type as CoreNodeType);
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Left sidebar - Node Palette */}
        <div className="w-64 border-r border-gray-700">
          <NodePalette onDragStart={handleNodeSelect} />
        </div>
        
        {/* Main canvas area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <WorkflowCanvas 
              nodes={[]} 
              connections={[]} 
              onNodeClick={() => {}} 
            />
            <NodeSearchOverlay 
              onClose={() => {}} 
              onSelectNode={handleSearchNodeSelect} 
            />
          </div>
          
          {/* Bottom console */}
          <WorkflowConsole />
          
          {/* Status bar */}
          <WorkflowStatusBar />
        </div>
        
        {/* Right sidebar - Properties Panel */}
        <div className="w-80 border-l border-gray-700">
          <PropertiesPanel 
            selectedNodeId={null}
            onUpdate={() => {}}
            onDelete={() => {}}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowBuilderPage;
