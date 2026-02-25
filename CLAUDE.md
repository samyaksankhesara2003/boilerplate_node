# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Start dev server (builds + runs in watch mode)
pnpm start            # Start production server
pnpm build            # Build all packages
pnpm clean            # Remove all dist/ and build artifacts

# Code quality
pnpm lint             # Run ESLint (max-warnings: 0)
pnpm format           # Format with Prettier
pnpm check-types      # TypeScript type-check

# Tests
pnpm test             # Run all Jest tests

# Database
pnpm make-migration <name>        # Create migration file
pnpm migrate                      # Run pending migrations
pnpm rollback                     # Revert last migration
pnpm clear-db                     # Roll back all migrations
pnpm make-seed <name>             # Create seed file
pnpm run-seed                     # Run all seeds
pnpm run-specific-seed <file>     # Run a single seed

# Keys
pnpm generate-keys    # Generate JWT private/public key pair
```

## Architecture

This is a **Turborepo + pnpm monorepo** structured as:

- `apps/api/` — The single Express.js 5 API application
- `packages/` — 21 shared packages consumed by the app

### Request lifecycle

```
Request → Helmet/CORS/Compression → httpLogger → languageMiddleware
       → express.json() (skipped for Stripe webhooks)
       → /api → modules/index.ts router
             → /user   (userAuth middleware for protected routes)
             → /admin  (adminAuth middleware — also caches user in Redis)
             → /common (public)
       → Global errorHandler
```

### Module structure (`apps/api/src/modules/<domain>/`)

Each domain (user, admin, common) follows:

```
<domain>/index.ts          # Sub-router, wires up all feature routes
<domain>/<feature>/
  ├── index.ts             # Route definitions + middleware chains
  ├── controller.ts        # Request/response handling
  ├── service.ts           # Business logic
  ├── validation.ts        # Joi schema validation
  └── *.swagger.yaml       # OpenAPI docs for that feature
```

### Key shared packages

| Package                  | Purpose                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `@repo/config`           | Centralized typed config (app, db, JWT, Redis, SMTP, Stripe, Firebase, S3, Swagger) |
| `@repo/database`         | Knex connection + Objection.js models + migrations/seeds                            |
| `@repo/response-handler` | `sendResponse(res, statusCode, message, data?)` — used for all HTTP responses       |
| `@repo/tokens`           | JWT sign/verify using private/public key pair stored in `packages/tokens/src/keys/` |
| `@repo/redis`            | Redis client wrapper for caching and session data                                   |
| `@repo/logger`           | Winston-based logger                                                                |
| `@repo/firebase-auth`    | Firebase Admin SDK for social auth verification                                     |
| `@repo/validator`        | Shared Joi validation helpers                                                       |
| `@repo/i18n`             | i18next-based response message localization                                         |

### Database

- **MySQL 8.0** via **Knex.js** + **Objection.js**
- Migrations and seeds live in `packages/database/src/migrations/` and `packages/database/src/seeds/`
- All models extend `BaseModel` from `@repo/database`
- Run `pnpm generate-keys` before first run to create the JWT key pair

### Authentication

- **JWT** (RS256 private/public keys) — `Authorization: Bearer <token>`
- Token is stored on the `User` record; middleware validates the token matches what's in DB
- **Admin auth** additionally caches the admin user object in Redis (TTL = JWT expiration)
- **Firebase Auth** used for social login (Google, Facebook, Apple); auth type stored as enum (1=Email, 2=Phone, 3–5=social)

### API docs

Swagger UI at `/api-docs` (basic auth, credentials from config). Three separate specs:

- `/common-swagger.json` — public endpoints
- `/user-swagger.json` — user-facing endpoints
- `/admin-swagger.json` — admin endpoints

Swagger YAML files live alongside their routes as `*.swagger.yaml`.

### Environment setup

Copy `.env.example` to `.env` and populate. Required external services: MySQL 8.0, Redis, and optionally Stripe, Firebase, Twilio, AWS S3, and an SMTP server.
