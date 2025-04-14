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
    await knex.schema.createTable('experience_prices', (table) => {
        table.increments('id').primary();
        table.integer('experience_id').unsigned().notNullable().references('id').inTable('experiences').onDelete('CASCADE');
        table.integer('min_guests').unsigned().notNullable().defaultTo(1);
        table.integer('max_guests').unsigned().nullable().defaultTo(null);
        table.decimal('price', 10, 2).unsigned().notNullable();
        table.decimal('service_fee', 10, 2).unsigned().defaultTo(0.00);
        table.enum('price_type', ['1', '2']).notNullable().defaultTo('1').comment('1 -> Per Person, 2 -> Per Group');
        table.enum('currency', ['1', '2']).defaultTo('1').notNullable().comment('1 -> USD, 2 -> INR');
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
    await knex.schema.dropTableIfExists('experience_prices');
};
