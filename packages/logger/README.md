# @repo/logger

Logger package for the Turborepo project providing a versatile and configurable logging solution.

## Features

- 📚 Supports multiple log levels
- 🖊️ Customizable log formats
- 🔗 Integration with various transports (e.g., console, file, remote)
- 🚀 High-performance logging
- 🧾 TypeScript support
- ⚙️ Environment-based configuration

---

## Folder structure

```
📁logger
├── 📁 dist/                         # Compiled output
├── 📁 node_modules/                 # Installed dependencies
├── 📁 src/                          # Source code
│ ├── 📁 tests/                      # Unit tests
│ ├── 📄 index.ts                    # Transport mechanisms for logging
├── 📄 README.md                     # Package documentation
├── 📄 package.json                  # Package configuration
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 tsup.config.ts                # TSUP build config
└── 📄 eslint.config.js              # ESLint configuration
```

---

## Prerequisites

- Node.js 20+

---

## Installation

1. Install the package in your project:

```bash
pnpm install @repo/logger
pnpm add @repo/logger@workspace:* --filter api (package name)
```

---

## Logger Configurations

### The package supports the following environment variables:

```bash
LOG_LEVEL='info'
ENABLE_FILE_LOG='true'
```

## Usage/Examples

```javascript
import { log } from '@repo/logger';

const logMessage = (message: string): void => {
    try {
        log.info('Logging info message:', message);
    } catch (error) {
        log.error('Logging error:', error);
        throw error;
    }
};

```

---

## Additional Commands

```bash
pnpm build                       # Compile the logger package
pnpm lint                        # Lint the source code
pnpm test                        # Run unit tests
```
