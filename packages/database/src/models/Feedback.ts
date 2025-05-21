import { BaseModel } from './BaseModel';

class Feedback extends BaseModel {

    static get tableName() {
        return 'feedbacks';
    };

    user_id!: number;
    module_id!: number | null;
    rating!: number;
    feedback!: string;
    type!: number;
    status!: number;
}

export default Feedback;