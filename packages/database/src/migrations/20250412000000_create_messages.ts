import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table.integer('sender_id').unsigned().notNullable();
    table.integer('receiver_id').unsigned().notNullable();
    table.string('room_id').notNullable();
    table.text('message').notNullable();
    table.string('attachment_url').nullable();
    table.enum('status', ['sent', 'delivered', 'read']).defaultTo('sent');
    table.timestamp('read_at').nullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();

    table.foreign('sender_id').references('users.id');
    table.foreign('receiver_id').references('users.id');

    // Indexes for better query performance
    table.index(['sender_id', 'receiver_id']);
    table.index(['room_id']);
    table.index(['status']);
    table.index(['created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages');
} 