import { Knex } from "knex";

/**
 * Executes the seed function.
 * @description This will delete all existing entries in the table_name table and insert the seed entries.
 *
 * @param {Knex} knex - Knex instance.
 * @returns {Promise<void>} - Resolves if the seed was successful.
 */
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del().where("role", 1);

    // Inserts seed entries
    await knex("users").insert([
        {
            id: 1,
            social_id: 'zY7lB1eU65cySr0CYrlqkjut3kp2',
            first_name: "Techuz",
            last_name: "Admin",
            email: "admin@yopmail.com",
            profile_url: null,
            slug: 'techuz-admin',
            // password: "$2b$10$92IXUNpkjO0rOQ5by",
            token: null,
            reset_password_token: null,
            role: 1,    // 1 -> Admin
            status: 1   // 1 -> Active
        }
    ]);
};
