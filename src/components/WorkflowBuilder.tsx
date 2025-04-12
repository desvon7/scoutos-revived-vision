
import React from 'react';
import { cn } from '@/lib/utils';

interface NodeProps {
  title: string;
  type: 'input' | 'process' | 'output' | 'memory' | 'llm';
  x: number;
  y: number;
  width?: number;
  height?: number;
}

const Node: React.FC<NodeProps> = ({ 
  title, 
  type, 
  x, 
  y, 
  width = 120, 
  height = 40 
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
    <g transform={`translate(${x}, ${y})`}>
      <rect 
        width={width} 
        height={height} 
        rx="4" 
        className={cn("fill-neutral-800 stroke-2", getNodeColor())}
        strokeWidth="1.5"
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

const WorkflowBuilder: React.FC = () => {
  return (
    <div className="rounded-xl bg-neutral-900 p-4 border border-neutral-700 shadow-xl overflow-hidden">
      <div className="relative">
        <svg width="100%" height="300" viewBox="0 0 600 280" className="mx-auto">
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
          <Node title="Slack" type="input" x={100} y={80} />
          <Node title="Memory" type="memory" x={260} y={80} />
          <Node title="Check" type="process" x={420} y={80} />
          <Node title="Collection" type="process" x={260} y={150} />
          <Node title="LLM" type="llm" x={420} y={220} />
          
          {/* Connections */}
          <Connection x1={160} y1={100} x2={260} y2={100} />
          <Connection x1={320} y1={100} x2={420} y2={100} />
          <Connection x1={440} y1={120} x2={320} y2={170} />
          <Connection x1={305} y1={150} x2={420} y2={220} />
        </svg>
      </div>
      
      {/* Toolbar */}
      <div className="flex justify-between items-center mt-4 p-2 bg-neutral-800 rounded-md">
        <div className="flex gap-2">
          <button className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
          <button className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
          <button className="p-1.5 bg-neutral-700 rounded-md hover:bg-neutral-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        </div>
        <div>
          <button className="px-3 py-1 bg-primary rounded-md text-white text-xs">Run</button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
