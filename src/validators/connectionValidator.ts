import { Connection, Node, DataType } from '../types/nodes';

export class ConnectionValidator {
  static validateConnection(sourceNode: Node, targetNode: Node, connection: Connection): boolean {
    const sourcePort = sourceNode.data.outputs.find(p => p.id === connection.sourceHandle);
    const targetPort = targetNode.data.inputs.find(p => p.id === connection.targetHandle);

    if (!sourcePort || !targetPort) {
      return false;
    }

    return this.areTypesCompatible(sourcePort.dataType, targetPort.dataType);
  }

  private static areTypesCompatible(sourceType: DataType, targetType: DataType): boolean {
    // Any type can be connected to any type
    if (sourceType === DataType.ANY || targetType === DataType.ANY) {
      return true;
    }

    // Same types are always compatible
    if (sourceType === targetType) {
      return true;
    }

    // Special compatibility rules
    switch (sourceType) {
      case DataType.STRING:
        return [DataType.HTML, DataType.MARKDOWN, DataType.JSON].includes(targetType);
      case DataType.OBJECT:
        return [DataType.JSON].includes(targetType);
      case DataType.ARRAY:
        return [DataType.VECTOR].includes(targetType);
      case DataType.JSON:
        return [DataType.OBJECT, DataType.ARRAY].includes(targetType);
      default:
        return false;
    }
  }

  static validateWorkflowConnections(nodes: Node[], connections: Connection[]): boolean {
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    
    return connections.every(connection => {
      const sourceNode = nodeMap.get(connection.source);
      const targetNode = nodeMap.get(connection.target);
      
      if (!sourceNode || !targetNode) {
        return false;
      }

      return this.validateConnection(sourceNode, targetNode, connection);
    });
  }
} 