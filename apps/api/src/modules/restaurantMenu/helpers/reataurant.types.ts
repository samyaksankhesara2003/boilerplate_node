export interface MenuItem {
    dish_name: string | null;
    description: string | null;
    category: string | null;
    dish_type: 'veg' | 'non-veg' | 'beverage' | null;
    ingredients: string[] | null;
    allergens: string[] | null;
    price: number;
}
