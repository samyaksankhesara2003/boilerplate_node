# @repo/config

Centralized configuration package for the Turborepo project. This package contains configuration setups for various shared services and tools used across the monorepo.

## Features

- 🛠 Centralized configuration management
- 🔐 Environment-based settings
- 📦 Easily extendable for future services
- 🧩 Type-safe and consistent config structure
- 📄 Built with TypeScript

---

## Folder structure

```
📁config
├── 📁 dist/                         # Compiled output
├── 📁 node_modules/                 # Installed dependencies
├── 📁 src/*                         # Source code ( packages config files )
├── 📄 README.md                     # Package documentation
├── 📄 package.json                  # Package configuration
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 tsup.config.ts                # TSUP build config
└── 📄 eslint.config.js              # ESLint configuration
```

---

## Prerequisites

- Node.js 22 +

---

## Installation

1. Install the package in your project:

```bash
pnpm add @repo/config@workspace:* --filter api ( package name )
```

---

#### Currently, the package includes configuration support for the following services

- ✅ Redis
- ✅ Mailer
- ✅ Storage
- ✅ Stripe
- ✅ Predefined constants
- ✅ Firebase
- ✅ Swagger
- ✅ JWT
- ✅ SMS
- .. Etc

---

## Local Setup

No special local setup required—just import and use the configuration files as needed in your services.
