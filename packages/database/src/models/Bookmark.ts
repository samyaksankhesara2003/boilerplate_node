import { BaseModel } from './BaseModel';
import User from './User';

class Bookmark extends BaseModel {
    static tableName = 'bookmarks';

    user_id!: number;
    target_id!: number;
    target_type!: string;  // 1 -> User, 2 -> Blog

    // Relations
    user!: User;

    static relationMappings = {
        user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'bookmarks.user_id',
                to: 'users.id'
            }
        }
    };
}

export default Bookmark; 