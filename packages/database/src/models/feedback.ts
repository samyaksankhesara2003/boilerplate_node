import { BaseModel } from './BaseModel';




class Feedback extends BaseModel {

    static get tableName() {
        return 'feedback';
    };

    user_id!: number;
    module_id!: number | null;
    rating!: number;
    text!: string;
    type!: number;
    status!: number;
}

export default Feedback;