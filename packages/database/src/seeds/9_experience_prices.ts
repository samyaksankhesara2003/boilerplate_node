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
    await knex("experience_prices").del();

    // Inserts seed entries
    await knex("experience_prices").insert([
        {
            id: 1,
            experience_id: 1,
            min_guests: 1,
            max_guests: 10,
            price: 100.00,
            service_fee: 0.00,
            price_type: 1,  // 1 -> Per Person, 2 -> Per Group
            currency: 1 // 1 -> USD, 2 -> INR
        },
        {
            id: 2,
            experience_id: 2,
            min_guests: 1,
            max_guests: 10,
            price: 100.00,
            service_fee: 0.00,
            price_type: 1,  // 1 -> Per Person, 2 -> Per Group
            currency: 1 // 1 -> USD, 2 -> INR
        },
        {
            id: 3,
            experience_id: 3,
            min_guests: 1,
            max_guests: 10,
            price: 100.00,
            service_fee: 0.00,
            price_type: 1,  // 1 -> Per Person, 2 -> Per Group
            currency: 1 // 1 -> USD, 2 -> INR
        },
        {
            id: 4,
            experience_id: 4,
            min_guests: 1,
            max_guests: 10,
            price: 100.00,
            service_fee: 0.00,
            price_type: 1,  // 1 -> Per Person, 2 -> Per Group
            currency: 1 // 1 -> USD, 2 -> INR
        },
        {
            id: 5,
            experience_id: 5,
            min_guests: 1,
            max_guests: 10,
            price: 100.00,
            service_fee: 0.00,
            price_type: 1,  // 1 -> Per Person, 2 -> Per Group
            currency: 1 // 1 -> USD, 2 -> INR
        },
        {
            id: 6,
            experience_id: 6,
            min_guests: 1,
            max_guests: 10,
            price: 100.00,
            service_fee: 0.00,
            price_type: 1,  // 1 -> Per Person, 2 -> Per Group
            currency: 1 // 1 -> USD, 2 -> INR
        },
        {
            id: 7,
            experience_id: 7,
            min_guests: 1,
            max_guests: 10,
            price: 100.00,
            service_fee: 0.00,
            price_type: 1,  // 1 -> Per Person, 2 -> Per Group
            currency: 1 // 1 -> USD, 2 -> INR
        },
        {
            id: 8,
            experience_id: 8,
            min_guests: 1,
            max_guests: 10,
            price: 100.00,
            service_fee: 0.00,
            price_type: 1,  // 1 -> Per Person, 2 -> Per Group
            currency: 1 // 1 -> USD, 2 -> INR
        },
        {
            id: 9,
            experience_id: 9,
            min_guests: 1,
            max_guests: 10,
            price: 100.00,
            service_fee: 0.00,
            price_type: 1,  // 1 -> Per Person, 2 -> Per Group
            currency: 1 // 1 -> USD, 2 -> INR
        }
    ]);
};
