# 📦 @repo/response-handler

A utility package to handle consistent API responses across services using Express. Includes tools for status codes, structured messages, and environment-aware error stacks.

---

## 📁 Folder Structure

```
📦 response-handler/
├── 📁 .turbo/                  # Turborepo cache
├── 📁 dist/                    # Compiled output
├── 📁 node_modules/            # Dependencies
├── 📁 src/                     # Source code
│   ├── 📁 __tests__/           # Test files
│   └── 📁 constants/           # Constants for response handling
│       ├── 📄 responseMessages.ts   # Centralized response message keys
│       ├── 📄 statusCodes.ts        # HTTP status code map
│       ├── 📄 customError.ts        # Custom error class
│       └── 📄 sendResponse.ts       # Main response utility
├── 📄 eslint.config.js         # ESLint config
├── 📄 package.json             # NPM metadata
├── 📄 README.md                # Project documentation
├── 📄 tsconfig.json            # TypeScript config
├── 📄 tsup.config.ts           # tsup bundler config
├── 📄 turbo.json               # Turborepo configuration
```

---

## ✨ Features Overview

| Feature                        | Description                                                         |
| ------------------------------ | ------------------------------------------------------------------- |
| Consistent Response Formatting | Standardized structure for all API responses                        |
| Multi-language Support         | Built-in integration with i18n for localized messages               |
| Custom Error Handling          | Extended Error class with status codes and environment-aware stacks |
| Type Safety                    | Full TypeScript support for all response types                      |
| Centralized Status Codes       | Easy-to-use HTTP status code constants                              |
| Development-Friendly           | Detailed error stacks in development, cleaned for production        |
| Turborepo Optimized            | Built for efficient monorepo usage                                  |
| Test Coverage                  | Includes comprehensive test suite                                   |

---

## 📦 Installation

```bash
pnpm add @repo/response-handler:* --filter api (package name)
```

---

### Example 1 : Declaring new constant

```ts
export const ResponseMessages = {
    USER: {
        NEW_CONSTANT: 'user.new_constant'
    }
};
```

#### ⭕ NOTE : Also add respective constant in @repo/i18n package

- File path : packages / i18n / src / locales

```ts
// Add new constant both in en.json and fr.json


// en.json
{
    "user": {
        "new_constant" : "This is message of new constant variable"
    },
}

// fr.json
{
    "user": {
        "new_constant" : "Ceci est le message d'une nouvelle variable constante"
    },
}
```

---

### Example 2 ( Usage )

```ts
// Example 1 : How to use functionality in code level

import { StatusCodes, ResponseMessages, sendResponse, CustomError } from '@repo/response-handler';

return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.USER.NEW_CONSTANT, data, language);

throw new CustomError(ResponseMessages.SERVER.SSL_CERTIFICATES_NOT_FOUND, StatusCodes.NOT_FOUND);
```

---
