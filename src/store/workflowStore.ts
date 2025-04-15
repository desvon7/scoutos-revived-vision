import { create } from 'zustand';
import { NodeObject, ExecutionState, LogEntry, NodeType } from '../components/workflow/types';

interface WorkflowState {
  nodes: NodeObject[];
  edges: any[];
  selectedNodeId: string | null;
  executionState: ExecutionState;
  executionLogs: LogEntry[];
  nodeTemplates: Array<{
    type: NodeType;
    name: string;
    description: string;
    category: string;
    icon?: string;
  }>;

  addNode: (node: NodeObject) => void;
  removeNode: (id: string) => void;
  selectNode: (id: string | null) => void;
  updateNode: (id: string, data: Partial<NodeObject>) => void;
  addLogEntry: (log: LogEntry) => void;
  clearLogs: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  executionState: ExecutionState.IDLE,
  executionLogs: [],
  nodeTemplates: Object.values(NodeType).map((type) => ({
    type,
    name: type.toLowerCase().replace(/_/g, ' '),
    description: `${type.toLowerCase().replace(/_/g, ' ')} node`,
    category: getNodeCategory(type),
    icon: 'default',
  })),

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    })),

  selectNode: (id) => set({ selectedNodeId: id }),

  updateNode: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) => (node.id === id ? { ...node, ...data } : node)),
    })),

  addLogEntry: (log) =>
    set((state) => ({
      executionLogs: [...state.executionLogs, log],
    })),

  clearLogs: () => set({ executionLogs: [] }),
}));

function getNodeCategory(type: NodeType): string {
  if (type.includes('INPUT')) return 'input';
  if (type.includes('GPT') || type.includes('CLAUDE')) return 'llm';
  if (type.includes('TEXT') || type.includes('JSON')) return 'text_processing';
  if (type.includes('CONDITION') || type.includes('LOOP')) return 'logic';
  if (type.includes('API') || type.includes('WEBHOOK')) return 'integration';
  if (type.includes('JAVASCRIPT') || type.includes('PYTHON')) return 'code';
  return 'output';
}

export default useWorkflowStore;
