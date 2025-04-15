
import React from 'react';
import { NodeProps } from './types';
import { cn } from '@/lib/utils';

export const Node: React.FC<NodeProps> = ({
  id,
  type,
  title,
  category,
  x,
  y,
  data,
  isSelected,
  onClick,
  onDragStart,
  onDragMove,
  onDragEnd,
  onUpdate,
  onDelete
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDragStart(e);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      onDragMove(e as unknown as React.MouseEvent);
    };

    const handleMouseUp = () => {
      onDragEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onDragMove, onDragEnd]);

  return (
    <div
      className={cn(
        'absolute rounded-lg border p-4 shadow-lg transition-all',
        isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-neutral-700',
        'bg-neutral-900 hover:border-blue-400'
      )}
      style={{
        left: x,
        top: y,
        width: '200px',
        cursor: 'move'
      }}
      onClick={onClick}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium text-neutral-200">{title}</div>
      </div>
      <div className="mt-2 text-xs text-neutral-400">
        {data.type}
      </div>
      
      <div className="flex justify-end mt-4">
        <button 
          className="text-xs text-red-400 hover:text-red-300" 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
