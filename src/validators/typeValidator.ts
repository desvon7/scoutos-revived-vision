import { DataType, Port, Node, Connection } from '../types/nodes';

export interface TypeValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export class TypeValidator {
  /**
   * Validates if a connection between two ports is type-compatible
   */
  public validateTypeCompatibility(sourcePort: Port, targetPort: Port): TypeValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // ANY type can connect to anything
    if (sourcePort.dataType === DataType.ANY || targetPort.dataType === DataType.ANY) {
      return { valid: true, errors: [], warnings: [] };
    }

    // Check for exact type match
    if (sourcePort.dataType === targetPort.dataType) {
      return { valid: true, errors: [], warnings: [] };
    }

    // Check for compatible type conversions
    const isCompatible = this.areTypesCompatible(sourcePort.dataType, targetPort.dataType);

    if (isCompatible) {
      warnings.push(`Type conversion required: ${sourcePort.dataType} -> ${targetPort.dataType}`);
      return { valid: true, errors: [], warnings };
    }

    errors.push(
      `Incompatible types: Cannot connect ${sourcePort.dataType} to ${targetPort.dataType}`
    );
    return { valid: false, errors, warnings };
  }

  /**
   * Checks if two data types are compatible (can be converted between)
   */
  private areTypesCompatible(sourceType: DataType, targetType: DataType): boolean {
    // Define compatible type pairs
    const compatiblePairs: [DataType, DataType][] = [
      // String conversions
      [DataType.STRING, DataType.NUMBER],
      [DataType.STRING, DataType.BOOLEAN],
      [DataType.STRING, DataType.DATE],
      [DataType.STRING, DataType.JSON],
      [DataType.STRING, DataType.HTML],
      [DataType.STRING, DataType.MARKDOWN],

      // Number conversions
      [DataType.NUMBER, DataType.STRING],
      [DataType.NUMBER, DataType.BOOLEAN],

      // Boolean conversions
      [DataType.BOOLEAN, DataType.STRING],
      [DataType.BOOLEAN, DataType.NUMBER],

      // Date conversions
      [DataType.DATE, DataType.STRING],

      // Object conversions
      [DataType.OBJECT, DataType.JSON],
      [DataType.OBJECT, DataType.STRING],

      // Array conversions
      [DataType.ARRAY, DataType.STRING],
      [DataType.ARRAY, DataType.JSON],

      // JSON conversions
      [DataType.JSON, DataType.OBJECT],
      [DataType.JSON, DataType.ARRAY],
      [DataType.JSON, DataType.STRING],
    ];

    return compatiblePairs.some(
      ([source, target]) => source === sourceType && target === targetType
    );
  }

  /**
   * Determines if a data conversion is needed and how to perform it
   */
  public getTypeConverter(
    sourceType: DataType,
    targetType: DataType
  ): ((value: any) => any) | null {
    // If types are the same, no conversion needed
    if (sourceType === targetType) {
      return (value) => value;
    }

    // Define converters for compatible type pairs
    const converters: Record<string, (value: any) => any> = {
      [`${DataType.STRING}_${DataType.NUMBER}`]: (value) => Number(value),
      [`${DataType.STRING}_${DataType.BOOLEAN}`]: (value) =>
        Boolean(value && value !== 'false' && value !== '0'),
      [`${DataType.STRING}_${DataType.DATE}`]: (value) => new Date(value),
      [`${DataType.STRING}_${DataType.JSON}`]: (value) => JSON.parse(value),

      [`${DataType.NUMBER}_${DataType.STRING}`]: (value) => String(value),
      [`${DataType.NUMBER}_${DataType.BOOLEAN}`]: (value) => Boolean(value),

      [`${DataType.BOOLEAN}_${DataType.STRING}`]: (value) => String(value),
      [`${DataType.BOOLEAN}_${DataType.NUMBER}`]: (value) => (value ? 1 : 0),

      [`${DataType.DATE}_${DataType.STRING}`]: (value) => value.toISOString(),

      [`${DataType.OBJECT}_${DataType.JSON}`]: (value) => JSON.stringify(value),
      [`${DataType.OBJECT}_${DataType.STRING}`]: (value) => JSON.stringify(value),

      [`${DataType.ARRAY}_${DataType.STRING}`]: (value) => JSON.stringify(value),
      [`${DataType.ARRAY}_${DataType.JSON}`]: (value) => JSON.stringify(value),

      [`${DataType.JSON}_${DataType.OBJECT}`]: (value) =>
        typeof value === 'string' ? JSON.parse(value) : value,
      [`${DataType.JSON}_${DataType.ARRAY}`]: (value) =>
        typeof value === 'string' ? JSON.parse(value) : value,
      [`${DataType.JSON}_${DataType.STRING}`]: (value) =>
        typeof value === 'string' ? value : JSON.stringify(value),
    };

    const key = `${sourceType}_${targetType}`;
    return converters[key] || null;
  }
}

export default new TypeValidator();
