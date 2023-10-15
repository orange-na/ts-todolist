export interface Validatable {
  value: string;
  required: boolean;
}

export function validate(input: Validatable): boolean {
  if (input.required && input.value.trim().length === 0) {
    return false;
  }
  return true;
}
