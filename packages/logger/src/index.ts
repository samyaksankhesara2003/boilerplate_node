type LogLevel = 'info' | 'warn' | 'error';

const logMessage = (level: LogLevel, ...args: unknown[]): void => {
    const prefix = `[${level.toUpperCase()}]`;

    switch (level) {
        case 'info':
            console.log(prefix, ...args);
            break;
        case 'warn':
            console.warn(prefix, ...args);
            break;
        case 'error':
            console.error(prefix, ...args);
            break;
    }
};

export const log = {
    info: (...args: unknown[]) => logMessage('info', ...args),
    warn: (...args: unknown[]) => logMessage('warn', ...args),
    error: (...args: unknown[]) => logMessage('error', ...args)
};
