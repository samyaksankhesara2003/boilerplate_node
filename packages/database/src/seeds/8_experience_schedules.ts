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
    await knex("experience_schedules").del();

    // Inserts seed entries
    await knex("experience_schedules").insert([
        {
            id: 1,
            experience_id: 1,
            available_date: "2023-01-01",
            available_time: "09:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 2,
            experience_id: 1,
            available_date: "2023-01-01",
            available_time: "13:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 3,
            experience_id: 1,
            available_date: "2023-01-01",
            available_time: "16:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },




        {
            id: 4,
            experience_id: 2,
            available_date: "2023-01-02",
            available_time: "09:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 5,
            experience_id: 2,
            available_date: "2023-01-02",
            available_time: "13:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 6,
            experience_id: 2,
            available_date: "2023-01-02",
            available_time: "16:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },



        {
            id: 7,
            experience_id: 3,
            available_date: "2023-01-03",
            available_time: "09:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 8,
            experience_id: 3,
            available_date: "2023-01-03",
            available_time: "13:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 9,
            experience_id: 3,
            available_date: "2023-01-03",
            available_time: "16:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },





        {
            id: 10,
            experience_id: 4,
            available_date: "2023-01-04",
            available_time: "09:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 11,
            experience_id: 4,
            available_date: "2023-01-04",
            available_time: "13:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 12,
            experience_id: 4,
            available_date: "2023-01-04",
            available_time: "16:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },









        {
            id: 13,
            experience_id: 5,
            available_date: "2023-01-05",
            available_time: "09:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 14,
            experience_id: 5,
            available_date: "2023-01-05",
            available_time: "13:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 15,
            experience_id: 5,
            available_date: "2023-01-05",
            available_time: "16:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },





        {
            id: 16,
            experience_id: 6,
            available_date: "2023-01-06",
            available_time: "09:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 17,
            experience_id: 6,
            available_date: "2023-01-06",
            available_time: "13:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        },
        {
            id: 18,
            experience_id: 6,
            available_date: "2023-01-06",
            available_time: "16:00",
            min_guests: 1,
            max_guests: 10,
            status: 1   // 1 -> Active
        }
    ]);
};
