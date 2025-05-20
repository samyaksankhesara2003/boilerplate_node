import { BaseModel } from './BaseModel';
import User from './User';

class Message extends BaseModel {
  static tableName = 'messages';

  static relationMappings = {
    sender: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'messages.sender_id',
        to: 'users.id'
      }
    },
    receiver: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'messages.receiver_id',
        to: 'users.id'
      }
    }
  };

  static jsonSchema = {
    type: 'object',
    required: ['sender_id', 'receiver_id', 'message', 'status'],
    properties: {
      id: { type: 'integer' },
      sender_id: { type: 'integer' },
      receiver_id: { type: 'integer' },
			room_id: { type: 'string' },
      message: { type: 'string', minLength: 1 },
      attachment_url: { type: ['string', 'null'] },
      status: { type: 'string', enum: ['sent', 'delivered', 'read'] },
      read_at: { type: ['string', 'null'], format: 'date-time' },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' },
      deleted_at: { type: ['string', 'null'], format: 'date-time' }
    }
  };

  sender_id!: number;
	receiver_id!: number;
	room_id!: string;
  message!: string;
  attachment_url?: string;
  status!: 'sent' | 'delivered' | 'read';
  read_at?: Date;
}

export default Message; 