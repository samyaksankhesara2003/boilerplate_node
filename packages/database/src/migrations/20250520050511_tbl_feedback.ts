import type { Knex } from "knex";
import { constants } from '@repo/config';

/**
 * Run the migrations.
 *
 * @description This function is used to modify the database schema by applying
 * a set of changes. It is executed when a migration is run.
 *
 * @param knex - The Knex.js instance used to interact with the database.
 * @returns Promise<void> - A promise that resolves when the migration is complete.
 */
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('feedback', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('module_id').unsigned().nullable();
        table.string('text').notNullable();
        table.tinyint('rating', 1).defaultTo(0).unsigned().notNullable();
        table.enum('type', ['1', '2', '3']).defaultTo('1').notNullable().comment('1 -> System');
        table.enum('status', ['1', '2']).defaultTo(constants.status.Active).notNullable().comment('1 -> Active, 2 -> Inactive');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * Revert the migrations.
 *
 * @description This function is used to revert the database schema back to
 * how it was before a migration was run. It is executed when a
 * migration is reverted.
 *
 * @param knex - The Knex.js instance used to interact with the database.
 * @returns Promise<void> - A promise that resolves when the migration is reverted.
 */
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('feedback');
};
