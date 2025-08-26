# Freelance Time Tracker API

This is the backend API for a Freelance Time Tracker application. It allows users to register, log in, create and manage projects, and track time entries for those projects. This API is built with Node.js, Express, and uses MongoDB Atlas for the database.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Projects](#projects)
  - [Time Entries](#time-entries)
- [Testing the API](#testing-the-api)
  - [Register a New User](#register-a-new-user)
  - [Login a User](#login-a-user)
  - [Create a Project](#create-a-project)
  - [Get All Projects](#get-all-projects)
  - [Get Project by ID](#get-project-by-id)
  - [Update a Project](#update-a-project)
  - [Delete a Project](#delete-a-project)
  - [Create a Time Entry](#create-a-time-entry)
  - [Get All Time Entries](#get-all-time-entries)
  - [Get Time Entries by Project](#get-time-entries-by-project)
  - [Get Time Entries by User](#get-time-entries-by-user)
  - [Update a Time Entry](#update-a-time-entry)
  - [Delete a Time Entry](#delete-a-time-entry)

## Features

- User authentication (registration and login).
- CRUD (Create, Read, Update, Delete) operations for projects.
- CRUD operations for time entries associated with projects.
- Validation for all incoming data.

## Project Structure

```
Freelance_Time_Tracker
├─ config
│  └─ db.js
├─ controllers
│  ├─ auth.controller.js
│  ├─ project.controller.js
│  └─ timeEntry.controller.js
├─ index.js
├─ middlewares
│  ├─ auth.middleware.js
│  └─ validate.middleware.js
├─ models
│  ├─ project.model.js
│  ├─ timeEntry.model.js
│  └─ user.model.js
├─ package-lock.json
├─ package.json
├─ routes
│  ├─ auth.routes.js
│  ├─ project.routes.js
│  └─ timeEntry.routes.js
├─ services
│  └─ auth.service.js
├─ utils
|  |_ pdfGenerator.util.js
└─ validations
   ├─ auth.schema.js
   ├─ project.schema.js
   └─ timeEntry.schema.js

```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and a cluster set up.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/freelance-time-tracker.git
    cd freelance-time-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

1.  Create a `.env` file in the root directory of the project.
2.  Add your MongoDB Atlas connection string and a secret key for JWT to the `.env` file:

    ```
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret_key
    ```

    Replace `<username>`, `<password>`, `<cluster-url>`, `<database-name>`, and `your_jwt_secret_key` with your actual credentials and a secure secret key.

### Running the Application

Start the server with the following command:

```bash
npm start
The API will be running at http://localhost:3000 (or the port you have configured).
API Endpoints
Below is a list of all the available API endpoints.
Base URL: /
Authentication
Route: /auth
Method	Endpoint	Description
POST	/register	Register a new user.
POST	/login	Log in an existing user.
Projects
Route: /projects
Method	Endpoint	Description
POST	/	Create a new project.
GET	/	Get a list of all projects.
GET	/:id	Get a single project by its ID.
PUT	/:id	Update an existing project.
DELETE	/:id	Delete a project.
Time Entries
Route: /time
Method	Endpoint	Description
POST	/	Create a new time entry.
GET	/	Get all time entries.
GET	/project/:projectId	Get all time entries for a specific project.
GET	/user/:userId	Get all time entries for a specific user.
PUT	/:entryId	Update an existing time entry.
DELETE	/:entryId	Delete a time entry.
Testing the API
You can use tools like Postman or curl to test the API endpoints. Remember to replace placeholder IDs like :id, :projectId, :userId, and :entryId with actual IDs from your database. For protected routes, you will need to include the JWT token received upon login in the Authorization header as a Bearer token.
Register a New User
Endpoint: POST /auth/register
Request Body:
Generated json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
Use code with caution.
Json
Login a User
Endpoint: POST /auth/login
Request Body:
Generated json
{
  "email": "test@example.com",
  "password": "password123"
}
Use code with caution.
Json
Create a Project
Endpoint: POST /projects
Request Body:
Generated json
{
  "title": "Redesign Marketing Website",
  "description": "Complete overhaul of the company marketing site with new branding.",
  "status": "in progress",
  "priority": "high",
  "hourlyRate": "45"
}
Use code with caution.
Json
Get All Projects
Endpoint: GET /projects
Get Project by ID
Endpoint: GET /projects/:id
Update a Project
Endpoint: PUT /projects/:id
Request Body: (You can include any of the project fields you want to update)
Generated json
{
  "status": "completed",
  "priority": "medium"
}
Use code with caution.
Json
Delete a Project
Endpoint: DELETE /projects/:id
Create a Time Entry
Endpoint: POST /time
Request Body:
Generated json
{
  "projectId": "68821bb0a59f332a9a911edb",
  "userId": "6882143aefd7ae24c333eb8b",
  "startTime": "2025-07-24T09:00:00.000Z",
  "endTime":   "2025-07-24T12:30:00.000Z",
  "description": "Designed landing page mockups"
}
Use code with caution.
Json
Get All Time Entries
Endpoint: GET /time
Get Time Entries by Project
Endpoint: GET /time/project/:projectId
Get Time Entries by User
Endpoint: GET /time/user/:userId
Update a Time Entry
Endpoint: PUT /time/:entryId
Request Body: (You can include any of the time entry fields you want to update)
Generated json
{
  "description": "Updated the design based on feedback."
}
Use code with caution.
Json
Delete a Time Entry
Endpoint: DELETE /time/:entryId
Generated code
```
