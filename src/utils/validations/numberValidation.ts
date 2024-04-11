export const isNonNegativeNumber = (value: string) => {
    return /^\+?(0|[1-9]\d*)$/.test(value);
}

export function isPositiveNumber(value: string) {
    return /^\+?([1-9]\d*)$/.test(value);
}

export const isNonNegativeNumberOrEmpty = (value: string) => {
    // Allow an empty string or a non-negative number
    return /^$|^\+?(0|[1-9]\d*)$/.test(value);
}

