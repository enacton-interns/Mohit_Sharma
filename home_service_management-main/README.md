# Home Service Management API

A modular, scalable backend API for managing home service providers, customers, and service requests. Built with Node.js, Express, Prisma ORM, and secure JWT authentication with password hashing for user management.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [Key Benefits](#key-benefits)
- [Setup & Running the Application](#setup--running-the-application)
- [Folder Structure Details](#folder-structure-details)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [API Endpoints Overview](#api-endpoints-overview)
- [Adding New Features](#adding-new-features)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

This project provides the backend for a Home Service Management system allowing customers to request services from providers across various categories such as cleaning, plumbing, electrical work, laundry, cooking, and more. It features:

- **User management** for customers and providers.
- **Service request lifecycle** handling with scheduling and status updates.
- **Feedback system** to rate providers.
- **Recurring service scheduling.**
- **JWT based authentication** securing protected resources.
- **Password hashing** with bcrypt for security.
- Developed using **Express.js** for routing, **Prisma** for ORM, **MySQL** database, and **TypeScript** for type safety.

---

## Architecture & Folder Structure

```
Home Service Management
├─ generated
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  ├─ 20250807065412_first_migration
│  │  │  └─ migration.sql
│  │  ├─ 20250807081526_changes
│  │  │  └─ migration.sql
│  │  ├─ 20250807083553_add_skill_name_unique
│  │  │  └─ migration.sql
│  │  ├─ 20250807114516_new_auth_approach_jwy
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ src
│  ├─ auth
│  │  ├─ auth.controller.ts
│  │  ├─ auth.routes.ts
│  │  ├─ auth.service.ts
│  │  ├─ jwt.middleware.ts
│  │  └─ utils
│  │     └─ token.util.ts
│  ├─ db
│  │  └─ prismaClient.ts
│  ├─ index.ts
│  ├─ middleware
│  │  └─ errorHandler.ts
│  ├─ modules
│  │  ├─ customers
│  │  │  ├─ dto
│  │  │  │  └─ user.dto.ts
│  │  │  ├─ user.controller.ts
│  │  │  ├─ user.routes.ts
│  │  │  └─ user.service.ts
│  │  ├─ feedback
│  │  │  ├─ dto
│  │  │  │  └─ feedback.dto.ts
│  │  │  ├─ feedback.controller.ts
│  │  │  ├─ feedback.routes.ts
│  │  │  └─ feedback.service.ts
│  │  ├─ providers
│  │  │  ├─ dto
│  │  │  │  └─ provider.dto.ts
│  │  │  ├─ provider.controller.ts
│  │  │  ├─ provider.routes.ts
│  │  │  └─ provider.service.ts
│  │  └─ requests
│  │     ├─ dto
│  │     │  └─ request.dto.ts
│  │     ├─ request.controller.ts
│  │     ├─ request.routes.ts
│  │     └─ request.service.ts
│  └─ utils
│     └─ errors.ts
└─ tsconfig.json

```

---

## Key Benefits

### 1. Separation of Concerns

- Authentication isolated in `src/auth`.
- Business logic encapsulated inside services per domain module.
- Controllers handle HTTP requests/responses separately.
- DTOs define clear data interfaces for validation and transfer.
- Middlewares centralize cross-cutting concerns like authentication and error handling.

### 2. Scalability & Team Collaboration

- Modular structure facilitates independent development on features like customers, providers, requests.
- Easy onboarding for new developers through consistent and intuitive organization.
- Platform can be split into microservices by domain modules in the future if needed.

### 3. Testability & Reusability

- Services contain pure business logic that is easy to unit test without web server dependencies.
- Controllers remain lightweight, only dealing with HTTP abstractions.
- Utility modules provide reusable helpers (e.g., token handling).

### 4. Maintainability & Consistency

- Clear naming conventions (`*.service.ts`, `*.controller.ts`, `*.routes.ts`, `*.dto.ts`) improve readability.
- Centralized authentication middleware reduces duplication.
- Error handling middleware ensures consistent API error responses.

### 5. Clear Request Lifecycle

- Express `index.ts` wires middleware, routes, and error handling in a clear flow.
- Protected routes guarded by JWT middleware for secure access.
- Public routes like authentication are clearly separated.

### 6. Future-Proof & Extensible

- New domains (payments, notifications) can be added by replicating the module pattern.
- Switching tech stacks or adding GraphQL can be accommodated with minimal disruption.
- Cross-cutting features (logging, validation) plug in centrally via middleware or utility modules.

---

## Setup & Running the Application

1. **Clone the repository**

git clone <repository-url>
cd home-service-management

2. **Install dependencies**

npm install

3. **Environment variables**

Create a `.env` file in the root or in `src/config/` (depending on your setup) with the following minimum:

DATABASE_URL="mysql://user:password@localhost:3306/dbname"
JWT_SECRET="yourStrongJWTSecretKey"
NODE_ENV="development"

4. **Apply database migrations**

npx prisma migrate dev

5. **Start the development server**

npm run dev

6. **Test API Endpoints**

Use Postman or any REST client to access endpoints like:

- `POST /api/auth/register` to create a user.
- `POST /api/auth/login` to authenticate.
- Other protected routes under `/api/customers`, `/api/providers`, `/api/requests`, etc.

---

## Folder Structure Details

- **`src/auth`**  
  Handles authentication flow including registration, login, JWT signing and verification, and JWT middleware.

- **`src/db`**  
  Contains the Prisma client instance for database operations.

- **`src/middleware`**  
  Cross-cutting middlewares like centralized error handler.

- **`src/modules`**  
  Contains modular domain feature folders each with DTOs, controllers, routes, and services.

- **`src/utils`**  
  General utilities such as custom error classes or logger utilities.

- **`src/index.ts`**  
  The Express app entry point wiring all routes and middleware.

---

## Database Schema

- Uses Prisma ORM models to represent Users, Service Providers, Skills, Service Requests, Feedback, and RecurringSchedules.
- Users store hashed passwords (`password` field) for authentication.
- Many-to-many relations handled between Providers and Skills.
- Enums restrict service types, request statuses, and recurrence types for data integrity.
- Auditing fields track creation and update timestamps.

---

## Authentication Flow

- User registration hashes and stores passwords securely.
- On successful registration/login, a JWT token is generated and sent as an HTTP-only cookie.
- Protected endpoints use JWT middleware to verify token from cookies to authorize requests.
- Token expiry handled with configurable expiration times.

---

## API Endpoints Overview (examples)

| Method | Path               | Description                    | Auth Required |
| ------ | ------------------ | ------------------------------ | ------------- |
| POST   | /api/auth/register | Register a new user            | No            |
| POST   | /api/auth/login    | Authenticate and receive token | No            |
| GET    | /api/customers     | Get all customers              | Yes           |
| GET    | /api/customers/:id | Get customer by ID             | Yes           |
| POST   | /api/requests      | Create a new service request   | Yes           |
| PUT    | /api/requests/:id  | Update a service request       | Yes           |
| POST   | /api/feedback      | Submit feedback for a request  | Yes           |

_Refer to each module’s routes file for full details._

---

## Adding New Features

1. Create a new module directory under `src/modules/`.
2. Add DTOs defining request and response data shapes.
3. Implement service for business logic.
4. Create a controller to handle HTTP requests.
5. Define routes for endpoints.
6. Wire the new module router in `src/index.ts`.
7. Write unit and integration tests.

Reuse shared utilities and middleware wherever applicable to maintain uniform behavior.

---

## Testing

- Write **unit tests** targeting services to verify business rules.
- Write **integration tests** for API endpoints including authentication and authorization.
- Use mocks/stubs for Prisma access to isolate tests.
- Run tests with your favorite framework (e.g., Jest or Mocha).

---

## Future Enhancements

- Role-based access control (RBAC) and permissions.
- Rate limiting and request throttling.
- Enhanced logging and monitoring with correlation IDs.
- GraphQL API alongside REST for richer querying.
- Background job processing (e.g., notifications, recurring tasks).
- Microservice extraction of specific modules.

---

## Contributing

Contributions are welcome!

- Follow the established folder and naming conventions.
- Write tests for new features or bug fixes.
- Open issues or pull requests with clear descriptions.

---

## License

This project is licensed under the ISC License.

---

_Happy coding and managing your home services efficiently!_

---
