# College Blogs Link - Backend

## Overview

The backend of the College Blogs Link web application is built using Cloudflare Workers for a serverless architecture. It provides the API endpoints, authentication mechanisms, and data handling required for the functioning of the College Blogs platform. This backend is integrated with a Prisma ORM for efficient database operations and is written in TypeScript for type safety and enhanced development experience.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Serverless Architecture:** Utilizes Cloudflare Workers for scalable and efficient serverless deployment.
- **ORM Integration:** Prisma ORM for managing database operations with support for connection pooling.
- **Type Safety:** Written in TypeScript, ensuring strong typing and reducing runtime errors.
- **Data Validation:** ZOD validation integrated through a custom npm module to ensure robust data integrity.
- **JWT Authentication:** Secure user authentication using JSON Web Tokens (JWT).
- **Optimized Performance:** Backend operations are designed for efficiency, supporting rapid response times and scalable user management.

## Tech Stack

- **Cloudflare Workers:** Serverless backend deployment.
- **TypeScript:** Strongly typed JavaScript for improved code quality.
- **Prisma ORM:** Database management with efficient querying and connection pooling.
- **ZOD:** Schema-based validation for both frontend and backend.
- **JWT:** Authentication mechanism for secure user sessions.

## Configuration

### Environment Variables

Create a `.env` file in the root of the project to configure environment variables:

```plaintext
DATABASE_URL=your-database-connection-string
JWT_SECRET=your-jwt-secret
```
## API Documentation
### Authentication
- POST /api/v1/auth/signup: Register a new user.
- POST /api/v1/auth/signin: Authenticate a user and return a JWT.
### Blogs
- GET /api/v1/blogs: Fetch a list of all blogs.
- POST /api/v1/blogs: Create a new blog (requires authentication).
- GET /api/v1/blogs/
: Fetch a specific blog by its ID.
### Users
- GET /api/v1/users: Fetch a list of all users (requires admin authentication).
- GET /api/v1/users/
: Fetch a specific user by their ID.
(Additional API endpoints can be documented here as needed.)



