import { Node, NodeType, Port, NodeData, ValidationResult } from '../types/nodes';

export class NodeValidator {
  static validateNode(node: Node): ValidationResult {
    const errors: string[] = [];

    // Validate required properties
    if (!node.id) errors.push('Node must have an id');
    if (!node.type) errors.push('Node must have a type');
    if (!node.data) errors.push('Node must have data');
    if (!node.position) errors.push('Node must have a position');

    // Validate data
    if (node.data) {
      const dataErrors = this.validateNodeData(node.data);
      errors.push(...dataErrors);
    }

    // Validate type-specific properties
    const typeErrors = this.validateNodeType(node);
    errors.push(...typeErrors);

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static validateNodeData(data: NodeData): string[] {
    const errors: string[] = [];

    // Validate inputs
    if (!data.inputs) errors.push('Node data must have inputs');
    else {
      data.inputs.forEach((port, index) => {
        const portErrors = this.validatePort(port, `input[${index}]`);
        errors.push(...portErrors);
      });
    }

    // Validate outputs
    if (!data.outputs) errors.push('Node data must have outputs');
    else {
      data.outputs.forEach((port, index) => {
        const portErrors = this.validatePort(port, `output[${index}]`);
        errors.push(...portErrors);
      });
    }

    return errors;
  }

  private static validatePort(port: Port, context: string): string[] {
    const errors: string[] = [];

    if (!port.id) errors.push(`${context} must have an id`);
    if (!port.name) errors.push(`${context} must have a name`);
    if (!port.dataType) errors.push(`${context} must have a dataType`);

    return errors;
  }

  private static validateNodeType(node: Node): string[] {
    const errors: string[] = [];

    switch (node.type) {
      case NodeType.TEXT_INPUT:
        if (!node.data.configuration?.text) {
          errors.push('Text input node must have text configuration');
        }
        break;

      case NodeType.GPT_4:
        if (!node.data.configuration?.prompt) {
          errors.push('GPT-4 node must have prompt configuration');
        }
        break;

      case NodeType.API:
        if (!node.data.configuration?.url) {
          errors.push('API node must have URL configuration');
        }
        break;

      case NodeType.CONDITION:
        if (!node.data.configuration?.condition) {
          errors.push('Condition node must have condition configuration');
        }
        break;

      case NodeType.TRANSFORM:
        if (!node.data.configuration?.transform) {
          errors.push('Transform node must have transform configuration');
        }
        break;

      case NodeType.OUTPUT:
        if (!node.data.configuration?.format) {
          errors.push('Output node must have format configuration');
        }
        break;

      case NodeType.LOOP:
        if (!node.data.configuration?.iterations) {
          errors.push('Loop node must have iterations configuration');
        }
        break;

      case NodeType.DATA:
        if (!node.data.configuration?.source) {
          errors.push('Data node must have source configuration');
        }
        break;
    }

    return errors;
  }

  private static validateNodeConfiguration(node: Node): boolean {
    switch (node.type) {
      case NodeType.TEXT_INPUT:
        return this.validateTextInput(node);
      case NodeType.GPT_4:
        return this.validateGPT4(node);
      case NodeType.API:
        return this.validateAPI(node);
      case NodeType.CONDITION:
        return this.validateCondition(node);
      case NodeType.LOOP:
        return this.validateLoop(node);
      case NodeType.TRANSFORM:
        return this.validateTransform(node);
      case NodeType.DATA:
        return this.validateData(node);
      default:
        return true; // Unknown node types are considered valid
    }
  }

  private static validateTextInput(node: Node): boolean {
    return typeof node.data.config?.text === 'string';
  }

  private static validateGPT4(node: Node): boolean {
    const config = node.data.config;
    return config && 
           typeof config.model === 'string' &&
           typeof config.temperature === 'number' &&
           config.temperature >= 0 && 
           config.temperature <= 2;
  }

  private static validateAPI(node: Node): boolean {
    const config = node.data.config;
    return config && 
           typeof config.url === 'string' &&
           typeof config.method === 'string' &&
           ['GET', 'POST', 'PUT', 'DELETE'].includes(config.method);
  }

  private static validateCondition(node: Node): boolean {
    const config = node.data.config;
    return config && 
           typeof config.condition === 'string' &&
           node.data.outputs.length === 2; // True and False outputs
  }

  private static validateLoop(node: Node): boolean {
    const config = node.data.config;
    return config && 
           typeof config.iterations === 'number' &&
           config.iterations > 0;
  }

  private static validateTransform(node: Node): boolean {
    const config = node.data.config;
    return config && 
           typeof config.transform === 'string';
  }

  private static validateData(node: Node): boolean {
    const config = node.data.config;
    return config && 
           typeof config.data !== 'undefined';
  }
} 