# Backend Setup & Usage

## 1. Prerequisites
- **Node.js** installed.
- **MySQL** installed and running on your local machine.

## 2. Configuration
The database connection settings are stored in the `.env` file. You **must** update this file to match your local MySQL setup.

1. Open `.env` in this directory.
2. Update the `DB_PASSWORD` field with your MySQL root password.
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=YOUR_ACTUAL_PASSWORD_HERE
   DB_NAME=iloas_db
   ```
   *If your MySQL user is not 'root', change `DB_USER` as well.*

## 3. Database Initialization
Before running the server, you need to create the database schema and default users. We have a script for this.

Run the following command in the terminal (inside the `backend` folder):
```bash
node seed.js
```
*If this fails with "Access denied", check your password in `.env` again.*

## 4. Running the Server
To start the backend in development mode (auto-restarts on changes):
```bash
npm run dev
```
The server will start on port **5000** (http://localhost:5000).

## 5. API Endpoints
- **POST /api/auth/login**: Login for Admin/Employee.
- **GET /api/tasks**: Get tasks.
- **POST /api/tasks**: Create task (Admin only).
- **PUT /api/tasks/:id**: Update task status.
