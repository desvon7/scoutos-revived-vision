import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

import { Node, Connection, Workflow, NodeType, ExecutionState } from '../types/nodes';
import nodeFactory from '../factories/nodeFactory';

interface WorkflowState {
  // Current workflow
  currentWorkflow: Workflow;
  workflows: Workflow[];
  
  // Selection state
  selectedNodeId: string | null;
  selectedConnectionId: string | null;
  
  // Execution state
  executionState: ExecutionState;
  executionLogs: any[];
  
  // History for undo/redo
  history: Workflow[];
  historyIndex: number;
  
  // Actions
  createNewWorkflow: (name: string, description?: string) => void;
  loadWorkflow: (id: string) => void;
  saveWorkflow: () => void;
  deleteWorkflow: (id: string) => void;
  
  // Node management
  createNode: (type: NodeType, position: { x: number, y: number }) => Node;
  addNode: (node: Node) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  removeNode: (id: string) => void;
  
  // Connection management
  addConnection: (connection: Connection) => void;
  removeConnection: (id: string) => void;
  
  // Selection management
  selectNode: (id: string | null) => void;
  selectConnection: (id: string | null) => void;
  
  // Execution
  startExecution: () => void;
  stopExecution: () => void;
  
  // History management
  undo: () => void;
  redo: () => void;
  addToHistory: () => void;
}

// Create initial workflow
const createInitialWorkflow = (): Workflow => ({
  id: uuidv4(),
  name: 'New Workflow',
  description: 'A new workflow',
  nodes: [],
  edges: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  version: '1.0.0',
  tags: []
});

// Create the store
export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentWorkflow: createInitialWorkflow(),
      workflows: [],
      selectedNodeId: null,
      selectedConnectionId: null,
      executionState: ExecutionState.IDLE,
      executionLogs: [],
      history: [createInitialWorkflow()],
      historyIndex: 0,
      
      // Create a new workflow
      createNewWorkflow: (name, description) => {
        const newWorkflow = {
          ...createInitialWorkflow(),
          name,
          description: description || 'A new workflow',
        };
        
        set({
          currentWorkflow: newWorkflow,
          selectedNodeId: null,
          selectedConnectionId: null,
          history: [newWorkflow],
          historyIndex: 0,
        });
      },
      
      // Load a workflow
      loadWorkflow: (id) => {
        const { workflows } = get();
        const workflow = workflows.find(w => w.id === id);
        
        if (workflow) {
          set({
            currentWorkflow: workflow,
            selectedNodeId: null,
            selectedConnectionId: null,
            history: [workflow],
            historyIndex: 0,
          });
        }
      },
      
      // Save current workflow
      saveWorkflow: () => {
        const { currentWorkflow, workflows } = get();
        const updatedWorkflow = {
          ...currentWorkflow,
          updatedAt: new Date()
        };
        
        // Update if exists, otherwise add
        const index = workflows.findIndex(w => w.id === currentWorkflow.id);
        const updatedWorkflows = [...workflows];
        
        if (index >= 0) {
          updatedWorkflows[index] = updatedWorkflow;
        } else {
          updatedWorkflows.push(updatedWorkflow);
        }
        
        set({
          currentWorkflow: updatedWorkflow,
          workflows: updatedWorkflows
        });
      },
      
      // Delete a workflow
      deleteWorkflow: (id) => {
        const { workflows, currentWorkflow } = get();
        const updatedWorkflows = workflows.filter(w => w.id !== id);
        
        set({ workflows: updatedWorkflows });
        
        // If deleted the current workflow, create a new one
        if (currentWorkflow.id === id) {
          get().createNewWorkflow('New Workflow');
        }
      },
      
      // Create a new node
      createNode: (type, position) => {
        return nodeFactory.createNode(type, position);
      },
      
      // Add a node to the workflow
      addNode: (node) => {
        set(state => {
          const updatedWorkflow = {
            ...state.currentWorkflow,
            nodes: [...state.currentWorkflow.nodes, node],
            updatedAt: new Date()
          };
          
          return {
            currentWorkflow: updatedWorkflow,
            selectedNodeId: node.id
          };
        });
        
        get().addToHistory();
      },
      
      // Update a node
      updateNode: (id, updates) => {
        set(state => {
          const nodeIndex = state.currentWorkflow.nodes.findIndex(n => n.id === id);
          if (nodeIndex === -1) return state;
          
          const updatedNodes = [...state.currentWorkflow.nodes];
          updatedNodes[nodeIndex] = {
            ...updatedNodes[nodeIndex],
            ...updates
          };
          
          return {
            currentWorkflow: {
              ...state.currentWorkflow,
              nodes: updatedNodes,
              updatedAt: new Date()
            }
          };
        });
      },
      
      // Remove a node
      removeNode: (id) => {
        set(state => {
          const updatedNodes = state.currentWorkflow.nodes.filter(n => n.id !== id);
          const updatedEdges = state.currentWorkflow.edges.filter(
            e => e.source !== id && e.target !== id
          );
          
          return {
            currentWorkflow: {
              ...state.currentWorkflow,
              nodes: updatedNodes,
              edges: updatedEdges,
              updatedAt: new Date()
            },
            selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
          };
        });
        
        get().addToHistory();
      },
      
      // Add a connection
      addConnection: (connection) => {
        set(state => {
          const updatedWorkflow = {
            ...state.currentWorkflow,
            edges: [...state.currentWorkflow.edges, connection],
            updatedAt: new Date()
          };
          
          return {
            currentWorkflow: updatedWorkflow,
            selectedConnectionId: connection.id
          };
        });
        
        get().addToHistory();
      },
      
      // Remove a connection
      removeConnection: (id) => {
        set(state => {
          const updatedEdges = state.currentWorkflow.edges.filter(e => e.id !== id);
          
          return {
            currentWorkflow: {
              ...state.currentWorkflow,
              edges: updatedEdges,
              updatedAt: new Date()
            },
            selectedConnectionId: state.selectedConnectionId === id ? null : state.selectedConnectionId
          };
        });
        
        get().addToHistory();
      },
      
      // Select a node
      selectNode: (id) => {
        set({ selectedNodeId: id, selectedConnectionId: null });
      },
      
      // Select a connection
      selectConnection: (id) => {
        set({ selectedConnectionId: id, selectedNodeId: null });
      },
      
      // Start workflow execution
      startExecution: () => {
        set({
          executionState: ExecutionState.RUNNING,
          executionLogs: []
        });
        
        // In a real implementation, this would call the workflow engine
        // For now, we'll just simulate execution with a timeout
        setTimeout(() => {
          set({
            executionState: ExecutionState.COMPLETED,
            executionLogs: [...get().executionLogs, {
              level: 'info',
              message: 'Execution completed',
              timestamp: new Date()
            }]
          });
        }, 2000);
      },
      
      // Stop workflow execution
      stopExecution: () => {
        set({
          executionState: ExecutionState.IDLE,
          executionLogs: [...get().executionLogs, {
            level: 'warn',
            message: 'Execution stopped by user',
            timestamp: new Date()
          }]
        });
      },
      
      // Add current state to history
      addToHistory: () => {
        set(state => {
          // Remove any future history if we're not at the end
          const newHistory = state.history.slice(0, state.historyIndex + 1);
          
          // Add current state to history
          newHistory.push({ ...state.currentWorkflow });
          
          return {
            history: newHistory,
            historyIndex: newHistory.length - 1
          };
        });
      },
      
      // Undo
      undo: () => {
        set(state => {
          if (state.historyIndex <= 0) return state;
          
          const newIndex = state.historyIndex - 1;
          const previousWorkflow = state.history[newIndex];
          
          return {
            currentWorkflow: { ...previousWorkflow },
            historyIndex: newIndex
          };
        });
      },
      
      // Redo
      redo: () => {
        set(state => {
          if (state.historyIndex >= state.history.length - 1) return state;
          
          const newIndex = state.historyIndex + 1;
          const nextWorkflow = state.history[newIndex];
          
          return {
            currentWorkflow: { ...nextWorkflow },
            historyIndex: newIndex
          };
        });
      }
    }),
    {
      name: 'workflow-storage',
      partialize: (state) => ({
        workflows: state.workflows,
      }),
    }
  )
);

export default useWorkflowStore; 