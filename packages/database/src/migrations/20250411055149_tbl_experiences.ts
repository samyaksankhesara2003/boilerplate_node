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
    await knex.schema.createTable('experiences', (table) => {
        table.increments('id').primary();
        table.integer('country_id').unsigned().references('id').inTable('countries').onDelete('CASCADE');
        table.integer('experience_category_id').unsigned().references('id').inTable('experience_categories').onDelete('CASCADE');
        table.string('title').notNullable();
        table.text('description');
        table.integer('duration').unsigned();
        table.enum('duration_type', ['1', '2', '3', '4', '5']).defaultTo('1').notNullable().comment('1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year');
        table.string('banner_url');
        table.decimal('rating', 2, 1).defaultTo(0.0);
        table.integer('review_count').unsigned().defaultTo(0);
        table.enum('language', ['1', '2']).defaultTo('1').notNullable().comment('1 -> English, 2 -> Spanish');
        table.json('features').nullable();        
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
    await knex.schema.dropTableIfExists('experiences');
};
