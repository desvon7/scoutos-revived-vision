import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node as ReactFlowNode,
  NodeTypes,
  EdgeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';

import { NodeObject, ConnectionObject, NodeType } from './types';
import { NodeFactory } from './nodes/factory';
import { ConnectionValidator } from './validation';
import { useWorkflowStore } from './store';

// Import custom nodes
import LLMNode from './nodes/LLMNode';
import TextInputNode from './nodes/TextInputNode';
import JavaScriptNode from './nodes/JavaScriptNode';
import CollectionNode from './nodes/CollectionNode';
import OutputNode from './nodes/OutputNode';
import ConditionalNode from './nodes/ConditionalNode';
import HTTPRequestNode from './nodes/HTTPRequestNode';
import WebScraperNode from './nodes/WebScraperNode';

// Import custom edges
import ConnectionEdge from './edges/ConnectionEdge';

// Define custom node types
const nodeTypes: NodeTypes = {
  'gpt-4': LLMNode,
  'gpt-3.5-turbo': LLMNode,
  'claude-3-opus': LLMNode,
  'text-input': TextInputNode,
  'javascript': JavaScriptNode,
  'collection-query': CollectionNode,
  'collection-save': CollectionNode,
  'conditional': ConditionalNode,
  'http-request': HTTPRequestNode,
  'web-scraper': WebScraperNode,
  'output': OutputNode,
};

// Define custom edge types
const edgeTypes: EdgeTypes = {
  connectionEdge: ConnectionEdge,
};

export interface WorkflowEditorProps {
  readOnly?: boolean;
}

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ readOnly = false }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Use the workflow store
  const { 
    workflow, 
    updateNodes, 
    updateEdges, 
    addNode,
    setSelectedNode,
    selectedNode
  } = useWorkflowStore();

  // Convert workflow nodes and edges to ReactFlow format
  const initialNodes = workflow.nodes.map(node => ({
    ...node,
    type: node.type,
    data: { ...node.data },
  }));

  const initialEdges = workflow.connections.map(edge => ({
    ...edge,
    type: 'connectionEdge',
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update the workflow store when nodes or edges change
  React.useEffect(() => {
    updateNodes(nodes);
  }, [nodes, updateNodes]);

  React.useEffect(() => {
    updateEdges(edges);
  }, [edges, updateEdges]);

  // Handle connecting nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      // Find the source and target nodes
      const sourceNode = nodes.find(n => n.id === connection.source);
      const targetNode = nodes.find(n => n.id === connection.target);

      if (sourceNode && targetNode) {
        // Validate the connection
        const validationResult = ConnectionValidator.validateConnection(
          sourceNode as unknown as NodeObject, 
          targetNode as unknown as NodeObject,
          connection.sourceHandle!,
          connection.targetHandle!
        );

        if (validationResult.isValid) {
          // Add the edge
          setEdges((eds) => addEdge(
            { 
              ...connection, 
              type: 'connectionEdge',
              animated: true,
              data: {
                sourceType: sourceNode.type,
                targetType: targetNode.type
              }
            }, 
            eds
          ));
        } else {
          // Show an error message
          console.error(`Invalid connection: ${validationResult.error}`);
        }
      }
    },
    [nodes, setEdges]
  );

  // Handle node click
  const onNodeClick = useCallback((event: React.MouseEvent, node: ReactFlowNode) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  // Handle dropping new nodes from the palette
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (reactFlowWrapper.current && reactFlowInstance) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const nodeType = event.dataTransfer.getData('application/reactflow/type') as NodeType;
        
        // Check if the dropped element is valid
        if (typeof nodeType === 'undefined' || !nodeType) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // Create new node
        const newNode = NodeFactory.createNode(nodeType, position);
        
        // Add node to the workflow
        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="workflow-editor-container h-full" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          attributionPosition="bottom-right"
          nodesConnectable={!readOnly}
          elementsSelectable={!readOnly}
          nodesDraggable={!readOnly}
        >
          <Controls />
          <MiniMap 
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowEditor;
