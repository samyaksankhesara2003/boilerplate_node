/**
 * @description CustomError is a class that extends the built-in Error class.
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code associated with the error.
 */
export class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'CustomError';
        Error.captureStackTrace(this, this.constructor);
    }
};
