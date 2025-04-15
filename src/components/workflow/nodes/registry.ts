
import { NodeType, Port } from '../types';
import { defaultPorts } from './defaultPorts';
import { defaultConfigs } from './defaultConfigs';

export function getNodeInputs(type: NodeType): Port[] {
  return defaultPorts[type]?.inputs || [];
}

export function getNodeOutputs(type: NodeType): Port[] {
  return defaultPorts[type]?.outputs || [];
}

export function getNodeConfig(type: NodeType): Record<string, any> {
  return defaultConfigs[type] || {};
}

export function getNodeComponent(type: NodeType): React.ComponentType<any> | null {
  return null;
}
