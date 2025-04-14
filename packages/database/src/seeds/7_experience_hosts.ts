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
    await knex("experience_hosts").del();

    // Inserts seed entries
    await knex("experience_hosts").insert([
        {
            id: 1,
            user_id: 2,
            experience_id: 1
        },
        {
            id: 2,
            user_id: 2,
            experience_id: 2
        },
        {
            id: 3,
            user_id: 2,
            experience_id: 3
        },
        {
            id: 4,
            user_id: 2,
            experience_id: 4
        },
        {
            id: 5,
            user_id: 2,
            experience_id: 5
        },
        {
            id: 6,
            user_id: 2,
            experience_id: 6
        },
        {
            id: 7,
            user_id: 2,
            experience_id: 7
        },
        {
            id: 8,
            user_id: 2,
            experience_id: 8
        },
        {
            id: 9,
            user_id: 2,
            experience_id: 9
        },
        {
            id: 10,
            user_id: 2,
            experience_id: 10
        },
        {
            id: 11,
            user_id: 2,
            experience_id: 11
        },
        {
            id: 12,
            user_id: 2,
            experience_id: 12
        },
        {
            id: 13,
            user_id: 2,
            experience_id: 13
        },
        {
            id: 14,
            user_id: 2,
            experience_id: 14
        },
        {
            id: 15,
            user_id: 2,
            experience_id: 15
        },
        {
            id: 16,
            user_id: 2,
            experience_id: 16
        },
        {
            id: 17,
            user_id: 2,
            experience_id: 17
        },
        {
            id: 18,
            user_id: 2,
            experience_id: 18
        },
    ]);
};
