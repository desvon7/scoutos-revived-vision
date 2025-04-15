import { DataType } from './nodes';

export interface TypeDefinition {
  id: string;
  name: string;
  description?: string;
  schema: any; // JSON Schema object
  validator?: (value: any) => boolean;
  formatter?: (value: any) => any;
  baseType: DataType;
}

export enum TypeScope {
  PRIMITIVE = 'primitive',
  COMPLEX = 'complex',
  SPECIAL = 'special',
  CUSTOM = 'custom',
}

export class TypeRegistry {
  private types: Map<string, TypeDefinition> = new Map();
  private scopes: Map<TypeScope, Set<string>> = new Map();

  constructor() {
    // Initialize scopes
    Object.values(TypeScope).forEach((scope) => {
      this.scopes.set(scope, new Set());
    });
  }

  registerType(type: TypeDefinition, scope: TypeScope): void {
    this.types.set(type.id, type);
    this.scopes.get(scope)?.add(type.id);
  }

  getType(id: string): TypeDefinition | undefined {
    return this.types.get(id);
  }

  getAllTypes(): TypeDefinition[] {
    return Array.from(this.types.values());
  }

  getTypesByScope(scope: TypeScope): TypeDefinition[] {
    const typeIds = this.scopes.get(scope);
    if (!typeIds) return [];

    return Array.from(typeIds)
      .map((id) => this.types.get(id))
      .filter((type): type is TypeDefinition => type !== undefined);
  }

  validateValue(typeId: string, value: any): boolean {
    const type = this.getType(typeId);
    if (!type) return false;

    // Check if value matches base type
    if (!this.validateBaseType(type.baseType, value)) {
      return false;
    }

    // Run custom validator if provided
    if (type.validator) {
      return type.validator(value);
    }

    // Validate against JSON schema if provided
    if (type.schema) {
      try {
        // TODO: Implement JSON schema validation
        return true;
      } catch (error) {
        return false;
      }
    }

    return true;
  }

  formatValue(typeId: string, value: any): any {
    const type = this.getType(typeId);
    if (!type) return value;

    // Apply custom formatter if provided
    if (type.formatter) {
      return type.formatter(value);
    }

    return value;
  }

  private validateBaseType(baseType: DataType, value: any): boolean {
    switch (baseType) {
      case DataType.STRING:
        return typeof value === 'string';
      case DataType.NUMBER:
        return typeof value === 'number' && !isNaN(value);
      case DataType.BOOLEAN:
        return typeof value === 'boolean';
      case DataType.OBJECT:
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      case DataType.ARRAY:
        return Array.isArray(value);
      case DataType.DATE:
        return value instanceof Date;
      case DataType.JSON:
        try {
          JSON.parse(JSON.stringify(value));
          return true;
        } catch {
          return false;
        }
      case DataType.ANY:
        return true;
      default:
        return false;
    }
  }
}

// Create and export a singleton instance
export const typeRegistry = new TypeRegistry();

// Register default types
typeRegistry.registerType(
  {
    id: 'string',
    name: 'String',
    description: 'A text string',
    schema: { type: 'string' },
    baseType: DataType.STRING,
    validator: (value) => typeof value === 'string',
    formatter: (value) => String(value),
  },
  TypeScope.PRIMITIVE
);

typeRegistry.registerType(
  {
    id: 'number',
    name: 'Number',
    description: 'A numeric value',
    schema: { type: 'number' },
    baseType: DataType.NUMBER,
    validator: (value) => typeof value === 'number' && !isNaN(value),
    formatter: (value) => Number(value),
  },
  TypeScope.PRIMITIVE
);

typeRegistry.registerType(
  {
    id: 'boolean',
    name: 'Boolean',
    description: 'A true/false value',
    schema: { type: 'boolean' },
    baseType: DataType.BOOLEAN,
    validator: (value) => typeof value === 'boolean',
    formatter: (value) => Boolean(value),
  },
  TypeScope.PRIMITIVE
);

typeRegistry.registerType(
  {
    id: 'json',
    name: 'JSON',
    description: 'A JSON object or array',
    schema: { type: 'object' },
    baseType: DataType.JSON,
    validator: (value) => {
      try {
        JSON.parse(JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    formatter: (value) => {
      try {
        return JSON.parse(JSON.stringify(value));
      } catch {
        return value;
      }
    },
  },
  TypeScope.COMPLEX
);

typeRegistry.registerType(
  {
    id: 'date',
    name: 'Date',
    description: 'A date and time value',
    schema: { type: 'string', format: 'date-time' },
    baseType: DataType.DATE,
    validator: (value) => value instanceof Date,
    formatter: (value) => new Date(value),
  },
  TypeScope.SPECIAL
);
