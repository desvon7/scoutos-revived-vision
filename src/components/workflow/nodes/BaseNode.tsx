import React, { useState, useRef } from 'react';
import { NodeProps, NodeData, Port } from '../types';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const BaseNode: React.FC<NodeProps> = ({
  id,
  type,
  category,
  title,
  x,
  y,
  data,
  isSelected,
  width = 200,
  height = 100,
  onUpdate,
  onClick,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDelete,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    onDragStart(e);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (isDragging) {
      onDragMove(e);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };

  const handleUpdate = (updates: Partial<NodeData>) => {
    onUpdate(updates);
  };

  const renderPorts = (ports: Port[], type: 'input' | 'output') => {
    return ports.map((port) => (
      <div
        key={port.id}
        className={cn(
          'port',
          `port-${type}`,
          `port-${port.type}`,
          port.required && 'port-required'
        )}
        data-port-id={port.id}
        data-port-type={port.type}
        title={port.description}
      >
        <div className="port-handle" />
        <span className="port-label">{port.name}</span>
      </div>
    ));
  };

  const getNodeColor = () => {
    const colors = {
      input: 'bg-blue-500',
      llm: 'bg-purple-500',
      collection: 'bg-green-500',
      'text-processing': 'bg-yellow-500',
      logic: 'bg-red-500',
      integration: 'bg-indigo-500',
      'data-transformation': 'bg-pink-500',
      code: 'bg-orange-500',
      search: 'bg-teal-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <motion.div
      ref={nodeRef}
      className={cn(
        'node',
        getNodeColor(),
        isSelected && 'node-selected',
        isDragging && 'node-dragging'
      )}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        zIndex: isSelected ? 10 : 1,
      }}
      onClick={onClick}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="node-header">
        <div className="node-title">{title}</div>
        <div className="node-actions">
          <button
            className="node-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            ×
          </button>
        </div>
      </div>

      <div className="node-content">
        <div className="node-inputs">{renderPorts(data.inputs, 'input')}</div>
        <div className="node-body">
          {/* Node-specific content will be rendered here by child components */}
        </div>
        <div className="node-outputs">{renderPorts(data.outputs, 'output')}</div>
      </div>

      <div className="node-footer">
        <div className="node-status">{data.state}</div>
        {data.error && <div className="node-error">{data.error}</div>}
      </div>
    </motion.div>
  );
}; 