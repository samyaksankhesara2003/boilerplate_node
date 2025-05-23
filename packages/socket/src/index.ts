import { ChatHandler } from '@repo/chat';
import { appConfig } from '@repo/config';
import { NotificationHandler } from '@repo/notifications';
import { CustomError, ResponseMessages, StatusCodes } from '@repo/response-handler';
import { Server } from 'socket.io';
import { SOCKET_EVENTS } from './constants/events';

export class SocketManager {
    private static instance: SocketManager;
    private io: Server | null = null;
    private chatHandler: ChatHandler | null = null;
    private notificationHandler: NotificationHandler | null = null;

    private constructor() {}

    static getInstance(): SocketManager {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager();
        }
        return SocketManager.instance;
    }

    initialize(server: any): void {
        if (this.io) {
            console.warn('Socket.IO is already initialized');
            return;
        }

        this.io = new Server(server, {
            cors: {
                origin: appConfig?.allowedHosts?.split(',') ?? '*',
                methods: ['GET', 'POST'],
                credentials: false
            }
        });

        // Initialize chat handler
        this.chatHandler = new ChatHandler(this.io);
        // Initialize notification handler
        this.notificationHandler = new NotificationHandler(this.io);

        // Handle connection errors
        this.io.on(SOCKET_EVENTS.ERROR, error => {
            console.error('Socket.IO error:', error);
        });

        console.log('Socket.IO initialized');
    }

    getIO(): Server {
        if (!this.io) {
            throw new CustomError(ResponseMessages.SOCKET.SOCKET_NOT_INITIALIZED, StatusCodes.FORBIDDEN);
        }
        return this.io;
    }
}

export const socketManager = SocketManager.getInstance();
