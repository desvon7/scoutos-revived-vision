
import { useState } from 'react';
import { toast } from "sonner";
import { NodeTemplate } from '@/components/workflow/NodeTemplates';
import { NodeData, NodeObject, NodeType } from '@/components/workflow/types';

export function useWorkflowActions(
  nodes: NodeObject[],
  setNodes: React.Dispatch<React.SetStateAction<NodeObject[]>>,
  connections: any[],
  setConnections: React.Dispatch<React.SetStateAction<any[]>>,
  selectedNodeId: string | null,
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>,
  savedWorkflows: Record<string, any>,
  setSavedWorkflows: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  workflowName: string,
  setWorkflowName: React.Dispatch<React.SetStateAction<string>>,
  currentWorkflowName: string,
  setCurrentWorkflowName: React.Dispatch<React.SetStateAction<string>>
) {
  // State for showing panels
  const [showNodePanel, setShowNodePanel] = useState(false);
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  
  // Handle node selection
  const handleNodeClick = (id: string) => {
    setSelectedNodeId(id === selectedNodeId ? null : id);
  };
  
  // Add a new node from a template
  const addNode = (template: NodeTemplate) => {
    const nodeType = template.type as NodeType;
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
      title: template.name,
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

  return {
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
    runWorkflow
  };
}
