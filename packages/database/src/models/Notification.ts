import { BaseModel } from './BaseModel';
import User from './User';

class Message extends BaseModel {
  static tableName = 'notifications';

  receiver_type!: string;
  receiver_id!: number;
  room_id!: string;
  title!: string;
  description!: string;
  redirection_type?: string;
  redirection_url?: string;
  type!: string;
  is_read!: string;

  static relationMappings = {
    receiver: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'notifications.receiver_id',
        to: 'users.id',
      },
    },
  };

}

export default Message; 