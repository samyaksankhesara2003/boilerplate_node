import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bookmarks', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('target_id').unsigned().notNullable();
      table
        .enum('target_type', ['1', '2'])
        .defaultTo('1')
        .notNullable()
        .comment('1 -> User, 2 -> Blog');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp('deleted_at').nullable();

    // Indexes for better query performance
    table.index(['user_id', 'target_id', 'target_type']);
    table.index(['target_type']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bookmarks');
}
