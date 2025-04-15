import React from 'react';
import { NodePanel } from './NodePanel';
import { NodePropertiesPanel } from './NodePropertiesPanel';
import { WorkflowHeader } from './WorkflowHeader';
import { WorkflowToolbar } from './WorkflowToolbar';
import { WorkflowCanvas } from './WorkflowCanvas';
import { SavedWorkflowsPanel } from './SavedWorkflowsPanel';
import { NodeTemplate, nodeTemplates } from './NodeTemplates';
import { NodeObject } from './types';

interface WorkflowContentProps {
  workflowName: string;
  setWorkflowName: (name: string) => void;
  nodes: NodeObject[];
  connections: any[];
  zoom: number;
  selectedNodeId: string | null;
  currentWorkflowName: string;
  showNodePanel: boolean;
  showSavedPanel: boolean;
  savedWorkflows: Record<string, any>;
  onNodeClick: (id: string) => void;
  onDragStart: (e: React.MouseEvent, id: string) => void;
  onDragMove: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
  onAddNode: () => void;
  onCloseNodePanel: () => void;
  onSelectNode: (template: NodeTemplate) => void;
  onCloseSavedPanel: () => void;
  onPropertyChange: (id: string, data: any) => void;
  onDeleteNode: (id: string) => void;
  onLoadWorkflow: (name: string) => void;
  onSave: () => void;
  onRun: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const WorkflowContent: React.FC<WorkflowContentProps> = ({
  workflowName,
  setWorkflowName,
  nodes,
  connections,
  zoom,
  selectedNodeId,
  currentWorkflowName,
  showNodePanel,
  showSavedPanel,
  savedWorkflows,
  onNodeClick,
  onDragStart,
  onDragMove,
  onDragEnd,
  onAddNode,
  onCloseNodePanel,
  onSelectNode,
  onCloseSavedPanel,
  onPropertyChange,
  onDeleteNode,
  onLoadWorkflow,
  onSave,
  onRun,
  onZoomIn,
  onZoomOut,
}) => {
  // Get the selected node object
  const selectedNode = selectedNodeId ? nodes.find((node) => node.id === selectedNodeId) : null;

  return (
    <div className="rounded-xl bg-neutral-900 p-4 border border-neutral-700 shadow-xl overflow-hidden">
      <WorkflowHeader
        workflowName={workflowName}
        onWorkflowNameChange={setWorkflowName}
        onSave={onSave}
        onRun={onRun}
      />

      <WorkflowCanvas
        nodes={nodes}
        connections={connections}
        zoom={zoom}
        selectedNodeId={selectedNodeId}
        onNodeClick={onNodeClick}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      />

      <WorkflowToolbar
        currentWorkflowName={currentWorkflowName}
        onAddNode={onAddNode}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onSave={onSave}
        onLoadWorkflow={() => onCloseSavedPanel()}
        onRun={onRun}
      />

      {/* Node selection panel (appears when plus button is clicked) */}
      {showNodePanel && (
        <NodePanel
          templates={nodeTemplates}
          onClose={onCloseNodePanel}
          onSelectNode={onSelectNode}
        />
      )}

      {/* Node properties panel (appears when a node is selected) */}
      {selectedNode && (
        <NodePropertiesPanel
          node={selectedNode}
          onClose={() => onNodeClick(selectedNode.id)}
          onPropertyChange={onPropertyChange}
          onDeleteNode={onDeleteNode}
        />
      )}

      {/* Saved Workflows Panel */}
      {showSavedPanel && (
        <SavedWorkflowsPanel
          savedWorkflows={savedWorkflows}
          onClose={onCloseSavedPanel}
          onLoadWorkflow={onLoadWorkflow}
        />
      )}
    </div>
  );
};
