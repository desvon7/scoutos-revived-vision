import { useState } from 'react';
import { NodeObject, ConnectionObject, WorkflowData, NodeType } from '@/components/workflow/types';
import useLocalStorage from './useLocalStorage';

export function useWorkflow() {
  // State for the workflow name
  const [workflowName, setWorkflowName] = useState<string>('Untitled Workflow');

  // State for the workflow nodes and connections
  const [nodes, setNodes] = useState<NodeObject[]>([
    {
      id: '1',
      title: 'Slack',
      type: 'input' as NodeType,
      x: 100,
      y: 80,
      data: { inputName: 'slack_message' },
    },
    {
      id: '2',
      title: 'Memory',
      type: 'memory' as NodeType,
      x: 260,
      y: 80,
      data: { memoryType: 'conversation' },
    },
    {
      id: '3',
      title: 'Check',
      type: 'process' as NodeType,
      x: 420,
      y: 80,
      data: { processType: 'extract' },
    },
    {
      id: '4',
      title: 'Collection',
      type: 'collection' as NodeType,
      x: 260,
      y: 150,
      data: { collection: 'documentation' },
    },
    {
      id: '5',
      title: 'LLM',
      type: 'llm' as NodeType,
      x: 420,
      y: 220,
      data: { model: 'gpt-4o', temperature: 0.7 },
    },
  ]);

  const [connections, setConnections] = useState<ConnectionObject[]>([
    { id: 'e1', from: '1', to: '2' },
    { id: 'e2', from: '2', to: '3' },
    { id: 'e3', from: '3', to: '4' },
    { id: 'e4', from: '4', to: '5' },
  ]);

  // localStorage for saved workflows
  const [savedWorkflows, setSavedWorkflows] = useLocalStorage<Record<string, WorkflowData>>(
    'savedWorkflows',
    {}
  );

  // State for the selected node
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // State for current workflow name
  const [currentWorkflowName, setCurrentWorkflowName] = useState<string>('Untitled Workflow');

  return {
    workflowName,
    setWorkflowName,
    nodes,
    setNodes,
    connections,
    setConnections,
    savedWorkflows,
    setSavedWorkflows,
    selectedNodeId,
    setSelectedNodeId,
    currentWorkflowName,
    setCurrentWorkflowName,
  };
}
