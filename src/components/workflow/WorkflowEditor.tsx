import React from 'react';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodePalette } from './NodePalette';
import { PropertiesPanel } from './PropertiesPanel';
import { WorkflowConsole } from './WorkflowConsole';
import { useWorkflowStore } from './store';
import { NodeObject, ConnectionObject, NodeData, NodeType, NodeCategory } from './types';

export function WorkflowEditor() {
  const {
    nodes,
    connections,
    selectedNodeId,
    addNode,
    updateNode,
    deleteNode,
    addConnection,
    deleteConnection,
    setSelectedNode
  } = useWorkflowStore();

  const handleNodeSelect = (id: string) => {
    setSelectedNode(id);
  };

  const handleNodeMove = (id: string, x: number, y: number) => {
    updateNode(id, { x, y });
  };

  const handleNodeUpdate = (id: string, data: NodeData) => {
    updateNode(id, { data });
  };

  const handleNodeDelete = (id: string) => {
    deleteNode(id);
  };

  const handleConnectionCreate = (fromId: string, toId: string, fromPort: string, toPort: string) => {
    addConnection({
      id: `${fromId}-${toId}`,
      type: 'default',
      from: fromId,
      to: toId,
      fromPort,
      toPort
    });
  };

  const handleConnectionDelete = (id: string) => {
    deleteConnection(id);
  };

  const getNodeCategory = (type: NodeType): NodeCategory => {
    switch (type) {
      case 'input':
      case 'output':
        return 'input';
      case 'llm':
        return 'llm';
      case 'condition':
      case 'loop':
        return 'logic';
      case 'transform':
        return 'data-transformation';
      case 'api':
        return 'integration';
      case 'data':
        return 'data';
      default:
        return 'input';
    }
  };

  const handleNodeDrop = (type: NodeType, x: number, y: number) => {
    const category = getNodeCategory(type);
    const newNode: NodeObject = {
      id: `node-${Date.now()}`,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      category,
      x,
      y,
      data: {
        category,
        type,
        label: type.charAt(0).toUpperCase() + type.slice(1),
        inputs: [],
        outputs: [],
        config: {},
        state: 'idle',
        metadata: {}
      }
    };
    addNode(newNode);
  };

  return (
    <div className="flex h-full">
      <div className="w-64 bg-background border-r">
        <NodePalette onDragStart={(type) => handleNodeDrop(type, 100, 100)} />
      </div>
      
      <div className="flex-1 relative">
        <WorkflowCanvas
          nodes={nodes}
          connections={connections}
          onNodeSelect={handleNodeSelect}
          onNodeMove={handleNodeMove}
          onNodeUpdate={handleNodeUpdate}
          onNodeDelete={handleNodeDelete}
          onConnectionCreate={handleConnectionCreate}
          onConnectionDelete={handleConnectionDelete}
        />
      </div>
      
      <div className="w-80 bg-background border-l">
        <PropertiesPanel
          selectedNodeId={selectedNodeId}
          onUpdate={handleNodeUpdate}
          onDelete={handleNodeDelete}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-background border-t">
        <WorkflowConsole />
      </div>
    </div>
  );
}
