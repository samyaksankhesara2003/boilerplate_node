import { Message } from '@repo/db';
import { QueryBuilder } from 'objection';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants/events';
import {
	IMessage,
	IMessageHistoryParams,
	IPaginatedMessages,
	ISendMessagePayload,
} from '../types/message.types';

/**
 * @author Sanjay Balai
 * @description ChatService class for handling chat operations
 */
export class ChatService {
  /**
   * Send a message to a user
   */
  static async sendMessage(
    payload: ISendMessagePayload
  ): Promise<IMessage> {
    const message = await Message.query().insert({
      sender_id: payload.sender_id,
					receiver_id: payload.receiver_id,
					room_id: payload.room_id,
      message: payload.message,
      attachment_url: payload.attachment_url,
      status: 'sent',
    });

    return message;
  }

  /**
   * Get message history between two users with pagination
   */
  static async getMessageHistory(
    params: IMessageHistoryParams
  ): Promise<IPaginatedMessages> {
    const {
      user_id,
      other_user_id,
      page = 1,
      limit = DEFAULT_PAGE_SIZE,
      before_date,
    } = params;

    // Ensure limit doesn't exceed maximum
    const actualLimit = Math.min(limit, MAX_PAGE_SIZE);
    const offset = (page - 1) * actualLimit;

    // Build query
    const query = Message.query()
      .where((builder: QueryBuilder<Message>) => {
        builder
          .where((q: QueryBuilder<Message>) => {
            q.where('sender_id', user_id)
              .where('receiver_id', other_user_id);
          })
          .orWhere((q: QueryBuilder<Message>) => {
            q.where('sender_id', other_user_id)
              .where('receiver_id', user_id);
          });
      })
      .orderBy('created_at', 'desc');

    // Add date filter if provided
    if (before_date) {
      query.where('created_at', '<', before_date);
    }

    // Get total count
    const total = await query.clone().resultSize();

    // Get messages
    const messages = await query
      .limit(actualLimit)
      .offset(offset)
      .withGraphFetched('[sender, receiver]');

    return {
      messages,
      total,
      page,
      limit: actualLimit,
      has_more: total > offset + messages.length,
    };
  }

  /**
   * Mark message as delivered
   */
  static async markAsDelivered(messageId: number): Promise<void> {
    await Message.query()
      .patch({ status: 'delivered' })
      .where('id', messageId)
      .where('status', 'sent');
  }

  /**
   * Mark message as read
   */
  static async markAsRead(messageId: number): Promise<void> {
    await Message.query()
      .patch({
        status: 'read',
        read_at: new Date(),
      })
      .where('id', messageId)
      .whereIn('status', ['sent', 'delivered']);
  }

  /**
   * Get unread message count for a user
   */
  static async getUnreadCount(userId: number): Promise<number> {
    return Message.query()
      .where('receiver_id', userId)
      .whereNot('status', 'read')
      .resultSize();
  }
}
