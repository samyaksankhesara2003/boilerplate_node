# @repo/db

Database package for the Turborepo project using MySQL 8.0 with Knex.js and Objection.js.

## Features

- ✅ MySQL 8.0 database connection
- 🔧 Query building with Knex.js
- 🧠 ORM via Objection.js
- 🧾 TypeScript support
- 📤 Migration support
- 🌱 Seeding support
- ⚙️ Environment-based configuration

---

## Prerequisites

- Node.js 16+
- MySQL 8.0 server (or Docker)

---

## Installation

1. Install the package in your project:

```bash
pnpm install @repo/db
```

---

## DB Configurations

### The package requires the following environment variables:

```bash
DATABASE_USERNAME='root'
DATABASE_PASSWORD='user'
DATABASE_NAME='turbodb'
DATABASE_HOST='localhost'
DATABASE_PORT='3306'
DATABASE_LOG_QUERIES='true'
```

## Local Setup with Docker 🐳

### (1) Create a network if you haven't already

```bash
docker network create dev-net
```

### (2) Run MySQL 8.0 container

```bash
docker run --name dev-mysql
  --network dev-net
  -e MYSQL_ROOT_PASSWORD=user
  -e MYSQL_DATABASE=turbodb
  -e MYSQL_ROOT_HOST=%
  -p 3306:3306
  -d mysql:8.0
  --default-authentication-plugin=mysql_native_password
```

### (3) Run phpMyAdmin container

```bash
docker run --name dev-phpmyadmin \
  --network dev-net \
  -e PMA_HOST=dev-mysql \
  -e PMA_PORT=3306 \
  -p 8080:80 \
  -d phpmyadmin/phpmyadmin
```

### After running these commands:

- MySQL is running on port 3306
- PhpMyAdmin will be available at http://localhost:8080
    - Username : root
    - Password : user

---

## Usage/Examples

```javascript
import { your_database_name } from '@repo/db';

const insertUser = async (body: User): Promise<User> => {
    try {
        const userData = await Feedback.query().insert(body);

        return userData;
    } catch (error) {
        log.error('user insertion Catch: ', error);
        throw error;
    }
};

```

---

## Basic commands

```
project/
├── src/
│   ├── 📁components/    # Reusable UI components
│   │   📁├── Button/
│   │   📁└── Header/
│   ├── pages/         # Application screens
│   └── utils/        # Helper functions
├── public/           # Static assets
│   ├── images/
│   └── favicon.ico
└── README.md         # Project documentation
```
