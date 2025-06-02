# 📦 @repo/validator

A utility package for validating API requests using Joi schemas. Built to work seamlessly with Express, this package provides reusable validation middleware and predefined schema patterns such as pagination.

---

## 📁 Folder Structure

```
📦 validator/
├── 📁 .turbo/                      # Turborepo cache
├── 📁 dist/                        # Compiled output
├── 📁 node_modules/                # Dependencies
├── 📁 src/                         # Source code
│   ├── 📁 __tests__/               # Test files
│   └── 📁 common/                  # Shared validation logic
│       ├── 📄 paginationSchema.ts # Common schema for pagination
│       ├── 📄 validateRequest.ts  # Express middleware for request validation
│       └── 📄 index.ts            # Barrel file for exports
├── 📄 eslint.config.js            # ESLint config
├── 📄 package.json                # NPM metadata
├── 📄 README.md                   # Project documentation
├── 📄 tsconfig.json               # TypeScript config
├── 📄 tsup.config.ts              # tsup bundler config
├── 📄 turbo.json                  # Turborepo configuration
```

---

## ✨ Features Overview

| Feature                      | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| Joi Schema Support           | Use Joi for flexible schema-based validation           |
| Middleware Integration       | Plug-and-play middleware for Express                   |
| Pagination Schema            | Built-in schema for standardized pagination support    |
| Type Safety                  | Written in TypeScript for type-safe development        |
| Centralized Validation Logic | Clean and reusable validation strategy across services |
| Turborepo Optimized          | Built for efficient monorepo usage                     |
| Test Ready                   | Structure ready for validation tests                   |

---

## 📦 Installation

```bash
pnpm add @repo/validator --filter api
```

---

### 📘 Example / Usage

```ts
import { validateRequest } from '@repo/validator';

const updateUserSchema = {
    body: {
        id: Joi.number().required(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        profile_url: Joi.string().optional()
    }
};

router.patch('/:id', validateRequest(updateUserStatusSchema), userController.updateUserStatus);
```

---
