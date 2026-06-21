import type { Knex } from 'knex';

/**
 * Run the migrations.
 *
 * @description Adds a `text` column that stores the combined "master text"
 * (dish_name, category, dish_type, description, ingredients) used later for
 * embedding generation / semantic search.
 *
 * @param knex - The Knex.js instance used to interact with the database.
 * @returns Promise<void> - A promise that resolves when the migration is complete.
 */
export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('restaurant_menu_items', table => {
        table.text('text').nullable();
    });
}

/**
 * Revert the migrations.
 *
 * @description Drops the `text` column.
 *
 * @param knex - The Knex.js instance used to interact with the database.
 * @returns Promise<void> - A promise that resolves when the migration is reverted.
 */
export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('restaurant_menu_items', table => {
        table.dropColumn('text');
    });
}
