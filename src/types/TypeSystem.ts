export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
  NULL = 'null',
  DATE = 'date',
  ANY = 'any',
  JSON = 'json',
  HTML = 'html',
  MARKDOWN = 'markdown',
  VECTOR = 'vector',
  FILE = 'file',
  STREAM = 'stream',
  FUNCTION = 'function',
  PROMISE = 'promise'
}

export interface TypeDefinition {
  id: string;
  name: string;
  dataType: DataType;
  description?: string;
  validator?: (value: any) => boolean;
  formatter?: (value: any) => any;
  schema?: Record<string, any>; // JSON Schema for complex types
  color: string; // Color for visual representation
}

export class TypeRegistry {
  private static instance: TypeRegistry;
  private types: Map<string, TypeDefinition> = new Map();
  
  private constructor() {
    this.registerDefaultTypes();
  }
  
  public static getInstance(): TypeRegistry {
    if (!TypeRegistry.instance) {
      TypeRegistry.instance = new TypeRegistry();
    }
    return TypeRegistry.instance;
  }
  
  private registerDefaultTypes(): void {
    // Register primitive types
    this.registerType({
      id: DataType.STRING,
      name: 'String',
      dataType: DataType.STRING,
      description: 'A text string',
      validator: (value) => typeof value === 'string',
      color: '#4CAF50'
    });
    
    this.registerType({
      id: DataType.NUMBER,
      name: 'Number',
      dataType: DataType.NUMBER,
      description: 'A numeric value',
      validator: (value) => typeof value === 'number' && !isNaN(value),
      color: '#2196F3'
    });
    
    this.registerType({
      id: DataType.BOOLEAN,
      name: 'Boolean',
      dataType: DataType.BOOLEAN,
      description: 'A true/false value',
      validator: (value) => typeof value === 'boolean',
      color: '#FF9800'
    });
    
    this.registerType({
      id: DataType.OBJECT,
      name: 'Object',
      dataType: DataType.OBJECT,
      description: 'A JSON object',
      validator: (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
      color: '#9C27B0'
    });
    
    this.registerType({
      id: DataType.ARRAY,
      name: 'Array',
      dataType: DataType.ARRAY,
      description: 'A list of values',
      validator: (value) => Array.isArray(value),
      color: '#E91E63'
    });
    
    this.registerType({
      id: DataType.ANY,
      name: 'Any',
      dataType: DataType.ANY,
      description: 'Any type of value',
      validator: () => true,
      color: '#607D8B'
    });

    // More specialized types
    this.registerType({
      id: DataType.DATE,
      name: 'Date',
      dataType: DataType.DATE,
      description: 'A date and time value',
      validator: (value) => value instanceof Date && !isNaN(value.getTime()),
      formatter: (value) => new Date(value),
      color: '#795548'
    });
    
    this.registerType({
      id: DataType.JSON,
      name: 'JSON',
      dataType: DataType.JSON,
      description: 'A JSON string',
      validator: (value) => {
        if (typeof value !== 'string') return false;
        try {
          JSON.parse(value);
          return true;
        } catch (e) {
          return false;
        }
      },
      formatter: (value) => {
        if (typeof value === 'string') {
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        }
        return JSON.stringify(value);
      },
      color: '#FF5722'
    });
    
    // Add more default types here
  }
  
  public registerType(type: TypeDefinition): void {
    this.types.set(type.id, type);
  }
  
  public getType(id: string): TypeDefinition | undefined {
    return this.types.get(id);
  }
  
  public getAllTypes(): TypeDefinition[] {
    return Array.from(this.types.values());
  }
  
  public validateValue(typeId: string, value: any): boolean {
    const type = this.getType(typeId);
    if (!type || !type.validator) return true;
    return type.validator(value);
  }
  
  public formatValue(typeId: string, value: any): any {
    const type = this.getType(typeId);
    if (!type || !type.formatter) return value;
    return type.formatter(value);
  }
  
  public getTypeColor(typeId: string): string {
    const type = this.getType(typeId);
    return type?.color || '#607D8B'; // Default color
  }
}

export default TypeRegistry.getInstance(); 