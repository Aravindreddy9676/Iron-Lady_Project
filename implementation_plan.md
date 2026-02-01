# Iron Lady – Internal Operations Automation System (ILOAS) Implementation Plan

## 1. Project Setup
- [ ] Initialize project root structure.
- [ ] **Backend Setup (Node.js)**
    - [ ] Initialize `package.json`.
    - [ ] Install dependencies (`express`, `mysql2`, `cors`, `dotenv`, `bcrypt`, `jsonwebtoken`, `nodemon`).
    - [ ] Setup folder structure (`config`, `controllers`, `routes`, `middleware`, `utils`).
- [ ] **Frontend Setup (React + Vite)**
    - [ ] Initialize React app using Vite.
    - [ ] Install dependencies (`axios`, `react-router-dom`, `lucide-react`, `framer-motion`).
    - [ ] Clean up default boilerplate.

## 2. Database Design (MySQL)
- [ ] Design Schema:
    - [ ] **Users Table**: `id`, `name`, `email`, `password_hash`, `role` (Admin/Employee), `created_at`.
    - [ ] **Tasks Table**: `id`, `title`, `description`, `priority` (Low/Medium/High), `status` (Pending/In Progress/Completed/Approved/Rejected), `assigned_to` (User FK), `created_by` (User FK), `due_date`, `created_at`, `updated_at`.
    - [ ] **ActivityLogs Table**: `id`, `task_id` (FK), `user_id` (FK), `action`, `timestamp`.
- [ ] Create `schema.sql` file for setup.

## 3. Backend Development
- [ ] **Database Connection**: Configure `config/db.js` using `mysql2/promise`.
- [ ] **Authentication**:
    - [ ] Implement `POST /api/auth/login`.
    - [ ] Implement middleware for role-based access control (Admin vs Employee).
- [ ] **Task Management (CRUD)**:
    - [ ] `POST /api/tasks` (Admin only).
    - [ ] `GET /api/tasks` (Admin: all, Employee: assigned only).
    - [ ] `PUT /api/tasks/:id` (Update status/remarks).
    - [ ] `DELETE /api/tasks/:id` (Admin only).
- [ ] **Activity Logging**:
    - [ ] Middleware or helper function to log actions automatically on task updates.

## 4. Frontend Development
- [ ] **Design System (Vanilla CSS)**:
    - [ ] Define CSS variables for colors (Premium/Rich palette: Deep Blues, Vibrant Accents), typography (Google Fonts: Inter/Outfit), and transitions.
    - [ ] Create base styles (reset, layout utilities).
- [ ] **Components**:
    - [ ] `Button`, `Input`, `Card`, `Badge` (for status/priority), `Modal`.
    - [ ] `Sidebar` or `Navbar` for navigation.
- [ ] **Pages**:
    - [ ] **Login Page**: Modern glassmorphism design.
    - [ ] **Admin Dashboard**: Task overview, Create Task modal, Table view of all tasks, Activity Log feed.
    - [ ] **Employee Dashboard**: Kanban or List view of assigned tasks, Status update controls.
- [ ] **Integration**:
    - [ ] Connect React pages to Node.js APIs using `axios` and `Context API` for auth state.

## 5. Polish & Refine
- [ ] Add micro-animations (hover effects, page transitions).
- [ ] Ensure responsive design for mobile/tablet.
- [ ] Test SEO meta tags (Title, Description).
- [ ] Final code cleanup and comments.
