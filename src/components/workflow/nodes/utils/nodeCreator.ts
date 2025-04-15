
import { v4 as uuidv4 } from 'uuid';
import { NodeType, NodeData, NodeObject } from '../../types';
import { defaultPorts } from '../defaultPorts';
import { defaultConfigs } from '../defaultConfigs';
import { getNodeDefaultTitle } from './titles';

export function createNodeData(type: NodeType, data?: Partial<NodeData>): NodeData {
  const defaultConfig = defaultConfigs[type] || {};
  const ports = defaultPorts[type] || { inputs: [], outputs: [] };
  
  return {
    category: data?.category || 'llm',
    type,
    inputs: data?.inputs || ports.inputs,
    outputs: data?.outputs || ports.outputs,
    config: { ...defaultConfig, ...(data?.config || {}) },
    state: 'idle',
    metadata: {
      version: '1.0.0',
      ...(data?.metadata || {}),
    },
  };
}

export function createNode(
  type: NodeType, 
  position: { x: number; y: number }, 
  data?: Partial<NodeData>,
  width: number = 200,
  height: number = 100
): NodeObject {
  return {
    id: uuidv4(),
    type,
    category: data?.category || 'llm',
    title: getNodeDefaultTitle(type),
    x: position.x,
    y: position.y,
    width,
    height,
    selected: false,
    dragging: false,
    zIndex: 1,
    position,
    data: createNodeData(type, data),
  };
}
