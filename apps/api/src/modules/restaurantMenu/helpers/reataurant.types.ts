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

export interface UpdateMenuItemBody {
    id: number;
    restaurant_id: number;
    dish_name: string;
    description: string;
    category: string;
    dish_type: string;
    ingredients: string[];
    allergens: string[];
    price: number;
}
