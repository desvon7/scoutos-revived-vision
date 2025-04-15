import { NodeObject, ConnectionObject, Port, DataType, ValidationResult } from './types';

export class ConnectionValidator {
  private nodes: NodeObject[];
  private connections: ConnectionObject[];

  constructor(nodes: NodeObject[], connections: ConnectionObject[]) {
    this.nodes = nodes;
    this.connections = connections;
  }

  validate(): ValidationResult {
    const errors: string[] = [];

    // Check for duplicate connections
    const connectionSet = new Set<string>();
    this.connections.forEach((conn) => {
      const key = `${conn.from}-${conn.to}-${conn.fromPort}-${conn.toPort}`;
      if (connectionSet.has(key)) {
        errors.push(`Duplicate connection from ${conn.from} to ${conn.to}`);
      }
      connectionSet.add(key);
    });

    // Check for valid node references
    this.connections.forEach((conn) => {
      const fromNode = this.nodes.find((n) => n.id === conn.from);
      const toNode = this.nodes.find((n) => n.id === conn.to);

      if (!fromNode) {
        errors.push(`Source node ${conn.from} not found`);
      }
      if (!toNode) {
        errors.push(`Target node ${conn.to} not found`);
      }
    });

    // Check for cycles
    if (this.hasCycles()) {
      errors.push('Workflow contains cycles');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private hasCycles(): boolean {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const adjacencyList = this.buildAdjacencyList();

    for (const node of this.nodes) {
      if (!visited.has(node.id)) {
        if (this.detectCycle(node.id, visited, recursionStack, adjacencyList)) {
          return true;
        }
      }
    }

    return false;
  }

  private buildAdjacencyList(): Map<string, string[]> {
    const adjacencyList = new Map<string, string[]>();

    this.nodes.forEach((node) => {
      adjacencyList.set(node.id, []);
    });

    this.connections.forEach((conn) => {
      const neighbors = adjacencyList.get(conn.from) || [];
      neighbors.push(conn.to);
      adjacencyList.set(conn.from, neighbors);
    });

    return adjacencyList;
  }

  private detectCycle(
    nodeId: string,
    visited: Set<string>,
    recursionStack: Set<string>,
    adjacencyList: Map<string, string[]>
  ): boolean {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (this.detectCycle(neighbor, visited, recursionStack, adjacencyList)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  }

  validateConnection(
    fromNode: NodeObject,
    toNode: NodeObject,
    fromPort: Port,
    toPort: Port
  ): boolean {
    // Check if types are compatible
    if (!this.areTypesCompatible(fromPort.type, toPort.type)) {
      return false;
    }

    // Check if nodes are already connected
    const existingConnection = this.connections.find(
      (conn) => conn.from === fromNode.id && conn.to === toNode.id
    );
    if (existingConnection) {
      return false;
    }

    return true;
  }

  private areTypesCompatible(fromType: DataType, toType: DataType): boolean {
    if (fromType === 'any' || toType === 'any') {
      return true;
    }

    if (fromType === toType) {
      return true;
    }

    // Allow string to be converted to number if it's a valid number
    if (fromType === 'string' && toType === 'number') {
      return true;
    }

    // Allow number to be converted to string
    if (fromType === 'number' && toType === 'string') {
      return true;
    }

    // Allow boolean to be converted to string
    if (fromType === 'boolean' && toType === 'string') {
      return true;
    }

    return false;
  }
}
