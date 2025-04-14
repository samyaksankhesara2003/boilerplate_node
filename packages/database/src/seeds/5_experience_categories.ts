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
    await knex("experience_categories").del();

    // Inserts seed entries
    await knex("experience_categories").insert([
        {
            id: 1,
            name: "Food & Drink",
            status: 1   // 1 -> Active
        },
        {
            id: 2,
            name: "Adventure",
            status: 1   // 1 -> Active
        },
        {
            id: 3,
            name: "Cycling",
            status: 1   // 1 -> Active
        },
        {
            id: 4,
            name: "Beach",
            status: 1   // 1 -> Active
        },
        {
            id: 5,
            name: "Water",
            status: 1   // 1 -> Active
        },
        {
            id: 6,
            name: "Wine Tour",
            status: 1   // 1 -> Active
        },
        {
            id: 7,
            name: "Photography",
            status: 1   // 1 -> Active
        },
        {
            id: 8,
            name: "Art & Culture",
            status: 1   // 1 -> Active
        },
        {
            id: 9,
            name: "History",
            status: 1   // 1 -> Active
        },
    ]);
};
