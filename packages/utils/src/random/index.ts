/**
 * @description Generates a random number between min (inclusive) and max (inclusive).
 * @param {number} min The minimum number (inclusive) to generate.
 * @param {number} max The maximum number (inclusive) to generate.
 * @returns {number} A random number between min and max.
 */
export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description Generates a random string of specified length using alphanumeric characters.
 * @param {number} length The desired length of the random string.
 * @returns {string} A random alphanumeric string of the specified length.
 */
export function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};