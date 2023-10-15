export function validate(input) {
    if (input.required && input.value.trim().length === 0) {
        return false;
    }
    return true;
}
