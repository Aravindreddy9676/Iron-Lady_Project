# Iron Lady - Internal Operations Automation System (ILOAS)

A premium internal tool for managing tasks and operations.

## Project Structure
- `frontend/`: React + Vite application (UI).
- `backend/`: Node.js + Express + MySQL application (API).

## Setup Instructions

### 1. Database Configuration
The system uses MySQL. You need to configure your database credentials.
1. Open `backend/.env`.
2. Update `DB_USER` and `DB_PASSWORD` to match your local MySQL installation.
   - Default assumes `root` with no password.
   - If you have a password, add it there.

### 2. Initialize Database
Once credentials are set, run the seed script to create the database and default users:
```bash
cd backend
node seed.js
```

### 3. Run the Application
You can run the backend and frontend in separate terminals.

**Backend:**
```bash
cd backend
npm run dev
```
Server runs on: [http://localhost:5000](http://localhost:5000)

**Frontend:**
```bash
cd frontend
npm run dev
```
App runs on: [http://localhost:5173](http://localhost:5173)

## Default Credentials
- **Admin**: `admin@ironlady.com` / `admin123`
- **Employee**: `employee@ironlady.com` / `emp123`
