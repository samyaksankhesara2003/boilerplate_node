export interface IMessage {
  id: number;
  sender_id: number;
  receiver_id: number;
  room_id?: string;
  message: string;
  attachment_url?: string;
  status: string;
  read_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ISendMessagePayload {
  sender_id: number;
  receiver_id: number;
  message: string;
  attachment_url?: string;
  room_id: string;
}

export interface IMessageHistoryParams {
  user_id: number;
  other_user_id: number;
  page?: number;
  limit?: number;
  before_date?: Date;
}

export interface IPaginatedMessages {
  messages: IMessage[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface IJoinRoomPayload {
  room_id: string;
}
