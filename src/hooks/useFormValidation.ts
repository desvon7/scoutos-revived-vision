
import { useState } from 'react';

export type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
};

export type ValidationErrors = Record<string, string>;

export type ValidationSchema = Record<string, ValidationRules>;

const useFormValidation = (schema: ValidationSchema) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [values, setValues] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string | null => {
    const rules = schema[name];
    if (!rules) return null;

    if (rules.required && !value) {
      return `${name} is required`;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `${name} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${name} must be less than ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return `${name} is not valid`;
    }

    if (rules.custom && !rules.custom(value)) {
      return `${name} is not valid`;
    }

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || undefined,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(schema).forEach(field => {
      const error = validateField(field, values[field] || '');
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    values,
    errors,
    handleChange,
    validateForm,
    setValues,
  };
};

export default useFormValidation;
