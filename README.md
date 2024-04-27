# Event Management Project

This project is built with Express, TypeScript, TypeORM, and Postgres, aimed at managing events efficiently.

## Running the Project

### Running Project in Docker Daemon

1. Make sure you have Docker installed and running.
2. Navigate to the project directory.
3. Run `docker-compose up` command.

### Running Project Locally

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm i` command to install dependencies.
4. Set up database settings inside `data-source.ts` file.
5. Run `npm start` command.

## Project Structure

- **`/src`**: Contains source code files.
  - **`/entity`**: Entity classes defining the database structure.
  - **`/handlers`**: Request handlers for different routes.
  - **`/middlewares`**: Middleware functions.
  - **`/routes`**: Route definitions.
  - **`data-source.ts`**: Database connection setup.
- **`package.json`**: Project configuration file.
- **`docker-compose.yml`**: Docker configuration for running the project with Postgres.

## Scripts

- **`npm run build`**: Builds the project.
- **`npm start`**: Starts the server after building.
- **`npm run dev`**: Starts the server in development mode with auto-reload (using nodemon).
- **`npm run kill`**: Kills the process running on port 3000.
- **`npm test`**: Runs tests (currently not implemented).
- **`npm run typeorm`**: Runs TypeORM CLI commands.

## Dependencies

- **Express**: Web framework for Node.js.
- **TypeORM**: ORM for TypeScript and JavaScript.
- **Postgres**: PostgreSQL database driver.
- **bcrypt**: Password hashing library.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **dotenv**: Loads environment variables from a `.env` file.
- And more...

## Routes

### Users

- **GET `/users`**: Get all users.
- **GET `/users/:id`**: Get a user by ID.
- **POST `/users`**: Create a new user.
- **PATCH `/users/:id`**: Update a user.
- **DELETE `/users/:id`**: Delete a user (requires authentication and admin privileges).
- **POST `/users/login`**: Login user.

### Events

- **POST `/events/create`**: Create a new event (requires authentication and admin privileges).
- **GET `/events/all`**: Get all events.
- **GET `/events/:id`**: Get an event by ID.

## Docker Configuration

The project can be run using Docker Compose, which sets up both the PostgreSQL database and the application.

## Environment Variables

- **`DB_HOST`**: Hostname of the PostgreSQL database.
- **`DB_USER`**: Username for connecting to the database.
- **`DB_PASSWORD`**: Password for connecting to the database.
- **`PORT`**: Port on which the server listens.

Make sure to set these variables according to your environment.

---
## Author:  Patsicko