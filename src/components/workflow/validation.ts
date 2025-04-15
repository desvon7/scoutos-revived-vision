import { ConnectionObject, NodeObject, DataType, Port } from './types';

export class ConnectionValidator {
  static validateConnection(
    source: NodeObject,
    target: NodeObject,
    sourcePort: string,
    targetPort: string
  ): { isValid: boolean; error?: string } {
    const sourcePortData = source.data.outputs.find(p => p.id === sourcePort);
    const targetPortData = target.data.inputs.find(p => p.id === targetPort);

    if (!sourcePortData) {
      return { isValid: false, error: 'Source port not found' };
    }

    if (!targetPortData) {
      return { isValid: false, error: 'Target port not found' };
    }

    if (!this.areTypesCompatible(sourcePortData.type, targetPortData.type)) {
      return {
        isValid: false,
        error: `Type mismatch: ${sourcePortData.type} cannot be connected to ${targetPortData.type}`,
      };
    }

    return { isValid: true };
  }

  static areTypesCompatible(source: DataType, target: DataType): boolean {
    // Define type compatibility rules
    const compatibilityRules: Record<DataType, DataType[]> = {
      string: ['string', 'json', 'html', 'markdown'],
      number: ['number'],
      boolean: ['boolean'],
      date: ['date', 'string'],
      object: ['object', 'json'],
      array: ['array', 'json'],
      file: ['file'],
      stream: ['stream'],
      json: ['json', 'object', 'array', 'string'],
      html: ['html', 'string'],
      markdown: ['markdown', 'string'],
      vector: ['vector'],
    };

    return compatibilityRules[source]?.includes(target) || false;
  }

  static validateWorkflow(nodes: NodeObject[], connections: ConnectionObject[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for cycles
    if (this.hasCycles(nodes, connections)) {
      errors.push('Workflow contains cycles');
    }

    // Check for disconnected nodes
    const connectedNodeIds = new Set<string>();
    connections.forEach(conn => {
      connectedNodeIds.add(conn.from);
      connectedNodeIds.add(conn.to);
    });

    nodes.forEach(node => {
      if (!connectedNodeIds.has(node.id)) {
        errors.push(`Node ${node.title} is disconnected`);
      }
    });

    // Validate each connection
    connections.forEach(conn => {
      const source = nodes.find(n => n.id === conn.from);
      const target = nodes.find(n => n.id === conn.to);

      if (!source || !target) {
        errors.push(`Connection references non-existent node`);
        return;
      }

      const validation = this.validateConnection(
        source,
        target,
        conn.fromPort,
        conn.toPort
      );

      if (!validation.isValid) {
        errors.push(`Invalid connection: ${validation.error}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private static hasCycles(nodes: NodeObject[], connections: ConnectionObject[]): boolean {
    const graph = new Map<string, string[]>();
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    // Build adjacency list
    nodes.forEach(node => {
      graph.set(node.id, []);
    });

    connections.forEach(conn => {
      graph.get(conn.from)?.push(conn.to);
    });

    // Check for cycles using DFS
    const hasCycle = (nodeId: string): boolean => {
      if (recursionStack.has(nodeId)) {
        return true;
      }

      if (visited.has(nodeId)) {
        return false;
      }

      visited.add(nodeId);
      recursionStack.add(nodeId);

      const neighbors = graph.get(nodeId) || [];
      for (const neighbor of neighbors) {
        if (hasCycle(neighbor)) {
          return true;
        }
      }

      recursionStack.delete(nodeId);
      return false;
    };

    for (const node of nodes) {
      if (hasCycle(node.id)) {
        return true;
      }
    }

    return false;
  }
} 