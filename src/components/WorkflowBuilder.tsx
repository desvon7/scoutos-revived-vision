import React from 'react';
import { useWorkflow } from '@/hooks/useWorkflow';
import { useDragNode } from '@/hooks/useDragNode';
import { useZoom } from '@/hooks/useZoom';
import { useWorkflowActions } from '@/hooks/useWorkflowActions';
import { WorkflowContent } from './workflow/WorkflowContent';

const WorkflowBuilder: React.FC = () => {
  // Get workflow state from custom hooks
  const {
    workflowName,
    setWorkflowName,
    nodes,
    setNodes,
    connections,
    setConnections,
    savedWorkflows,
    setSavedWorkflows,
    selectedNodeId,
    setSelectedNodeId,
    currentWorkflowName,
    setCurrentWorkflowName,
  } = useWorkflow();

  const { zoom, zoomIn, zoomOut } = useZoom();

  const { handleDragStart, handleDragMove, handleDragEnd } = useDragNode(
    nodes,
    setNodes,
    connections,
    setConnections
  );

  const {
    showNodePanel,
    setShowNodePanel,
    showSavedPanel,
    setShowSavedPanel,
    handleNodeClick,
    addNode,
    handlePropertyChange,
    handleDeleteNode,
    saveWorkflow,
    loadWorkflow,
    runWorkflow,
  } = useWorkflowActions(
    nodes,
    setNodes,
    connections,
    setConnections,
    selectedNodeId,
    setSelectedNodeId,
    savedWorkflows,
    // Type is explicitly provided to avoid incompatible function argument error
    setSavedWorkflows as React.Dispatch<React.SetStateAction<Record<string, any>>>,
    workflowName,
    setWorkflowName,
    currentWorkflowName,
    setCurrentWorkflowName
  );

  // Handle drag move with current zoom level
  const handleNodeDragMove = (event: React.MouseEvent) => {
    handleDragMove(event, zoom);
  };

  return (
    <WorkflowContent
      workflowName={workflowName}
      setWorkflowName={setWorkflowName}
      nodes={nodes}
      connections={connections}
      zoom={zoom}
      selectedNodeId={selectedNodeId}
      currentWorkflowName={currentWorkflowName}
      showNodePanel={showNodePanel}
      showSavedPanel={showSavedPanel}
      savedWorkflows={savedWorkflows}
      onNodeClick={handleNodeClick}
      onDragStart={(e: React.MouseEvent, id: string) => handleDragStart(id, e)}
      onDragMove={handleNodeDragMove}
      onDragEnd={handleDragEnd}
      onAddNode={() => setShowNodePanel(true)}
      onCloseNodePanel={() => setShowNodePanel(false)}
      onSelectNode={addNode}
      onCloseSavedPanel={() => setShowSavedPanel(true)}
      onPropertyChange={handlePropertyChange}
      onDeleteNode={handleDeleteNode}
      onLoadWorkflow={loadWorkflow}
      onSave={saveWorkflow}
      onRun={runWorkflow}
      onZoomIn={zoomIn}
      onZoomOut={zoomOut}
    />
  );
};

export default WorkflowBuilder;
