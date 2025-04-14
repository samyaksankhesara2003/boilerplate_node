import type { Knex } from "knex";

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
    await knex.schema.createTable('experience_schedules', (table) => {
        table.increments('id').primary();
        table.integer('experience_id').unsigned().notNullable().references('id').inTable('experiences').onDelete('CASCADE');
        table.date('available_date').notNullable();
        table.time('available_time').notNullable();
        table.integer('min_guests').unsigned().notNullable().defaultTo(1);
        table.integer('max_guests').unsigned();
        table.enum('status', ['1', '2']).defaultTo('1').notNullable().comment('1 -> Active, 2 -> Inactive');
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
    await knex.schema.dropTableIfExists('experience_schedules');
};
