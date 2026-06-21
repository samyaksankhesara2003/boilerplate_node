import type { Knex } from 'knex';

/**
 * Run the migrations.
 *
 * @description Adds a `unique_menu_id` column (sha256 of the normalized
 * restaurant_id + dish_name + category) and a unique index on it so the same
 * menu item is upserted rather than duplicated when a menu is re-uploaded.
 *
 * @param knex - The Knex.js instance used to interact with the database.
 * @returns Promise<void> - A promise that resolves when the migration is complete.
 */
export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('restaurant_menu_items', table => {
        table.specificType('unique_menu_id', 'CHAR(64)').nullable();
        table.unique(['unique_menu_id'], { indexName: 'uq_restaurant_menu_items_unique_menu_id' });
    });
}

/**
 * Revert the migrations.
 *
 * @description Drops the unique index and the `unique_menu_id` column.
 *
 * @param knex - The Knex.js instance used to interact with the database.
 * @returns Promise<void> - A promise that resolves when the migration is reverted.
 */
export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('restaurant_menu_items', table => {
        table.dropUnique(['unique_menu_id'], 'uq_restaurant_menu_items_unique_menu_id');
        table.dropColumn('unique_menu_id');
    });
}
