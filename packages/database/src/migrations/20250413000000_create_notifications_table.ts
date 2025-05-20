import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('notifications', (table) => {
    table.increments('id').primary();
    table.tinyint('receiver_type').comment('1 => Admin, 2 => Sub Admin, 3 => User');    table.integer('receiver_id').unsigned().notNullable();
    table.string('room_id').notNullable();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.string('redirection_type').nullable();
    table.string('redirection_url').nullable();
    table.string('type').notNullable();
    table.tinyint('is_read').comment('1 => Read, 0 => Unread').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();

    table.foreign('receiver_id').references('users.id');

    // Indexes
    table.index(['receiver_type', 'receiver_id']);
    table.index('room_id');
    table.index('is_read');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('notifications');
} 