import { Server } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/events';
import { ChatHandler } from './chat.handler';

export class SocketManager {
  private static instance: SocketManager;
  private io: Server | null = null;
  private chatHandler: ChatHandler | null = null;

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
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: false,
      },
    });

    // Initialize chat handler
    this.chatHandler = new ChatHandler(this.io);

    // Handle connection errors
    this.io.on(SOCKET_EVENTS.ERROR, (error) => {
      console.error('Socket.IO error:', error);
    });

    console.log('Socket.IO initialized');
  }

  getIO(): Server {
    if (!this.io) {
      throw new Error('Socket.IO is not initialized');
    }
    return this.io;
  }
}

export const socketManager = SocketManager.getInstance(); 