
import { create } from 'zustand';
import { NodeObject, ExecutionState, LogEntry } from './types';

interface WorkflowState {
  nodes: NodeObject[];
  edges: any[];
  selectedNodeId: string | null;
  executionState: ExecutionState;
  executionLogs: LogEntry[];
  
  // Add node action
  addNode: (node: NodeObject) => void;
  // Remove node action 
  removeNode: (id: string) => void;
  // Select node action
  selectNode: (id: string | null) => void;
  // Update node action
  updateNode: (id: string, data: Partial<NodeObject>) => void;
  // Add log entry
  addLogEntry: (log: LogEntry) => void;
  // Clear logs
  clearLogs: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  executionState: ExecutionState.IDLE,
  executionLogs: [],
  
  // Add node
  addNode: (node) => set(state => ({ 
    nodes: [...state.nodes, node] 
  })),
  
  // Remove node
  removeNode: (id) => set(state => ({ 
    nodes: state.nodes.filter(node => node.id !== id),
    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
  })),
  
  // Select node
  selectNode: (id) => set({ selectedNodeId: id }),
  
  // Update node
  updateNode: (id, data) => set(state => ({
    nodes: state.nodes.map(node => 
      node.id === id ? { ...node, ...data } : node
    )
  })),
  
  // Add log entry
  addLogEntry: (log) => set(state => ({
    executionLogs: [...state.executionLogs, log]
  })),
  
  // Clear logs
  clearLogs: () => set({ executionLogs: [] })
}));
