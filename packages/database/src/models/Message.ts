import { BaseModel } from './BaseModel';
import User from './User';

class Message extends BaseModel {
  static tableName = 'messages';

  sender!: User;
  receiver!: User;
  sender_id!: number;
  receiver_id!: number;
  room_id!: string;
  message!: string;
  attachment_url?: string;
  status!: number; // 1 -> sent, 2 -> delivered, 3 -> read
  read_at?: Date;

  static relationMappings = {
    sender: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'messages.sender_id',
        to: 'users.id',
      },
    },
    receiver: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'messages.receiver_id',
        to: 'users.id',
      },
    },
  };
}

export default Message;
