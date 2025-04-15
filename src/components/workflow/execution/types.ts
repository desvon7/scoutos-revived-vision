
import { NodeObject } from '../types';

export interface NodeExecution {
  execute: (input: any) => Promise<any>;
}

export interface ExecutionContext {
  nodeStates: Map<string, any>;
  variables: Map<string, any>;
  outputs: Map<string, any>;
  logs: any[];
}

export interface ExecutionOptions {
  timeout?: number;
  variables?: Record<string, any>;
  onNodeStart?: (nodeId: string) => void;
  onNodeComplete?: (nodeId: string, output: any) => void;
  onNodeError?: (nodeId: string, error: Error) => void;
}
