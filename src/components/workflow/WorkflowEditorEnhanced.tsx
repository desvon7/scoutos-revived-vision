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
  EdgeTypes,
  useReactFlow,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import NodeSearchOverlay from './NodeSearchOverlay';
import WorkflowStatusBar from './WorkflowStatusBar';
import NodePalette from './NodePalette';
import PropertiesPanel from './PropertiesPanel';
import WorkflowConsole from './WorkflowConsole';
import useWorkflowStore from '../../store/workflowStore';
import { nodeTypes, edgeTypes } from './nodeRegistry';

const WorkflowEditor: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [miniMapVisible, setMiniMapVisible] = useState(true);
  const [gridSnap, setGridSnap] = useState(true);

  const { workflow, updateNodes, updateEdges, addNode, setSelectedNode, executionState } =
    useWorkflowStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project, getNodes, getEdges, fitView } = useReactFlow();

  // Load workflow from store
  React.useEffect(() => {
    setNodes(workflow.nodes);
    setEdges(workflow.edges);
  }, [workflow, setNodes, setEdges]);

  // Update store when nodes or edges change
  React.useEffect(() => {
    updateNodes(nodes);
  }, [nodes, updateNodes]);

  React.useEffect(() => {
    updateEdges(edges);
  }, [edges, updateEdges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: 'customEdge',
            animated: true,
            data: { label: 'connection' },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + F to open node search
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        setSearchOpen(true);
      }

      // ESC to close search
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }

      // Delete selected nodes
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const selectedNodes = nodes.filter((n) => n.selected);
        if (selectedNodes.length > 0) {
          setNodes(nodes.filter((n) => !n.selected));
          setEdges(
            edges.filter((e) => !selectedNodes.some((n) => n.id === e.source || n.id === e.target))
          );
        }
      }

      // CTRL+Z for undo
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        useWorkflowStore.getState().undo();
      }

      // CTRL+SHIFT+Z or CTRL+Y for redo
      if ((e.metaKey || e.ctrlKey) && ((e.shiftKey && e.key === 'z') || e.key === 'y')) {
        e.preventDefault();
        useWorkflowStore.getState().redo();
      }

      // CTRL+S for save
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        useWorkflowStore.getState().saveWorkflow();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, setNodes, setEdges]);

  // Add a node to the canvas
  const addNodeToCanvas = useCallback(
    (nodeType: string, position: { x: number; y: number }) => {
      const newNode = useWorkflowStore.getState().createNode(nodeType, position);
      addNode(newNode);
    },
    [addNode]
  );

  return (
    <div className="workflow-editor-container h-full relative" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={(_, node) => setSelectedNode(node.id)}
          snapToGrid={gridSnap}
          snapGrid={[20, 20]}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.1}
          maxZoom={2}
          connectionLineType="smoothstep"
          connectionRadius={20}
          deleteKeyCode="Delete"
          selectionKeyCode="Shift"
          multiSelectionKeyCode="Control"
          attributionPosition="bottom-right"
        >
          <Controls />
          {miniMapVisible && (
            <MiniMap
              nodeStrokeWidth={3}
              nodeStrokeColor="#fff"
              nodeBorderRadius={2}
              maskColor="rgba(0, 0, 0, 0.1)"
              nodeColor={(node) => {
                switch (node.data?.category) {
                  case 'input':
                    return '#4CAF50';
                  case 'llm':
                    return '#10A37F';
                  case 'code':
                    return '#F7DF1E';
                  case 'logic':
                    return '#2196F3';
                  default:
                    return '#607D8B';
                }
              }}
            />
          )}
          <Background variant="dots" gap={20} size={1} color="rgba(255, 255, 255, 0.1)" />

          {/* Toolbar */}
          <Panel position="top-right">
            <div className="flex items-center bg-gray-800 p-1 rounded-md shadow-md">
              <button
                onClick={() => fitView({ padding: 0.2 })}
                className="p-2 text-white hover:bg-gray-700 rounded"
                title="Fit view"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
              <button
                onClick={() => setMiniMapVisible(!miniMapVisible)}
                className={`p-2 text-white hover:bg-gray-700 rounded ${miniMapVisible ? 'bg-gray-700' : ''}`}
                title={miniMapVisible ? 'Hide minimap' : 'Show minimap'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <rect x="15" y="15" width="6" height="6" rx="1" ry="1"></rect>
                </svg>
              </button>
              <button
                onClick={() => setGridSnap(!gridSnap)}
                className={`p-2 text-white hover:bg-gray-700 rounded ${gridSnap ? 'bg-gray-700' : ''}`}
                title={gridSnap ? 'Disable grid snap' : 'Enable grid snap'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-white hover:bg-gray-700 rounded"
                title="Search nodes (Ctrl+F)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </Panel>

          {/* Status bar */}
          <Panel position="bottom-center">
            <WorkflowStatusBar />
          </Panel>
        </ReactFlow>

        {/* Node search overlay */}
        {searchOpen && (
          <NodeSearchOverlay
            onClose={() => setSearchOpen(false)}
            onSelectNode={(type) => {
              const position = project({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
              addNodeToCanvas(type, position);
              setSearchOpen(false);
            }}
          />
        )}
      </ReactFlowProvider>

      {/* Console panel */}
      <WorkflowConsole />
    </div>
  );
};

export default WorkflowEditor;
