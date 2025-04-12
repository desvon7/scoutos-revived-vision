
import { useState } from 'react';
import { NodeObject, ConnectionObject, WorkflowData } from '@/components/workflow/types';
import useLocalStorage from './useLocalStorage';

export function useWorkflow() {
  // State for the workflow name
  const [workflowName, setWorkflowName] = useState<string>('Untitled Workflow');
  
  // State for the workflow nodes and connections
  const [nodes, setNodes] = useState<NodeObject[]>([
    { id: '1', title: 'Slack', type: 'input', x: 100, y: 80, data: { inputName: 'slack_message' } },
    { id: '2', title: 'Memory', type: 'memory', x: 260, y: 80, data: { memoryType: 'conversation' } },
    { id: '3', title: 'Check', type: 'process', x: 420, y: 80, data: { processType: 'extract' } },
    { id: '4', title: 'Collection', type: 'process', x: 260, y: 150, data: { collection: 'documentation' } },
    { id: '5', title: 'LLM', type: 'llm', x: 420, y: 220, data: { model: 'gpt-4o', temperature: 0.7 } },
  ]);
  
  const [connections, setConnections] = useState<ConnectionObject[]>([
    { id: 'e1', from: '1', to: '2', x1: 160, y1: 100, x2: 260, y2: 100 },
    { id: 'e2', from: '2', to: '3', x1: 320, y1: 100, x2: 420, y2: 100 },
    { id: 'e3', from: '3', to: '4', x1: 440, y1: 120, x2: 320, y2: 170 },
    { id: 'e4', from: '4', to: '5', x1: 305, y1: 150, x2: 420, y2: 220 },
  ]);

  // localStorage for saved workflows
  const [savedWorkflows, setSavedWorkflows] = useLocalStorage<Record<string, WorkflowData>>('savedWorkflows', {});
  
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
    setCurrentWorkflowName
  };
}
