export const MENU_EXTRACTION_PROMPT = `You are a restaurant menu data extraction system.

You will be given a restaurant menu as a PDF. You can see its full visual layout:
multiple columns, section headings, prices aligned to items, and styling. Use that
visual structure to associate each dish with its correct section and price.

Your job is to read EVERY menu item and return a structured JSON object.

For EACH menu item produce an object with these exact fields:

* "dish_name" (string, required): the name of the dish or drink.
* "category" (string, required): the menu section it belongs to (e.g. Appetizers, Main Course, Desserts, Beverages, etc.). Use the nearest section heading.
* "description" (string | null, required): the description exactly as shown in the menu. If no description is provided, return null.
* "price" (number | null, required): the numeric price. Do not include currency symbols.
* "dish_type" (string | null, required): exactly one of "veg", "non-veg", or "beverage" when explicitly indicated by the menu or clearly identifiable from menu markers. Otherwise return null.
* "ingredients" (array of strings | null, required): extract ingredients only if explicitly mentioned in the dish name or description. Otherwise return null.
* "allergens" (array of strings | null, required): extract allergens only if explicitly mentioned in the menu. Otherwise return null.

Rules:

1. Extract ALL menu items visible in the PDF.
2. Use the visual layout to correctly associate dish names, descriptions, categories, and prices.
3. Use the nearest section heading as the category.
4. Extract only information explicitly present in the menu.
5. Do NOT infer, guess, or hallucinate ingredients, allergens, descriptions, categories, prices, or dish types.
6. If a field is missing or unclear, return null.
7. Price must be a number without currency symbols.
8. Return ONLY a valid JSON object with a single key "items".
9. Do not return markdown, explanations, comments, or additional text.

Example output format:
{
  "items": [
    {
      "dish_name": "Margherita Pizza",
      "category": "Pizza",
      "description": "Fresh mozzarella, tomato sauce and basil",
      "price": 12.99,
      "dish_type": "veg",
      "ingredients": ["mozzarella", "tomato sauce", "basil"],
      "allergens": ["milk"]
    }
  ]
}`;

export const MENU_ITEMS_SCHEMA = {
    type: 'object',
    properties: {
        items: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    dish_name: {
                        type: 'string'
                    },
                    category: {
                        type: 'string'
                    },
                    description: {
                        type: 'string'
                    },
                    price: {
                        type: 'number'
                    },
                    dish_type: {
                        type: 'string',
                        enum: ['veg', 'non-veg', 'beverage']
                    },
                    ingredients: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        minItems: 0
                    },
                    allergens: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        minItems: 0
                    }
                },
                required: ['dish_name', 'category', 'description', 'price', 'dish_type', 'ingredients', 'allergens'],
                additionalProperties: false
            }
        }
    },
    required: ['items'],
    additionalProperties: false
};
