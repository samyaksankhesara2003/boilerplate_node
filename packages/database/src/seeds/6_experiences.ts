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
    await knex("experiences").del();

    // Inserts seed entries
    await knex("experiences").insert([
        {
            id: 1,
            experience_category_id: 1,
            country_id: 1,
            title: "Italian Pasta Making Workshop",
            description: "Learn how to make authentic Italian pasta from scratch with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 2,
            experience_category_id: 1,
            country_id: 1,
            title: "Spanish Tapas Cooking Class",
            description: "Learn how to prepare authentic Spanish tapas with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 3,
            experience_category_id: 2,
            country_id: 1,
            title: "French Pastry Making Class",
            description: "Learn how to make authentic French pastries with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 4,
            experience_category_id: 2,
            country_id: 1,
            title: "Japanese Sushi Making Workshop",
            description: "Learn how to make authentic Japanese sushi with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 5,
            experience_category_id: 3,
            country_id: 1,
            title: "Thai Street Food Cooking Class",
            description: "Learn how to prepare authentic Thai street food with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 6,
            experience_category_id: 3,
            country_id: 1,
            title: "Peruvian Cuisine Cooking Class",
            description: "Learn how to prepare authentic Peruvian cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 7,
            experience_category_id: 4,
            country_id: 1,
            title: "Mexican Street Food Cooking Class",
            description: "Learn how to prepare authentic Mexican street food with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 8,
            experience_category_id: 4,
            country_id: 1,
            title: "Greek Cuisine Cooking Class",
            description: "Learn how to prepare authentic Greek cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 9,
            experience_category_id: 5,
            country_id: 1,
            title: "Brazilian Cuisine Cooking Class",
            description: "Learn how to prepare authentic Brazilian cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 10,
            experience_category_id: 5,
            country_id: 1,
            title: "Thai Cuisine Cooking Class",
            description: "Learn how to prepare authentic Thai cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 11,
            experience_category_id: 6,
            country_id: 1,
            title: "Vietnamese Cuisine Cooking Class",
            description: "Learn how to prepare authentic Vietnamese cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 12,
            experience_category_id: 6,
            country_id: 1,
            title: "Indian Cuisine Cooking Class",
            description: "Learn how to prepare authentic Indian cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 13,
            experience_category_id: 7,
            country_id: 1,
            title: "Korean Cuisine Cooking Class",
            description: "Learn how to prepare authentic Korean cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 14,
            experience_category_id: 7,
            country_id: 1,
            title: "Chinese Cuisine Cooking Class",
            description: "Learn how to prepare authentic Chinese cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 15,
            experience_category_id: 8,
            country_id: 1,
            title: "Japanese Cuisine Cooking Class",
            description: "Learn how to prepare authentic Japanese cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 16,
            experience_category_id: 8,
            country_id: 1,
            title: "Peruvian Cuisine Cooking Class",
            description: "Learn how to prepare authentic Peruvian cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 17,
            experience_category_id: 9,
            country_id: 1,
            title: "Colombian Cuisine Cooking Class",
            description: "Learn how to prepare authentic Colombian cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
        {
            id: 18,
            experience_category_id: 9,
            country_id: 1,
            title: "Argentine Cuisine Cooking Class",
            description: "Learn how to prepare authentic Argentine cuisine with a professional chef. Take home your creations and impress your friends and family!",
            duration: 1,
            banner_url: null,
            rating: null,
            review_count: null,
            features: null,
            duration_type: 1,   // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
            language: 1,        // 1 -> English, 2 -> Spanish
            status: 1           // 1 -> Active
        },
    ]);
};
