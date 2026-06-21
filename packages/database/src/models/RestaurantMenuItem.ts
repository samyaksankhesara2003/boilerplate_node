import { BaseModel } from './BaseModel';

class RestaurantMenuItem extends BaseModel {
    static get tableName() {
        return 'restaurant_menu_items';
    }
    static get jsonAttributes() {
        return ['ingredients', 'allergens'];
    }
    restaurant_id!: number;
    unique_menu_id!: string;
    dish_name!: string;
    description!: string;
    category!: string;
    dish_type!: string;
    ingredients!: any;
    allergens!: any;
    price!: number;
}

export default RestaurantMenuItem;
