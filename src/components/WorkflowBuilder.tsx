
import React, { useState } from 'react';
import { toast } from "sonner";
import { NodeType } from './workflow/types';
import { NodeData, NodeObject } from './workflow/types';
import { nodeTemplates } from './workflow/NodeTemplates';
import { NodePanel } from './workflow/NodePanel';
import { NodePropertiesPanel } from './workflow/NodePropertiesPanel';
import { WorkflowHeader } from './workflow/WorkflowHeader';
import { WorkflowToolbar } from './workflow/WorkflowToolbar';
import { WorkflowCanvas } from './workflow/WorkflowCanvas';
import { SavedWorkflowsPanel } from './workflow/SavedWorkflowsPanel';
import { useWorkflow } from '@/hooks/useWorkflow';
import { useDragNode } from '@/hooks/useDragNode';
import { useZoom } from '@/hooks/useZoom';

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
    setCurrentWorkflowName
  } = useWorkflow();
  
  const { zoom, zoomIn, zoomOut } = useZoom();
  
  const { 
    handleDragStart, 
    handleDragMove, 
    handleDragEnd 
  } = useDragNode(nodes, setNodes, connections, setConnections);
  
  // State for showing panels
  const [showNodePanel, setShowNodePanel] = useState(false);
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  
  // Handle node selection
  const handleNodeClick = (id: string) => {
    setSelectedNodeId(id === selectedNodeId ? null : id);
  };
  
  // Add a new node with the correct type
  const addNode = (type: string, name: string) => {
    const nodeType = type as NodeType;
    const newId = `${Date.now()}`;
    
    // Initialize with default data based on node type
    let nodeData: NodeData = {};
    
    if (nodeType === 'llm') {
      nodeData = { model: 'gpt-4o', temperature: 0.7 };
    } else if (nodeType === 'memory') {
      nodeData = { memoryType: 'conversation' };
    } else if (nodeType === 'process') {
      nodeData = { processType: 'transform' };
    } else if (nodeType === 'input') {
      nodeData = { inputName: 'user_input' };
    } else if (nodeType === 'output') {
      nodeData = { outputName: 'result' };
    } else if (nodeType === 'collection') {
      nodeData = { collectionId: '' };
    }
    
    const newNode: NodeObject = {
      id: newId,
      title: name,
      type: nodeType,
      x: 300,
      y: 300,
      data: nodeData
    };
    
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newId);
    setShowNodePanel(false);
  };

  // Handle property change for a node
  const handlePropertyChange = (id: string, data: Partial<NodeData>) => {
    setNodes(nodes.map(node => {
      if (node.id === id) {
        return { 
          ...node, 
          title: data.title || node.title,  // Update title if it's in the data
          data: { 
            ...(node.data || {}),  // Keep existing data
            ...data  // Add new data
          } 
        };
      }
      return node;
    }));
  };

  // Delete a node and its connections
  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    setConnections(connections.filter(
      conn => conn.from !== id && conn.to !== id
    ));
    setSelectedNodeId(null);
  };
  
  // Handle drag move with current zoom level
  const handleNodeDragMove = (event: React.MouseEvent) => {
    handleDragMove(event, zoom);
  };
  
  // Save the current workflow
  const saveWorkflow = () => {
    const name = prompt("Enter a name for this workflow:", currentWorkflowName || workflowName);
    
    if (!name) return; // User cancelled
    
    const workflowData = {
      name,
      nodes,
      connections,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    setSavedWorkflows({
      ...savedWorkflows,
      [name]: workflowData
    });
    
    setCurrentWorkflowName(name);
    setWorkflowName(name);
    toast.success(`Workflow "${name}" saved successfully`);
  };

  // Load a workflow
  const loadWorkflow = (name: string) => {
    const workflow = savedWorkflows[name];
    if (!workflow) {
      toast.error("Workflow not found");
      return;
    }
    
    setNodes(workflow.nodes);
    setConnections(workflow.connections);
    setCurrentWorkflowName(name);
    setWorkflowName(name);
    setShowSavedPanel(false);
    toast.success(`Workflow "${name}" loaded successfully`);
  };

  // Run the workflow (simulation)
  const runWorkflow = () => {
    toast.success("Workflow execution started");
    
    // For demo purposes, show a toast after a short delay
    setTimeout(() => {
      toast.success("Workflow execution completed successfully");
    }, 2000);
  };

  // Get the selected node object
  const selectedNode = selectedNodeId 
    ? nodes.find(node => node.id === selectedNodeId) 
    : null;
  
  return (
    <div className="rounded-xl bg-neutral-900 p-4 border border-neutral-700 shadow-xl overflow-hidden">
      <WorkflowHeader 
        workflowName={workflowName}
        onWorkflowNameChange={setWorkflowName}
        onSave={saveWorkflow}
        onRun={runWorkflow}
      />
      
      <WorkflowCanvas 
        nodes={nodes}
        connections={connections}
        zoom={zoom}
        selectedNodeId={selectedNodeId}
        onNodeClick={handleNodeClick}
        onDragStart={handleDragStart}
        onDragMove={handleNodeDragMove}
        onDragEnd={handleDragEnd}
      />
      
      <WorkflowToolbar 
        currentWorkflowName={currentWorkflowName}
        onAddNode={() => setShowNodePanel(true)}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onSave={saveWorkflow}
        onLoadWorkflow={() => setShowSavedPanel(true)}
        onRun={runWorkflow}
      />
      
      {/* Node selection panel (appears when plus button is clicked) */}
      {showNodePanel && (
        <NodePanel 
          templates={nodeTemplates}
          onClose={() => setShowNodePanel(false)}
          onSelectNode={addNode}
        />
      )}
      
      {/* Node properties panel (appears when a node is selected) */}
      {selectedNode && (
        <NodePropertiesPanel 
          node={selectedNode}
          onClose={() => setSelectedNodeId(null)}
          onPropertyChange={handlePropertyChange}
          onDeleteNode={handleDeleteNode}
        />
      )}

      {/* Saved Workflows Panel */}
      {showSavedPanel && (
        <SavedWorkflowsPanel 
          savedWorkflows={savedWorkflows}
          onClose={() => setShowSavedPanel(false)}
          onLoadWorkflow={loadWorkflow}
        />
      )}
    </div>
  );
};

export default WorkflowBuilder;
