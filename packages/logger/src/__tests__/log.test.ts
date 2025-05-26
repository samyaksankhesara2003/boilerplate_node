import { describe, it, expect, jest } from '@jest/globals';
import { log } from '..';

jest.spyOn(global.console, 'log');
jest.spyOn(global.console, 'warn');
jest.spyOn(global.console, 'error');

describe('@repo/logger', () => {
    it('logs an info message', () => {
        log.info('hello');
        expect(console.log).toBeCalledWith('[INFO]', 'hello');
    });

    it('logs a warning message', () => {
        log.warn('warning');
        expect(console.warn).toBeCalledWith('[WARN]', 'warning');
    });

    it('logs an error message', () => {
        log.error('error');
        expect(console.error).toBeCalledWith('[ERROR]', 'error');
    });
});
