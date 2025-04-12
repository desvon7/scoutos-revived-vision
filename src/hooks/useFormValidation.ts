import { useState, useCallback } from "react"
import { z } from "zod"

export type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
};

export type ValidationErrors = Record<string, string>;

export type ValidationSchema = Record<string, ValidationRules>;

export function useFormValidation<T extends z.ZodType>(schema: T) {
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validate = useCallback(
    (data: z.infer<T>) => {
      try {
        schema.parse(data)
        setErrors({})
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: ValidationErrors = {}
          error.errors.forEach((err) => {
            if (err.path) {
              newErrors[err.path[0]] = err.message
            }
          })
          setErrors(newErrors)
        }
        return false
      }
    },
    [schema]
  )

  return { errors, validate }
}
