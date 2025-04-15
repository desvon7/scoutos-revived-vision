
import { create } from 'zustand';
import { NodeObject, ExecutionState, LogEntry } from './types';

interface WorkflowState {
  nodes: NodeObject[];
  edges: any[];
  selectedNodeId: string | null;
  executionState: ExecutionState;
  executionLogs: LogEntry[];
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  executionState: ExecutionState.IDLE,
  executionLogs: []
}));
