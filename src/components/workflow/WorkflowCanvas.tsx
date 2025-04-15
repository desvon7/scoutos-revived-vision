
import React, { useCallback, useState } from 'react';
import { WorkflowCanvasProps } from './types';
import { useWorkflowStore } from './store';

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ 
  nodes, 
  connections, 
  onNodeClick 
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  
  // Handle node click
  const handleNodeClick = useCallback((id: string) => {
    setSelectedNodeId(id);
    onNodeClick(id);
  }, [onNodeClick]);
  
  // Start dragging a node
  const handleDragStart = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDraggedNodeId(id);
    const node = nodes.find(node => node.id === id);
    if (node) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [nodes]);
  
  // Handle drag move
  const handleDragMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    // Handle panning
    if (isPanning) {
      setPan(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
      return;
    }
    
    // Handle node dragging
    if (draggedNodeId) {
      const { updateNode } = useWorkflowStore.getState();
      const node = nodes.find(node => node.id === draggedNodeId);
      
      if (node) {
        const x = (e.clientX - dragOffset.x) / scale - pan.x;
        const y = (e.clientY - dragOffset.y) / scale - pan.y;
        
        updateNode(draggedNodeId, {
          x,
          y,
          position: { x, y }
        });
      }
    }
  }, [draggedNodeId, dragOffset, scale, pan, isPanning, nodes]);
  
  // End dragging
  const handleDragEnd = useCallback(() => {
    setDraggedNodeId(null);
  }, []);
  
  // Start panning
  const handlePanStart = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || e.button === 2 || (e.button === 0 && e.altKey)) {
      e.preventDefault();
      setIsPanning(true);
    }
  }, []);
  
  // End panning
  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);
  
  // Handle zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    // Calculate new scale
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    const newScale = Math.min(Math.max(scale + delta, 0.1), 2);
    
    // Calculate zoom origin (mouse position)
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate new pan to zoom into/out of mouse position
    const newPan = {
      x: pan.x - (mouseX / scale - mouseX / newScale),
      y: pan.y - (mouseY / scale - mouseY / newScale)
    };
    
    setScale(newScale);
    setPan(newPan);
  }, [scale, pan]);
  
  return (
    <div
      className="workflow-canvas w-full h-full overflow-hidden bg-gray-900"
      onMouseDown={handlePanStart}
      onMouseMove={handleDragMove}
      onMouseUp={handlePanEnd}
      onWheel={handleWheel}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Render grid */}
      <div
        className="grid absolute"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: `${20 * scale}px ${20 * scale}px`,
          width: '10000px',
          height: '10000px',
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
      />
      
      {/* Render connections */}
      <svg
        className="connections-layer absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
      >
        {connections.map(connection => {
          const source = nodes.find(node => node.id === connection.source);
          const target = nodes.find(node => node.id === connection.target);
          
          if (!source || !target) return null;
          
          const sourceX = source.x + source.width! / 2;
          const sourceY = source.y + source.height! / 2;
          const targetX = target.x + target.width! / 2;
          const targetY = target.y + target.height! / 2;
          
          // Calculate control points for bezier curve
          const dx = Math.abs(targetX - sourceX);
          const controlX = Math.min(dx * 0.5, 150);
          
          const path = `M ${sourceX} ${sourceY} C ${sourceX + controlX} ${sourceY}, ${targetX - controlX} ${targetY}, ${targetX} ${targetY}`;
          
          return (
            <path
              key={connection.id}
              d={path}
              stroke="rgba(100, 149, 237, 0.7)"
              strokeWidth={2}
              fill="none"
              strokeDasharray={connection.animated ? "5,5" : undefined}
            />
          );
        })}
      </svg>
      
      {/* Render nodes */}
      <div
        className="nodes-layer"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
      >
        {nodes.map(node => (
          <div
            key={node.id}
            className={`absolute rounded-md p-3 ${selectedNodeId === node.id ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              left: node.x,
              top: node.y,
              width: node.width || 200,
              backgroundColor: node.category === 'input' ? '#4CAF50' :
                              node.category === 'llm' ? '#10A37F' :
                              node.category === 'logic' ? '#2196F3' :
                              node.category === 'code' ? '#F7DF1E' :
                              '#607D8B',
              cursor: draggedNodeId === node.id ? 'grabbing' : 'grab',
              zIndex: draggedNodeId === node.id ? 1000 : 1
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(node.id);
            }}
            onMouseDown={(e) => handleDragStart(e, node.id)}
          >
            <div className="text-white font-medium mb-1">{node.data.label || node.title}</div>
            <div className="text-sm text-white opacity-80">{node.type}</div>
          </div>
        ))}
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          className="bg-gray-800 text-white p-2 rounded shadow hover:bg-gray-700"
          onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}
        >
          +
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded shadow hover:bg-gray-700"
          onClick={() => setScale(prev => Math.max(prev - 0.1, 0.1))}
        >
          -
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded shadow hover:bg-gray-700"
          onClick={() => {
            setScale(1);
            setPan({ x: 0, y: 0 });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
