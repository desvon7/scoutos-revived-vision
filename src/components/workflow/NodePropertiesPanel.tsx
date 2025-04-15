
import React from 'react';
import { NodeObject, NodeType } from './types';
import { PanelLayout } from './properties/PanelLayout';
import { InputNodeProperties } from './properties/InputNodeProperties';
import { LLMNodeProperties } from './properties/LLMNodeProperties';
import { CollectionNodeProperties } from './properties/CollectionNodeProperties';
import { MemoryNodeProperties } from './properties/MemoryNodeProperties';
import { ProcessNodeProperties } from './properties/ProcessNodeProperties';
import { OutputNodeProperties } from './properties/OutputNodeProperties';
import { DefaultNodeProperties } from './properties/DefaultNodeProperties';

interface NodePropertiesPanelProps {
  node: NodeObject;
  onClose: () => void;
  onPropertyChange: (id: string, data: any) => void;
  onDeleteNode: (id: string) => void;
}

export const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({ 
  node, 
  onClose, 
  onPropertyChange, 
  onDeleteNode 
}) => {
  const handleChange = (name: string, value: any) => {
    if (name === 'title') {
      onPropertyChange(node.id, { title: value });
    } else {
      onPropertyChange(node.id, { [name]: value });
    }
  };
  
  const renderPropertiesComponent = () => {
    switch (node.type) {
      case 'input':
        return (
          <InputNodeProperties 
            data={node.data} 
            title={node.title} 
            onChange={handleChange} 
          />
        );
        
      case 'llm':
        return (
          <LLMNodeProperties 
            data={node.data} 
            title={node.title} 
            onChange={handleChange} 
          />
        );
        
      case 'collection':
        return (
          <CollectionNodeProperties 
            data={node.data} 
            title={node.title} 
            onChange={handleChange} 
          />
        );
        
      case 'memory':
        return (
          <MemoryNodeProperties 
            data={node.data} 
            title={node.title} 
            onChange={handleChange} 
          />
        );
        
      case 'process':
        return (
          <ProcessNodeProperties 
            data={node.data} 
            title={node.title} 
            onChange={handleChange} 
          />
        );
        
      case 'output':
        return (
          <OutputNodeProperties 
            data={node.data} 
            title={node.title} 
            onChange={handleChange} 
          />
        );
        
      default:
        return (
          <DefaultNodeProperties 
            data={node.data} 
            title={node.title} 
            onChange={handleChange} 
          />
        );
    }
  };
  
  return (
    <PanelLayout
      nodeId={node.id}
      nodeType={node.type}
      onClose={onClose}
      onDelete={onDeleteNode}
    >
      {renderPropertiesComponent()}
    </PanelLayout>
  );
};
