
import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  Node,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";

// Import node components
import LLMNode from './nodes/LLMNode';
import InputNode from './nodes/InputNode';
import CollectionNode from './nodes/CollectionNode';
import OutputNode from './nodes/OutputNode';
import { nodeTemplates } from './NodeTemplates';

// Define node types
const nodeTypes: NodeTypes = {
  llm: LLMNode,
  input: InputNode,
  collection: CollectionNode,
  output: OutputNode,
};

// Initial nodes
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { label: 'User Input' },
  },
  {
    id: '2',
    type: 'collection',
    position: { x: 300, y: 100 },
    data: { label: 'Search Collection', collection: 'Documentation' },
  },
  {
    id: '3',
    type: 'llm',
    position: { x: 500, y: 100 },
    data: { label: 'Generate Response', model: 'GPT-4' },
  },
  {
    id: '4',
    type: 'output',
    position: { x: 700, y: 100 },
    data: { label: 'Response' },
  },
];

// Initial edges
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];

interface WorkflowEditorProps {
  workflowId?: string;
}

const WorkflowEditor = ({ workflowId }: WorkflowEditorProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  // Handle the connection of nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    []
  );

  // Load workflow if ID is provided
  useEffect(() => {
    if (workflowId) {
      // Here you would fetch the workflow data from your API
      // For now, we'll just use our initial data
      setWorkflowName(`Workflow ${workflowId}`);
    }
  }, [workflowId]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/nodeName');
      
      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: { label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeTemplate: any) => {
    event.dataTransfer.setData('application/reactflow', nodeTemplate.type);
    event.dataTransfer.setData('application/nodeName', nodeTemplate.label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would make an API call to save the workflow
      // For now, we'll just simulate this with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving workflow:', { name: workflowName, nodes, edges });
      toast.success("Workflow saved successfully");
    } catch (error) {
      console.error('Error saving workflow:', error);
      toast.error("Failed to save workflow");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      // Here you would make an API call to run the workflow
      // For now, we'll just simulate this with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Running workflow:', { name: workflowName });
      toast.success("Workflow executed successfully");
    } catch (error) {
      console.error('Error running workflow:', error);
      toast.error("Failed to run workflow");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Left sidebar - Node palette */}
      <div className="w-64 h-full border-r border-neutral-200 bg-white p-4">
        <h3 className="text-lg font-medium mb-4">Blocks</h3>
        <div className="space-y-2">
          {nodeTemplates.map((template) => (
            <div
              key={template.type}
              className="border border-neutral-200 rounded-md p-3 cursor-move bg-white hover:bg-neutral-50 transition-colors flex items-center"
              draggable
              onDragStart={(event) => onDragStart(event, template)}
            >
              <span className="mr-2 text-lg">{template.icon}</span>
              <span>{template.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex-1 h-full flex flex-col">
        <div className="flex items-center justify-between border-b border-neutral-200 bg-white p-4">
          <div className="flex items-center">
            <Input 
              className="w-64"
              placeholder="Untitled Workflow"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save
                </>
              )}
            </Button>
            <Button variant="default" size="sm" onClick={handleRun} disabled={isRunning}>
              {isRunning ? 'Running...' : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Run
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="h-full flex" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background 
              // Changed from variant="dots" to one of the valid values
              color="#aaa" 
              gap={12} 
              size={1} 
            />
          </ReactFlow>
        </div>
      </div>

      {/* Right sidebar - Node properties */}
      <div className="w-72 h-full border-l border-neutral-200 bg-white p-4 overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">Properties</h3>
        {selectedNode ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedNode.data.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Label
                </label>
                <Input
                  value={selectedNode.data.label}
                  onChange={(e) => {
                    const newLabel = e.target.value;
                    setNodes((nds) =>
                      nds.map((node) => {
                        if (node.id === selectedNode.id) {
                          return {
                            ...node,
                            data: {
                              ...node.data,
                              label: newLabel,
                            },
                          };
                        }
                        return node;
                      })
                    );
                  }}
                />
              </div>

              {/* Add type-specific properties */}
              {selectedNode.type === 'llm' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Model
                    </label>
                    <select
                      className="w-full border border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2"
                      value={selectedNode.data.model || ''}
                      onChange={(e) => {
                        const newModel = e.target.value;
                        setNodes((nds) =>
                          nds.map((node) => {
                            if (node.id === selectedNode.id) {
                              return {
                                ...node,
                                data: {
                                  ...node.data,
                                  model: newModel,
                                },
                              };
                            }
                            return node;
                          })
                        );
                      }}
                    >
                      <option value="">Select a model</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="gpt-4">GPT-4</option>
                      <option value="claude-2">Claude 2</option>
                      <option value="llama-2-70b">Llama 2 (70B)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      System Prompt
                    </label>
                    <textarea
                      className="w-full border border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2"
                      rows={3}
                      value={selectedNode.data.systemPrompt || ''}
                      onChange={(e) => {
                        const newPrompt = e.target.value;
                        setNodes((nds) =>
                          nds.map((node) => {
                            if (node.id === selectedNode.id) {
                              return {
                                ...node,
                                data: {
                                  ...node.data,
                                  systemPrompt: newPrompt,
                                },
                              };
                            }
                            return node;
                          })
                        );
                      }}
                      placeholder="You are a helpful assistant..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Temperature
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        className="w-full"
                        value={selectedNode.data.temperature || 0.7}
                        onChange={(e) => {
                          const newTemp = parseFloat(e.target.value);
                          setNodes((nds) =>
                            nds.map((node) => {
                              if (node.id === selectedNode.id) {
                                return {
                                  ...node,
                                  data: {
                                    ...node.data,
                                    temperature: newTemp,
                                  },
                                };
                              }
                              return node;
                            })
                          );
                        }}
                      />
                      <span className="ml-2 w-10 text-center">
                        {selectedNode.data.temperature || 0.7}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {selectedNode.type === 'collection' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Collection
                    </label>
                    <select
                      className="w-full border border-neutral-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2"
                      value={selectedNode.data.collection || ''}
                      onChange={(e) => {
                        const newCollection = e.target.value;
                        setNodes((nds) =>
                          nds.map((node) => {
                            if (node.id === selectedNode.id) {
                              return {
                                ...node,
                                data: {
                                  ...node.data,
                                  collection: newCollection,
                                },
                              };
                            }
                            return node;
                          })
                        );
                      }}
                    >
                      <option value="">Select a collection</option>
                      <option value="Documentation">Documentation</option>
                      <option value="Knowledge Base">Knowledge Base</option>
                      <option value="Customer Support">Customer Support</option>
                      <option value="Product Information">Product Information</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Max Results
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={selectedNode.data.maxResults || 5}
                      onChange={(e) => {
                        const newMaxResults = parseInt(e.target.value);
                        setNodes((nds) =>
                          nds.map((node) => {
                            if (node.id === selectedNode.id) {
                              return {
                                ...node,
                                data: {
                                  ...node.data,
                                  maxResults: newMaxResults,
                                },
                              };
                            }
                            return node;
                          })
                        );
                      }}
                    />
                  </div>
                </>
              )}

              <div className="pt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    // Delete the selected node
                    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
                    // Also delete any connected edges
                    setEdges((eds) =>
                      eds.filter(
                        (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
                      )
                    );
                    setSelectedNode(null);
                  }}
                >
                  Delete Node
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-neutral-500 p-4">
            Select a node to view its properties
          </div>
        )}
      </div>
    </div>
  );
};

export function WorkflowEditorWrapper(props: WorkflowEditorProps) {
  return (
    <ReactFlowProvider>
      <WorkflowEditor {...props} />
    </ReactFlowProvider>
  );
}
