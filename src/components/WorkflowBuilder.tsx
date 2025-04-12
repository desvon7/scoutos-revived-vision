
import React, { useState, useEffect } from 'react';
import { Save, ZoomIn, ZoomOut, Plus, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Node, NodeType } from './workflow/Node';
import { Connection } from './workflow/Connection';
import { nodeTemplates } from './workflow/nodeTemplates';
import { NodePanel } from './workflow/NodePanel';
import { NodePropertiesPanel } from './workflow/NodePropertiesPanel';
import { NodeObject, ConnectionObject, WorkflowData } from './workflow/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { toast } from "sonner";

const WorkflowBuilder: React.FC = () => {
  // State for the workflow nodes and connections
  const [nodes, setNodes] = useState<NodeObject[]>([
    { id: '1', title: 'Slack', type: 'input', x: 100, y: 80 },
    { id: '2', title: 'Memory', type: 'memory', x: 260, y: 80 },
    { id: '3', title: 'Check', type: 'process', x: 420, y: 80 },
    { id: '4', title: 'Collection', type: 'process', x: 260, y: 150 },
    { id: '5', title: 'LLM', type: 'llm', x: 420, y: 220 },
  ]);
  
  const [connections, setConnections] = useState<ConnectionObject[]>([
    { id: 'e1', from: '1', to: '2', x1: 160, y1: 100, x2: 260, y2: 100 },
    { id: 'e2', from: '2', to: '3', x1: 320, y1: 100, x2: 420, y2: 100 },
    { id: 'e3', from: '3', to: '4', x1: 440, y1: 120, x2: 320, y2: 170 },
    { id: 'e4', from: '4', to: '5', x1: 305, y1: 150, x2: 420, y2: 220 },
  ]);

  // localStorage for saved workflows
  const [savedWorkflows, setSavedWorkflows] = useLocalStorage<Record<string, WorkflowData>>('savedWorkflows', {});
  
  // State for the selected node
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // State for zoom level
  const [zoom, setZoom] = useState(1);
  
  // State for showing node panel
  const [showNodePanel, setShowNodePanel] = useState(false);

  // State for showing saved workflows panel
  const [showSavedPanel, setShowSavedPanel] = useState(false);

  // State for current workflow name
  const [currentWorkflowName, setCurrentWorkflowName] = useState<string>('');

  // State for dragging
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Handle node selection
  const handleNodeClick = (id: string) => {
    setSelectedNodeId(id === selectedNodeId ? null : id);
  };
  
  // Add a new node with the correct type
  const addNode = (type: NodeType, title: string) => {
    const newId = `${nodes.length + 1}`;
    const newNode: NodeObject = {
      id: newId,
      title,
      type,
      x: 300,
      y: 300,
    };
    
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newId);
    setShowNodePanel(false);
  };

  // Handle title change for a node
  const handleTitleChange = (id: string, newTitle: string) => {
    setNodes(nodes.map(node => 
      node.id === id 
        ? { ...node, title: newTitle } 
        : node
    ));
  };

  // Delete a node and its connections
  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    setConnections(connections.filter(
      conn => conn.from !== id && conn.to !== id
    ));
    setSelectedNodeId(null);
  };
  
  // Handle drag start
  const handleDragStart = (id: string, event: React.MouseEvent) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    
    const svgElement = event.currentTarget.closest('svg');
    if (!svgElement) return;
    
    const svgRect = svgElement.getBoundingClientRect();
    const scale = zoom;
    
    // Calculate the offset based on mouse position and node position
    const offsetX = (event.clientX - svgRect.left) / scale - node.x;
    const offsetY = (event.clientY - svgRect.top) / scale - node.y;
    
    setDraggedNodeId(id);
    setDragOffset({ x: offsetX, y: offsetY });
    
    // Prevent default behavior to allow drag
    event.preventDefault();
  };
  
  // Handle drag move
  const handleDragMove = (event: React.MouseEvent) => {
    if (!draggedNodeId) return;
    
    const svgElement = event.currentTarget.closest('svg');
    if (!svgElement) return;
    
    const svgRect = svgElement.getBoundingClientRect();
    const scale = zoom;
    
    // Calculate the new position based on mouse position and offset
    const newX = (event.clientX - svgRect.left) / scale - dragOffset.x;
    const newY = (event.clientY - svgRect.top) / scale - dragOffset.y;
    
    // Update the node position
    setNodes(nodes.map(node => 
      node.id === draggedNodeId 
        ? { ...node, x: newX, y: newY } 
        : node
    ));
    
    // Update connections
    setConnections(connections.map(conn => {
      if (conn.from === draggedNodeId) {
        return {
          ...conn,
          x1: newX + 120, // Adjusted for node width
          y1: newY + 20  // Adjusted for node height/2
        };
      }
      if (conn.to === draggedNodeId) {
        return {
          ...conn,
          x2: newX,
          y2: newY + 20 // Adjusted for node height/2
        };
      }
      return conn;
    }));
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setDraggedNodeId(null);
  };
  
  // Handle zoom in
  const zoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2));
  };
  
  // Handle zoom out
  const zoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5));
  };

  // Save the current workflow
  const saveWorkflow = () => {
    // Create a prompt to name the workflow
    const name = prompt("Enter a name for this workflow:", currentWorkflowName || "My Workflow");
    
    if (!name) return; // User cancelled
    
    const workflowData: WorkflowData = {
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
    setShowSavedPanel(false);
    toast.success(`Workflow "${name}" loaded successfully`);
  };

  // Get the selected node object
  const selectedNode = selectedNodeId 
    ? nodes.find(node => node.id === selectedNodeId) 
    : null;
  
  return (
    <div className="rounded-xl bg-neutral-900 p-4 border border-neutral-700 shadow-xl overflow-hidden">
      <div className="relative">
        <svg 
          width="100%" 
          height="300" 
          viewBox="0 0 600 280" 
          className="mx-auto"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" strokeWidth="0.5" />
            </pattern>
            
            {/* Arrow marker */}
            <marker
              id="arrowhead"
              markerWidth="4"
              markerHeight="4"
              refX="2"
              refY="2"
              orient="auto"
            >
              <path d="M0,0 L4,2 L0,4 z" className="fill-neutral-500" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Connections */}
          {connections.map((connection) => (
            <Connection 
              key={connection.id}
              x1={connection.x1}
              y1={connection.y1}
              x2={connection.x2}
              y2={connection.y2}
            />
          ))}

          {/* Nodes */}
          {nodes.map((node) => (
            <Node 
              key={node.id}
              title={node.title}
              type={node.type}
              x={node.x}
              y={node.y}
              selected={node.id === selectedNodeId}
              onClick={() => handleNodeClick(node.id)}
              onMouseDown={(e) => handleDragStart(node.id, e)}
            />
          ))}
        </svg>
      </div>
      
      {/* Toolbar */}
      <div className="flex justify-between items-center mt-4 p-2 bg-neutral-800 rounded-md">
        <div className="flex gap-2">
          <button 
            className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
            onClick={() => setShowNodePanel(true)}
            title="Add node"
          >
            <Plus className="text-white h-4 w-4" />
          </button>
          <button 
            className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
            onClick={zoomIn}
            title="Zoom in"
          >
            <ZoomIn className="text-white h-4 w-4" />
          </button>
          <button 
            className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
            onClick={zoomOut}
            title="Zoom out"
          >
            <ZoomOut className="text-white h-4 w-4" />
          </button>
          <button 
            className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
            onClick={saveWorkflow}
            title="Save workflow"
          >
            <Save className="text-white h-4 w-4" />
          </button>
          <button 
            className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
            onClick={() => setShowSavedPanel(true)}
            title="Load workflow"
          >
            <Upload className="text-white h-4 w-4" />
          </button>
        </div>
        <div>
          {currentWorkflowName && (
            <span className="text-neutral-400 text-xs mr-2">{currentWorkflowName}</span>
          )}
          <button className="px-3 py-1 bg-primary rounded-md text-white text-xs">Run</button>
        </div>
      </div>
      
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
          onTitleChange={handleTitleChange}
          onDeleteNode={handleDeleteNode}
        />
      )}

      {/* Saved Workflows Panel */}
      {showSavedPanel && (
        <div className="absolute left-4 top-4 bg-neutral-800 p-4 rounded-md shadow-lg w-60 z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white text-sm font-medium">Load Workflow</h3>
            <button 
              className="text-neutral-400 hover:text-white"
              onClick={() => setShowSavedPanel(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {Object.entries(savedWorkflows).length === 0 ? (
              <div className="text-neutral-400 text-xs">No saved workflows</div>
            ) : (
              Object.entries(savedWorkflows).map(([name, workflow]) => (
                <div 
                  key={name}
                  className="p-2 bg-neutral-700 rounded-md hover:bg-neutral-600 cursor-pointer"
                  onClick={() => loadWorkflow(name)}
                >
                  <div className="text-white text-sm font-medium">{name}</div>
                  <div className="text-neutral-400 text-xs">
                    {new Date(workflow.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;
