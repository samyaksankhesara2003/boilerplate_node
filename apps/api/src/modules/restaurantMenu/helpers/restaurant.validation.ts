import Joi from 'joi';

const updateRestaurantMenuItemSchema = {
    body: {
        id: Joi.number().required(),
        unique_menu_id: Joi.string().required(),
        restaurant_id: Joi.number().required(),
        dish_name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        dish_type: Joi.string().required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        allergens: Joi.array().items(Joi.string()).required(),
        price: Joi.number().required(),
        namespace: Joi.string().required()
    }
};

const createRestaurantMenuItemSchema = {
    body: {
        restaurant_id: Joi.number().required(),
        dish_name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        dish_type: Joi.string().required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        allergens: Joi.array().items(Joi.string()).required(),
        price: Joi.number().required(),
        namespace: Joi.string().required()
    }
}

const deleteRestaurantSchema = {
    query: {
        id: Joi.number().required(),
        namespace: Joi.string().required()
    }
}

export const restaurantValidation = {
    updateRestaurantMenuItemSchema,
    createRestaurantMenuItemSchema,
    deleteRestaurantSchema
};
