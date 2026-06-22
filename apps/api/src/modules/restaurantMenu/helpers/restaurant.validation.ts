import Joi from 'joi';

const updateRestaurantSchema = {
    body: {
        id: Joi.number().required(),
        restaurant_id: Joi.number().required(),
        dish_name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        dish_type: Joi.string().required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        allergens: Joi.array().items(Joi.string()).required(),
        price: Joi.number().required()
    }
};

export const restaurantValidation = {
    updateRestaurantSchema
};
