import { create } from 'zustand';
import { NodeObject, ConnectionObject, WorkflowData } from './types';

interface WorkflowState {
  workflow: WorkflowData;
  selectedNode: string | null;
  selectedConnection: string | null;
  history: WorkflowData[];
  historyIndex: number;
  
  // Node and connection management
  updateNodes: (nodes: NodeObject[]) => void;
  updateEdges: (edges: ConnectionObject[]) => void;
  addNode: (node: NodeObject) => void;
  updateNode: (id: string, updates: Partial<NodeObject>) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  removeNode: (nodeId: string) => void;
  addConnection: (connection: ConnectionObject) => void;
  removeConnection: (id: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setSelectedConnection: (id: string | null) => void;
  
  // Workflow operations
  saveWorkflow: () => void;
  exportWorkflow: () => string;
  importWorkflow: (data: string) => void;
  
  // History operations
  undo: () => void;
  redo: () => void;
  addToHistory: () => void;
}

const useWorkflowStore = create<WorkflowState>((set, get) => ({
  workflow: {
    id: 'default',
    name: 'Untitled Workflow',
    version: '1.0.0',
    nodes: [],
    connections: [],
    metadata: {
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
  },
  selectedNode: null,
  selectedConnection: null,
  history: [{
    id: 'default',
    name: 'Untitled Workflow',
    version: '1.0.0',
    nodes: [],
    connections: [],
    metadata: {
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
  }],
  historyIndex: 0,
  
  updateNodes: (nodes) => set((state) => ({
    workflow: {
      ...state.workflow,
      nodes,
      metadata: {
        ...state.workflow.metadata,
        modified: new Date().toISOString(),
      },
    },
  })),
  
  updateEdges: (connections) => set((state) => ({
    workflow: {
      ...state.workflow,
      connections,
      metadata: {
        ...state.workflow.metadata,
        modified: new Date().toISOString(),
      },
    },
  })),
  
  addNode: (node) => set((state) => ({
    workflow: {
      ...state.workflow,
      nodes: [...state.workflow.nodes, node],
      metadata: {
        ...state.workflow.metadata,
        modified: new Date().toISOString(),
      },
    },
  })),
  
  updateNode: (id, updates) => set((state) => {
    const nodeIndex = state.workflow.nodes.findIndex((node) => node.id === id);
    if (nodeIndex === -1) return state;
    
    const updatedNodes = [...state.workflow.nodes];
    updatedNodes[nodeIndex] = {
      ...updatedNodes[nodeIndex],
      ...updates,
    };
    
    return {
      workflow: {
        ...state.workflow,
        nodes: updatedNodes,
        metadata: {
          ...state.workflow.metadata,
          modified: new Date().toISOString(),
        },
      },
    };
  }),
  
  updateNodeData: (nodeId, data) => set((state) => ({
    workflow: {
      ...state.workflow,
      nodes: state.workflow.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
      metadata: {
        ...state.workflow.metadata,
        modified: new Date().toISOString(),
      },
    },
  })),
  
  removeNode: (nodeId) => set((state) => ({
    workflow: {
      ...state.workflow,
      nodes: state.workflow.nodes.filter((node) => node.id !== nodeId),
      connections: state.workflow.connections.filter(
        (conn) => conn.from !== nodeId && conn.to !== nodeId
      ),
      metadata: {
        ...state.workflow.metadata,
        modified: new Date().toISOString(),
      },
    },
  })),
  
  addConnection: (connection) => set((state) => ({
    workflow: {
      ...state.workflow,
      connections: [...state.workflow.connections, connection],
      metadata: {
        ...state.workflow.metadata,
        modified: new Date().toISOString(),
      },
    },
  })),
  
  removeConnection: (id) => set((state) => ({
    workflow: {
      ...state.workflow,
      connections: state.workflow.connections.filter((conn) => conn.id !== id),
      metadata: {
        ...state.workflow.metadata,
        modified: new Date().toISOString(),
      },
    },
  })),
  
  setSelectedNode: (nodeId) => set({ selectedNode: nodeId }),
  
  setSelectedConnection: (id) => set({ selectedConnection: id }),
  
  saveWorkflow: () => {
    // This would typically save to a backend
    console.log('Saving workflow:', get().workflow);
    
    // For now, we'll save to localStorage
    try {
      localStorage.setItem(`workflow-${get().workflow.id}`, JSON.stringify(get().workflow));
    } catch (error) {
      console.error('Error saving workflow to localStorage:', error);
    }
  },
  
  exportWorkflow: () => {
    return JSON.stringify(get().workflow, null, 2);
  },
  
  importWorkflow: (data) => {
    try {
      const workflow = JSON.parse(data) as WorkflowData;
      
      // Validate the imported workflow
      if (!workflow.id || !workflow.nodes || !workflow.connections) {
        throw new Error('Invalid workflow data');
      }
      
      set({
        workflow,
        selectedNode: null,
        selectedConnection: null,
        history: [workflow],
        historyIndex: 0,
      });
    } catch (error) {
      console.error('Error importing workflow:', error);
      throw error;
    }
  },
  
  addToHistory: () => {
    set((state) => {
      // Remove any future history if we're not at the end
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      
      // Add current state to history
      newHistory.push({ ...state.workflow });
      
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },
  
  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state;
      
      const newIndex = state.historyIndex - 1;
      const previousWorkflow = state.history[newIndex];
      
      return {
        workflow: { ...previousWorkflow },
        historyIndex: newIndex,
      };
    });
  },
  
  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      
      const newIndex = state.historyIndex + 1;
      const nextWorkflow = state.history[newIndex];
      
      return {
        workflow: { ...nextWorkflow },
        historyIndex: newIndex,
      };
    });
  },
}));

export { useWorkflowStore }; 