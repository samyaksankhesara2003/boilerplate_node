export interface MenuItem {
    dish_name: string;
    category: string;
    description: string;
    price: number;
    dish_type: string;
    ingredients: string[];
    allergens: string[];
}

export interface PineconeConfig {
    restaurant_id: number;
    namespace: string;
    index?: string;
}

export interface getMenuItemsQuery {
    restaurant_id: number;
}
