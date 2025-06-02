# @repo/notifications

A real-time notification module that provides instant notification delivery using WebSocket connections. This module integrates with the socket service to handle real-time notification delivery to users.

---

## 📁 Folder Structure

```
📂 notifications/
├── 📁 dist/                  # Compiled output
├── 📁 node_modules/          # Dependencies
├── 📂 src
│   ├── 📂 constants
│   │   └── 📄 index.ts
│   ├── 📂 services           # Handle notification related service
│   │   └── 📄 notification.service.ts
│   ├── 📂 socket             # Handle notification events
│   │   └── 📄 notification.socket.ts
│   ├── 📂 types              # Types
│   │   └── 📄 index.ts
│   └── 📄 index.ts
├── 📁 .turbo/                # Turbo repo metadata
├── 📄 eslint.config.js       # ESLint configuration
├── 📄 package.json           # NPM package metadata
├── 📄 README.md              # Project documentation
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 tsup.config.ts         # tsup bundler config
└── 📄 turbo.json             # Turborepo configuration

```

---

## Installation

1. Install the package in your project:

```bash
pnpm add @repo/notification@workspace:* --filter api ( package name )
```

---

## ✨ Features

- Real-time notification delivery
- Notification persistence
- Notification preferences
- Read/unread status tracking
- Notification grouping

---

## Usage

```typescript
import { NotificationHandler } from '@repo/notification';
import { socketManager } from '@repo/socket';

// Notification handler is automatically initialized by socket manager
const io = socketManager.getIO();

// Use notification handler for notification operations
const notificationHandler = new NotificationHandler(io);
```

---

## Integration

This module:
- Uses the socket module for real-time communication
- Can be integrated with various notification sources
- Handles notification delivery and status updates
- Manages notification preferences

---

## Notification Types

The module supports various notification types:
- System notifications
- User notifications
- Alert notifications
- Custom notifications

---

## Events

The module handles various notification-related events:
- Notification delivery
- Read status updates
- Notification preferences
- Notification history
- Notification grouping 