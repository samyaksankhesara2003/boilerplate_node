import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('notifications', table => {
        table.increments('id').primary();
        table.integer('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.enum('receiver_type', ['1', '2', '3']).defaultTo('1').comment('1 -> Admin, 2 -> Sub Admin, 3 -> User');
        table.string('room_id').notNullable();
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.string('redirection_type').nullable();
        table.string('redirection_url').nullable();
        table.string('type').notNullable();
        table.enum('is_read', ['0', '1']).defaultTo('0').comment('0 -> Unread, 1 -> Read');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.timestamp('deleted_at').nullable();

        // Indexes
        table.index(['receiver_type', 'receiver_id']);
        table.index('room_id');
        table.index('is_read');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('notifications');
}
