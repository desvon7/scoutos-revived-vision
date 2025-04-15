import { create } from 'zustand';
import { NodeObject, ConnectionObject, NodeData } from './types';

interface WorkflowState {
  nodes: NodeObject[];
  connections: ConnectionObject[];
  selectedNodeId: string | null;
  addNode: (node: NodeObject) => void;
  updateNode: (id: string, updates: Partial<NodeObject>) => void;
  deleteNode: (id: string) => void;
  addConnection: (connection: ConnectionObject) => void;
  deleteConnection: (id: string) => void;
  setSelectedNode: (id: string | null) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  connections: [],
  selectedNodeId: null,

  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),

  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, ...updates } : node
    )
  })),

  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    connections: state.connections.filter(
      (conn) => conn.from !== id && conn.to !== id
    )
  })),

  addConnection: (connection) => set((state) => ({
    connections: [...state.connections, connection]
  })),

  deleteConnection: (id) => set((state) => ({
    connections: state.connections.filter((conn) => conn.id !== id)
  })),

  setSelectedNode: (id) => set({
    selectedNodeId: id
  })
})); 