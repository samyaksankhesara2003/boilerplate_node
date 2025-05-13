import color from 'colors';
import { QueryContext } from 'objection';
import { Knex } from 'knex';
import { log } from '@repo/logger';

/**
 * @description Enables logging of database queries using Objection.js's event listeners.
 * @param {Knex} knex The Knex instance to attach the event listeners to.
 * @returns {void} Void
 */
export const logDbQueries = (knex: Knex): void => {
    const queryTimings: Record<string, number> = {};

    knex
        .on('query', (query: QueryContext) => {
            queryTimings[query.__knexQueryUid] = Date.now();
        })
        .on('query-response', (response: any, query: QueryContext) => {
            const startTime = queryTimings[query.__knexQueryUid] || Date.now();
            const endTime = Date.now();
            const durationSec = ((endTime - startTime) / 1000).toFixed(3);
            delete queryTimings[query.__knexQueryUid];

            if (query.sql.includes('select `emails`.*')) return;

            const timestamp = color.gray(`🕒  ${new Date().toISOString()}`);
            const duration =
                parseFloat(durationSec) > 0.1
                    ? color.red(`⏱️  ${durationSec.padStart(5, '0')}s`)
                    : color.green(`⏱️  ${durationSec.padStart(5, '0')}s`);
            const sql = color.cyan(`📘 SQL      : `) + color.white(query.sql);
            const bindings =
                query.bindings?.length > 0
                    ? color.magenta(`📦 Bindings : `) + color.white(`[${query.bindings.join(', ')}]`)
                    : color.magenta(`📦 Bindings : `) + color.white('[]');

            const affectedRows = Array.isArray(response)
                ? response.length
                : typeof response === 'object' && response !== null && 'length' in response
                    ? (response.length as number)
                    : undefined;

            const rowsText = affectedRows !== undefined
                ? color.yellow(`📊 Rows     : `) + color.white(`${affectedRows}`)
                : '';

            // Optional: Attach request ID if available from context
            const requestId = query.__requestId
                ? color.gray(`🔗 Request ID: ${query.__requestId}`)
                : '';

            const divider = color.gray('─'.repeat(60));

            log.info(
                `\n${divider}\n${timestamp}   ${duration}\n${sql}\n${bindings}\n${rowsText}${requestId ? `\n${requestId}` : ''}\n${divider}\n`
            );
        });
};
