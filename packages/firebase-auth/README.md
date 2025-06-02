# 📦 @repo/firebase-auth

A Firebase authentication utility for Express-based Node.js services. This package centralizes Firebase app initialization, user management, and token verification using the Firebase Admin SDK.

---

## 📁 Folder Structure

```
📦 firebase-auth/
├── 📁 .turbo/                      # Turborepo cache
├── 📁 dist/                        # Compiled output
├── 📁 node_modules/                # Dependencies
├── 📁 src/                         # Source code
│   ├── 📁 __tests__/               # Unit tests
│   ├── 📄 firebase.ts              # Firebase app and auth initializer
│   ├── 📄 firebaseService.ts       # Service layer: user management functions
│   ├── 📄 verifyFirebaseToken.ts   # Express middleware for token verification
│   └── 📄 index.ts                 # Barrel file for exports
├── 📄 eslint.config.js             # ESLint configuration
├── 📄 package.json                 # NPM metadata
├── 📄 README.md                    # Project documentation
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 tsup.config.ts               # tsup bundler configuration
├── 📄 turbo.json                   # Turborepo configuration
```

---

## ✨ Features Overview

| Feature                 | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| Firebase Initialization | Centralized and reusable Firebase app setup             |
| User Management         | Provides functions to get users, update passwords, etc. |
| Password Reset          | Generate secure password reset links                    |
| Token Verification      | Express middleware for verifying Firebase ID tokens     |
| TypeScript Support      | Strong typing for safer development                     |
| Turborepo Optimized     | Easily integrated into monorepo setups                  |
| Test Ready              | Structure supports easy unit testing                    |

---

## 📦 Installation

```bash
pnpm add @repo/firebase-auth --filter api
```

## Environment variables required

```bash
FIREBASE_AUTH_ACCOUNT_TYPE
FIREBASE_AUTH_PROJECT_ID
FIREBASE_AUTH_PRIVATE_KEY_ID
FIREBASE_AUTH_PRIVATE_KEY
FIREBASE_AUTH_CLIENT_EMAIL
FIREBASE_AUTH_CLIENT_ID
FIREBASE_AUTH_AUTH_URI
FIREBASE_AUTH_TOKEN_URI
FIREBASE_AUTH_PROVIDER_X509_CERT_URL
FIREBASE_AUTH_CLIENT_X509_CERT_URL
FIREBASE_AUTH_UNIVERSE_DOMAIN
```

---

### 📘 Example / Usage - 1

```ts
// Firebase Initialization
import { verifyFirebaseToken, initFirebase, getFirebaseAuth, verifyFirebaseToken } from '@repo/firebase-auth';

// Service Usage
import { firebaseService } from '@repo/firebase-auth';

// Middleware Usage
router.post('/social-signin', verifyFirebaseToken, authController.socialSignIn);
```

---

### 📘 Example / Usage -2

```ts
// Service Usage
import { firebaseService } from '@repo/firebase-auth';

// update password
await firebaseService.updateUserPassword(userDetails.social_id, password);

// reset password
const resetPasswordLink = await firebaseService.generatePasswordResetLink(
    userDetails.email,
    `${client_base_url}/${constants.userResetForgetLink}?email=${email}`
);

// get user
const getUserByEmail = await firebaseService.getUserByEmail(userDetails.email);
```
