
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus, ZoomIn, ZoomOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NodeProps {
  title: string;
  type: 'input' | 'process' | 'output' | 'memory' | 'llm';
  x: number;
  y: number;
  width?: number;
  height?: number;
  selected?: boolean;
  onClick?: () => void;
}

const Node: React.FC<NodeProps> = ({ 
  title, 
  type, 
  x, 
  y, 
  width = 120, 
  height = 40,
  selected = false,
  onClick
}) => {
  const getNodeColor = () => {
    switch (type) {
      case 'input':
        return 'border-blue-500';
      case 'process':
        return 'border-green-500';
      case 'output':
        return 'border-purple-500';
      case 'memory':
        return 'border-amber-500';
      case 'llm':
        return 'border-pink-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <g 
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      className="cursor-pointer"
    >
      <rect 
        width={width} 
        height={height} 
        rx="4" 
        className={cn(
          "fill-neutral-800 stroke-2", 
          getNodeColor(),
          selected && "stroke-white"
        )}
        strokeWidth={selected ? "2.5" : "1.5"}
      />
      <text 
        x={width / 2} 
        y={height / 2} 
        textAnchor="middle" 
        dominantBaseline="middle"
        className="fill-white text-xs font-medium"
      >
        {title}
      </text>
    </g>
  );
};

interface ConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  animated?: boolean;
}

const Connection: React.FC<ConnectionProps> = ({ 
  x1, 
  y1, 
  x2, 
  y2,
  animated = false
}) => {
  // Calculate control points for curved path
  const midX = (x1 + x2) / 2;
  
  return (
    <path 
      d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`} 
      className={cn(
        "stroke-neutral-500 fill-none", 
        animated && "stroke-dash-array-3-3 animate-dash"
      )}
      strokeWidth="1.5"
      markerEnd="url(#arrowhead)"
    />
  );
};

// Types for node templates in the side panel
interface NodeTemplate {
  type: 'input' | 'process' | 'output' | 'memory' | 'llm';
  title: string;
  description: string;
}

const nodeTemplates: NodeTemplate[] = [
  { type: 'input', title: 'User Input', description: 'Start with user message' },
  { type: 'memory', title: 'Memory', description: 'Access stored information' },
  { type: 'process', title: 'Process', description: 'Transform data' },
  { type: 'llm', title: 'LLM', description: 'Generate AI responses' },
  { type: 'output', title: 'Output', description: 'Return final response' }
];

const WorkflowBuilder: React.FC = () => {
  // State for the workflow nodes and connections
  const [nodes, setNodes] = useState([
    { id: '1', title: 'Slack', type: 'input' as const, x: 100, y: 80 },
    { id: '2', title: 'Memory', type: 'memory' as const, x: 260, y: 80 },
    { id: '3', title: 'Check', type: 'process' as const, x: 420, y: 80 },
    { id: '4', title: 'Collection', type: 'process' as const, x: 260, y: 150 },
    { id: '5', title: 'LLM', type: 'llm' as const, x: 420, y: 220 },
  ]);
  
  const [connections, setConnections] = useState([
    { id: 'e1', from: '1', to: '2', x1: 160, y1: 100, x2: 260, y2: 100 },
    { id: 'e2', from: '2', to: '3', x1: 320, y1: 100, x2: 420, y2: 100 },
    { id: 'e3', from: '3', to: '4', x1: 440, y1: 120, x2: 320, y2: 170 },
    { id: 'e4', from: '4', to: '5', x1: 305, y1: 150, x2: 420, y2: 220 },
  ]);
  
  // State for the selected node
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // State for zoom level
  const [zoom, setZoom] = useState(1);
  
  // State for showing node panel
  const [showNodePanel, setShowNodePanel] = useState(false);
  
  // Handle node selection
  const handleNodeClick = (id: string) => {
    setSelectedNodeId(id === selectedNodeId ? null : id);
  };
  
  // Add a new node
  const addNode = (type: 'input' | 'process' | 'output' | 'memory' | 'llm', title: string) => {
    const newId = `${nodes.length + 1}`;
    const newNode = {
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
  
  // Handle zoom in
  const zoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2));
  };
  
  // Handle zoom out
  const zoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5));
  };
  
  return (
    <div className="rounded-xl bg-neutral-900 p-4 border border-neutral-700 shadow-xl overflow-hidden">
      <div className="relative">
        <svg 
          width="100%" 
          height="300" 
          viewBox="0 0 600 280" 
          className="mx-auto"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
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
            />
          ))}
          
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
        </svg>
      </div>
      
      {/* Toolbar */}
      <div className="flex justify-between items-center mt-4 p-2 bg-neutral-800 rounded-md">
        <div className="flex gap-2">
          <button 
            className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
            onClick={() => setShowNodePanel(true)}
          >
            <Plus className="text-white h-4 w-4" />
          </button>
          <button 
            className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
            onClick={zoomIn}
          >
            <ZoomIn className="text-white h-4 w-4" />
          </button>
          <button 
            className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600"
            onClick={zoomOut}
          >
            <ZoomOut className="text-white h-4 w-4" />
          </button>
        </div>
        <div>
          <button className="px-3 py-1 bg-primary rounded-md text-white text-xs">Run</button>
        </div>
      </div>
      
      {/* Node selection panel (appears when plus button is clicked) */}
      {showNodePanel && (
        <div className="absolute left-4 top-4 bg-neutral-800 p-4 rounded-md shadow-lg w-60 z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white text-sm font-medium">Add Node</h3>
            <button 
              className="text-neutral-400 hover:text-white"
              onClick={() => setShowNodePanel(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {nodeTemplates.map((template, index) => (
              <div 
                key={index}
                className="p-2 bg-neutral-700 rounded-md hover:bg-neutral-600 cursor-pointer"
                onClick={() => addNode(template.type, template.title)}
              >
                <div className="text-white text-sm font-medium">{template.title}</div>
                <div className="text-neutral-400 text-xs">{template.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Node properties panel (appears when a node is selected) */}
      {selectedNodeId && (
        <div className="absolute right-4 top-4 bg-neutral-800 p-4 rounded-md shadow-lg w-60">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white text-sm font-medium">Node Properties</h3>
            <button 
              className="text-neutral-400 hover:text-white"
              onClick={() => setSelectedNodeId(null)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-neutral-400 text-xs mb-1">Title</label>
              <input 
                type="text" 
                className="w-full bg-neutral-700 border border-neutral-600 rounded-md p-1.5 text-white text-sm"
                value={nodes.find(n => n.id === selectedNodeId)?.title || ''}
                onChange={(e) => {
                  setNodes(nodes.map(node => 
                    node.id === selectedNodeId 
                      ? { ...node, title: e.target.value } 
                      : node
                  ));
                }}
              />
            </div>
            <div>
              <label className="block text-neutral-400 text-xs mb-1">Type</label>
              <div className="text-white text-sm">
                {nodes.find(n => n.id === selectedNodeId)?.type}
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              className="w-full mt-2"
              onClick={() => {
                setNodes(nodes.filter(node => node.id !== selectedNodeId));
                setConnections(connections.filter(
                  conn => conn.from !== selectedNodeId && conn.to !== selectedNodeId
                ));
                setSelectedNodeId(null);
              }}
            >
              Delete Node
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;
