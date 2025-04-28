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
    await knex.schema.createTable('experience_transactions', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('experience_booking_id').unsigned().notNullable().references('id').inTable('experience_bookings').onDelete('CASCADE');
        table.string('stripe_payment_intent_id').notNullable();
        table.decimal('amount', 10, 2).unsigned().notNullable();
        table.string('stripe_invoice_url').nullable();
        table.json('stripe_response').nullable();
        table.enum('currency', ['1', '2']).defaultTo('1').notNullable().comment('1 -> USD, 2 -> INR');
        table.enum('payment_type', ['1', '2', '3']).notNullable().defaultTo('1').comment('1 -> Full Payment, 2 -> Partial Payment, 3 -> Refund');
        table.enum('payment_status', ['1', '2', '3', '4']).defaultTo('1').comment('1 -> Pending, 2 -> Completed, 3 -> Failed, 4 -> Cancelled');
        table.enum('payment_method', ['1', '2', '3']).nullable().defaultTo('1').comment('1 -> Stripe, 2 -> PayPal, 3 -> Other');
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
    await knex.schema.dropTableIfExists('experience_transactions');
};
