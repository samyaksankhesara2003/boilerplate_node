import { BaseModel } from './BaseModel';

class Feedback extends BaseModel {

    static get tableName() {
        return 'feedbacks';
    };

    user_id!: number;
    module_id!: number | null;
    module_type_id!: number | null;
    rating!: number | null;
    feedback!: string;
    type!: number;   // 1 -> System , 2 -> Module ... 
    status!: number; // 1 -> Active , 2 -> Inactive
}

export default Feedback;