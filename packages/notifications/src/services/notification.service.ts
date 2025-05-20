import { Notification } from '@repo/db';
import { NotificationHandler } from '../socket/notification.handler';
import {
	INotification,
	ISendNotificationPayload
} from '../types/notification.types';
import { getNotificationVariables, replaceNotificationVariables } from '../utils/notification.utils';

export class NotificationService {
  /**
   * Send a notification to a user
   */
  static async sendNotification(
    payload: ISendNotificationPayload
  ): Promise<INotification> {
    const roomId = `notification_${payload.receiver_id}`;

    let notification = await Notification.query().insert({
      receiver_type: payload.receiver_type,
      receiver_id: payload.receiver_id,
      room_id: roomId,
      title: payload.title,
      description: payload.description,
      redirection_type: payload.redirection_type,
      redirection_url: payload.redirection_url,
      type: payload.type,
      is_read: '0',
    });
    
    const processedNotification = await this.processNotificationContent(notification as unknown as INotification);
    NotificationHandler.emitNotification(roomId, processedNotification);
    return processedNotification;
  }

  /**
   * Process notification content with dynamic variables
   */
  static async processNotificationContent(notification: INotification): Promise<INotification> {
    const variables = await getNotificationVariables(
      notification.receiver_id
    );

    return {
      ...notification,
      title: replaceNotificationVariables(notification.title, variables),
      description: replaceNotificationVariables(notification.description, variables)
    };
  }

  /**
   * Process multiple notifications
   */
  static async processNotifications(notifications: INotification[]): Promise<INotification[]> {
    return Promise.all(notifications.map(notification => 
      this.processNotificationContent(notification)
    ));
  }
} 