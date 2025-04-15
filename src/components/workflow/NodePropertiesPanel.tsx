import React from 'react';
import { NodeObject, NodeType, Port } from '@/components/workflow/types';
import { PanelLayout } from './properties/PanelLayout';
import { InputNodeProperties } from './properties/InputNodeProperties';
import { LLMNodeProperties } from './properties/LLMNodeProperties';
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
  onDeleteNode,
}) => {
  const renderPropertiesComponent = () => {
    const type = node.type as NodeType;

    if ([NodeType.TEXT_INPUT, NodeType.URL_INPUT, NodeType.JSON_INPUT].includes(type)) {
      return (
        <InputNodeProperties
          data={node.data}
          onChange={(updates) => onPropertyChange(node.id, updates)}
        />
      );
    }

    if (
      [
        NodeType.GPT_4,
        NodeType.GPT_35_TURBO,
        NodeType.CLAUDE_3_OPUS,
        NodeType.CLAUDE_3_SONNET,
      ].includes(type)
    ) {
      return (
        <LLMNodeProperties
          data={node.data}
          onChange={(updates) => onPropertyChange(node.id, updates)}
        />
      );
    }

    return (
      <DefaultNodeProperties
        data={node.data}
        onChange={(updates) => onPropertyChange(node.id, updates)}
      />
    );
  };

  return (
    <PanelLayout nodeId={node.id} nodeType={node.type} onClose={onClose} onDelete={onDeleteNode}>
      {renderPropertiesComponent()}
    </PanelLayout>
  );
};
