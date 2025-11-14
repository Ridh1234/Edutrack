# EduTrack - Complete Technical Documentation

**Version:** 0.1.0  
**Last Updated:** November 14, 2025  
**Author:** Senior Development Team

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Data Flow & Application Flow](#data-flow--application-flow)
6. [Database Schema & Relationships](#database-schema--relationships)
7. [Authentication & Authorization](#authentication--authorization)
8. [API Documentation](#api-documentation)
9. [Frontend Architecture](#frontend-architecture)
10. [File Upload & Storage](#file-upload--storage)
11. [Environment Configuration](#environment-configuration)
12. [Setup & Installation](#setup--installation)
13. [Development Workflow](#development-workflow)
14. [Security Considerations](#security-considerations)
15. [Performance Optimization](#performance-optimization)
16. [Testing Strategy](#testing-strategy)
17. [Deployment Guide](#deployment-guide)
18. [Troubleshooting](#troubleshooting)
19. [Future Enhancements](#future-enhancements)

---

## Executive Summary

**EduTrack** is a full-stack web application designed to streamline classroom management by enabling teachers to create assignments and students to submit their work digitally. The platform provides role-based access control, secure file uploads, grading functionality, and real-time progress tracking.

### Key Features

- **Role-Based Authentication**: JWT-based authentication with teacher and student roles
- **Assignment Management**: Teachers can create, update, and delete assignments
- **Submission System**: Students can upload assignment files with deadline tracking
- **Grading & Feedback**: Teachers can grade submissions and provide detailed feedback
- **Progress Tracking**: Real-time dashboards for both teachers and students
- **Secure File Storage**: Multi-part form uploads with file validation
- **Responsive Design**: Modern UI with Tailwind CSS for all device sizes

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │   Next.js 14 Frontend (TypeScript + React)         │     │
│  │   - App Router (Server & Client Components)        │     │
│  │   - Tailwind CSS for Styling                       │     │
│  │   - Context API for State Management               │     │
│  └────────────────────────────────────────────────────┘     │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST API
                            │ (JSON + FormData)
┌───────────────────────────▼─────────────────────────────────┐
│                   APPLICATION LAYER                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │   Express.js API Server (Node.js)                  │     │
│  │   - RESTful Routes                                 │     │
│  │   - JWT Middleware                                 │     │
│  │   - Input Validation (express-validator)           │     │
│  │   - File Upload Handler (Multer)                   │     │
│  │   - Security (Helmet, CORS)                        │     │
│  └────────────────────────────────────────────────────┘     │
└───────────────────────────┬─────────────────────────────────┘
                            │ ORM (Sequelize)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │   MySQL Database                                   │     │
│  │   - Users (Teachers & Students)                    │     │
│  │   - Assignments                                    │     │
│  │   - Submissions                                    │     │
│  │   - Referential Integrity via Foreign Keys         │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   FILE STORAGE LAYER                         │
│  ┌────────────────────────────────────────────────────┐     │
│  │   Local File System                                │     │
│  │   - /backend/uploads/                              │     │
│  │   - Static file serving via Express                │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
┌──────────────────────────────────────────────────────┐
│                   FRONTEND                            │
├──────────────────────────────────────────────────────┤
│  Pages (App Router)                                  │
│  ├─ / (Home/Landing)                                 │
│  ├─ /register (User Registration)                    │
│  ├─ /login (Authentication)                          │
│  ├─ /dashboard (Role-specific Dashboard)             │
│  └─ /grades (Grade Overview)                         │
├──────────────────────────────────────────────────────┤
│  Components                                          │
│  ├─ Navbar (Navigation)                              │
│  ├─ AssignmentCard (Assignment Display)              │
│  └─ FileUploadForm (File Submission)                 │
├──────────────────────────────────────────────────────┤
│  Context                                             │
│  └─ AuthContext (Global Auth State)                 │
├──────────────────────────────────────────────────────┤
│  API Client                                          │
│  └─ apiFetch (HTTP Client with Auth)                │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│                    BACKEND                            │
├──────────────────────────────────────────────────────┤
│  Routes                                              │
│  ├─ /api/auth (Authentication Routes)                │
│  ├─ /api/assignments (Assignment CRUD)               │
│  └─ /api/submissions (Submission Management)         │
├──────────────────────────────────────────────────────┤
│  Controllers                                         │
│  ├─ auth.js (Register, Login)                        │
│  ├─ assignment.js (CRUD Operations)                  │
│  └─ submission.js (Submit, Grade, Feedback)          │
├──────────────────────────────────────────────────────┤
│  Middleware                                          │
│  └─ authMiddleware (JWT Verification & RBAC)        │
├──────────────────────────────────────────────────────┤
│  Models (Sequelize ORM)                              │
│  ├─ User (Teacher/Student)                           │
│  ├─ Assignment                                       │
│  └─ Submission                                       │
└──────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2.10 | React framework with SSR & App Router |
| **React** | 18.3.1 | UI component library |
| **TypeScript** | 5.6.3 | Type-safe JavaScript |
| **Tailwind CSS** | 3.4.13 | Utility-first CSS framework |
| **Context API** | Built-in | Global state management |

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express** | 5.1.0 | Web application framework |
| **Sequelize** | 6.37.7 | ORM for database operations |
| **MySQL2** | 3.15.3 | MySQL client for Node.js |
| **JWT** | 9.0.2 | Authentication tokens |
| **Bcrypt** | 6.0.0 | Password hashing |
| **Multer** | 2.0.2 | File upload middleware |
| **Helmet** | 8.1.0 | Security headers |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Morgan** | 1.10.1 | HTTP request logger |

### Database

| Technology | Version | Purpose |
|------------|---------|---------|
| **MySQL** | 8.0+ | Relational database |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Nodemon** | Auto-restart development server |
| **dotenv** | Environment variable management |

---

## Project Structure

```
EduTrack/
├── backend/                          # Node.js/Express API
│   ├── src/
│   │   ├── app.js                    # Express app configuration
│   │   ├── config/
│   │   │   └── db.js                 # Database connection config
│   │   ├── controllers/
│   │   │   ├── auth.js               # Authentication logic
│   │   │   ├── assignment.js         # Assignment CRUD logic
│   │   │   └── submission.js         # Submission handling logic
│   │   ├── middleware/
│   │   │   └── authMiddleware.js     # JWT verification & RBAC
│   │   ├── models/
│   │   │   ├── index.js              # Model associations
│   │   │   ├── User.js               # User model (Teacher/Student)
│   │   │   ├── Assignment.js         # Assignment model
│   │   │   └── Submission.js         # Submission model
│   │   └── routes/
│   │       ├── auth.js               # Auth routes
│   │       ├── assignment.js         # Assignment routes
│   │       └── submission.js         # Submission routes
│   ├── uploads/                      # File storage directory
│   ├── server.js                     # Entry point
│   ├── package.json                  # Dependencies
│   ├── eslint.config.mjs             # ESLint configuration
│   └── README.md                     # Backend documentation
│
├── frontend/                         # Next.js application
│   ├── app/
│   │   ├── layout.tsx                # Root layout with AuthProvider
│   │   ├── page.tsx                  # Landing page
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   ├── register/
│   │   │   └── page.tsx              # Registration page
│   │   ├── dashboard/
│   │   │   └── page.tsx              # User dashboard (role-based)
│   │   └── grades/
│   │       └── page.tsx              # Grades overview
│   ├── components/
│   │   ├── Navbar.tsx                # Navigation component
│   │   ├── AssignmentCard.tsx        # Assignment display card
│   │   └── FileUploadForm.tsx        # File upload component
│   ├── context/
│   │   └── AuthContext.tsx           # Authentication context
│   ├── lib/
│   │   └── api.ts                    # API client utility
│   ├── styles/
│   │   └── globals.css               # Global styles
│   ├── package.json                  # Dependencies
│   ├── next.config.mjs               # Next.js configuration
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   └── README.md                     # Frontend documentation
│
├── database/                         # Database setup
│   ├── schema.sql                    # Database schema
│   ├── seed.sql                      # Seed data
│   ├── connect.js                    # Connection test script
│   ├── package.json                  # Database utilities
│   └── README.md                     # Database documentation
│
└── README.md                         # Root project documentation
```

---

## Data Flow & Application Flow

### 1. User Registration Flow

```
┌─────────┐      ┌──────────┐      ┌────────────┐      ┌──────────┐
│ Browser │─────▶│ /register│─────▶│POST /api/  │─────▶│  MySQL   │
│         │      │   Page   │      │auth/       │      │ Database │
│         │      │          │      │register    │      │          │
└─────────┘      └──────────┘      └────────────┘      └──────────┘
    │                                    │
    │  1. User fills form                │  2. Validate input
    │                                    │  3. Hash password (bcrypt)
    │                                    │  4. Create user record
    │                                    │
    │  5. Return user data               │
    │◀───────────────────────────────────┘
    │  6. Redirect to /login
```

**Detailed Steps:**
1. User navigates to `/register`
2. User fills out registration form (name, email, password, role)
3. Frontend sends POST request to `/api/auth/register`
4. Backend validates input using `express-validator`
5. Backend checks if email already exists
6. Password is hashed using bcrypt (10 salt rounds)
7. User record is created in MySQL database
8. Success response with user data (excluding password)
9. User redirected to login page

### 2. Authentication Flow

```
┌─────────┐      ┌──────────┐      ┌────────────┐      ┌──────────┐
│ Browser │─────▶│  /login  │─────▶│POST /api/  │─────▶│  MySQL   │
│         │      │   Page   │      │auth/login  │      │ Database │
│         │      │          │      │            │      │          │
└─────────┘      └──────────┘      └────────────┘      └──────────┘
    │                                    │
    │  1. Submit credentials             │  2. Find user by email
    │                                    │  3. Compare password hash
    │                                    │  4. Generate JWT token
    │                                    │     (expires in 2 hours)
    │  5. Return { token, user }         │
    │◀───────────────────────────────────┘
    │  6. Store in localStorage
    │  7. Update AuthContext
    │  8. Redirect to /dashboard
```

**Detailed Steps:**
1. User enters email and password on `/login`
2. Frontend sends POST request to `/api/auth/login`
3. Backend queries database for user by email
4. Backend compares submitted password with stored hash using bcrypt
5. If valid, generate JWT token with payload: `{ id, role }`, expires in 2 hours
6. Return token and user object to frontend
7. Frontend stores token and user in localStorage
8. AuthContext is updated with authenticated state
9. User redirected to dashboard

### 3. Assignment Creation Flow (Teacher)

```
┌─────────┐      ┌──────────┐      ┌────────────┐      ┌──────────┐
│ Teacher │─────▶│/dashboard│─────▶│POST /api/  │─────▶│  MySQL   │
│ Browser │      │          │      │assignments │      │ Database │
│         │      │          │      │            │      │          │
└─────────┘      └──────────┘      └────────────┘      └──────────┘
    │                                    │
    │  1. Fill assignment form           │  2. Verify JWT token
    │     (title, description, due date) │  3. Check role = teacher
    │                                    │  4. Create assignment
    │                                    │     with teacher_id
    │  5. Return new assignment          │
    │◀───────────────────────────────────┘
    │  6. Update UI with new assignment
```

**Detailed Steps:**
1. Teacher navigates to dashboard
2. Teacher fills out assignment creation form
3. Frontend sends POST request to `/api/assignments` with JWT token in Authorization header
4. Backend middleware verifies JWT token
5. Backend middleware checks user role is 'teacher'
6. Backend creates assignment record with `teacher_id` from token
7. Assignment stored in database
8. Success response with assignment data
9. Frontend updates UI to show new assignment

### 4. Submission Flow (Student)

```
┌─────────┐      ┌──────────┐      ┌────────────┐      ┌──────────┐
│ Student │─────▶│/dashboard│─────▶│POST /api/  │─────▶│  MySQL   │
│ Browser │      │          │      │submissions │      │ Database │
│         │      │          │      │            │      │          │
└─────────┘      └──────────┘      └────────────┘      └──────────┘
    │                                    │                    │
    │  1. Select assignment              │                    │
    │  2. Upload file (FormData)         │  3. Verify JWT     │
    │                                    │  4. Check role     │
    │                                    │  5. Multer saves   │
    │                                    │     file to disk   │
    │                                    │  6. Create         │
    │                                    │     submission     │
    │                                    │     record         │
    │  7. Return submission data         │                    │
    │◀───────────────────────────────────┘                    │
    │  8. Show success message                                │
```

**Detailed Steps:**
1. Student views available assignments on dashboard
2. Student selects an assignment and uploads a file
3. Frontend sends POST request to `/api/submissions` with:
   - FormData containing the file
   - Assignment ID
   - JWT token in header
4. Backend middleware verifies JWT and checks role = 'student'
5. Multer middleware processes file upload:
   - Saves file to `/backend/uploads/` directory
   - Generates unique filename with timestamp
6. Backend creates submission record in database:
   - `student_id` from JWT token
   - `assignment_id` from request
   - `file_path` from uploaded file
   - `submitted_at` set to current timestamp
7. Success response with submission data
8. Frontend shows success notification

### 5. Grading Flow (Teacher)

```
┌─────────┐      ┌──────────┐      ┌────────────┐      ┌──────────┐
│ Teacher │─────▶│/dashboard│─────▶│PATCH /api/ │─────▶│  MySQL   │
│ Browser │      │          │      │submissions │      │ Database │
│         │      │          │      │/:id/grade  │      │          │
└─────────┘      └──────────┘      └────────────┘      └──────────┘
    │                                    │
    │  1. View student submissions       │  2. Verify JWT token
    │  2. Enter grade & feedback         │  3. Check role = teacher
    │                                    │  4. Verify teacher owns
    │                                    │     the assignment
    │                                    │  5. Update submission:
    │                                    │     - grade
    │                                    │     - feedback
    │  6. Return updated submission      │
    │◀───────────────────────────────────┘
    │  7. Update UI with grade
```

**Detailed Steps:**
1. Teacher views submissions for their assignments
2. Teacher enters grade (decimal) and feedback (text)
3. Frontend sends PATCH request to `/api/submissions/:id/grade`
4. Backend verifies JWT token and teacher role
5. Backend verifies that the submission's assignment belongs to the teacher
6. Backend updates submission record with grade and feedback
7. Success response with updated submission
8. Frontend updates UI to reflect grading

### 6. Complete Request Lifecycle

```
HTTP Request
     │
     ▼
┌──────────────────────────┐
│  Express Middleware      │
│  Chain                   │
├──────────────────────────┤
│  1. helmet()             │  ◀─ Security headers
│  2. cors()               │  ◀─ CORS policy
│  3. express.json()       │  ◀─ Parse JSON body
│  4. morgan()             │  ◀─ Request logging
└──────────────────────────┘
     │
     ▼
┌──────────────────────────┐
│  Route Matching          │
│  /api/assignments        │
└──────────────────────────┘
     │
     ▼
┌──────────────────────────┐
│  authMiddleware          │  ◀─ JWT verification
│  (if protected route)    │      Role checking
└──────────────────────────┘
     │
     ▼
┌──────────────────────────┐
│  Validation Middleware   │  ◀─ express-validator
│  (if applicable)         │
└──────────────────────────┘
     │
     ▼
┌──────────────────────────┐
│  Controller Function     │  ◀─ Business logic
│  - Query database        │
│  - Process data          │
└──────────────────────────┘
     │
     ▼
┌──────────────────────────┐
│  Response                │
│  res.json(data)          │
└──────────────────────────┘
     │
     ▼
HTTP Response
```

---

## Database Schema & Relationships

### Entity Relationship Diagram

```
┌─────────────────────────┐
│        USER             │
├─────────────────────────┤
│ PK: id (INT UNSIGNED)   │
│     name (VARCHAR 100)  │
│     email (VARCHAR 150) │◀────────┐
│     password_hash       │         │
│     role (ENUM)         │         │
│       - teacher         │         │
│       - student         │         │
└─────────────────────────┘         │
         │                           │
         │ 1:N                       │ 1:N
         │ (teacher_id)              │ (student_id)
         │                           │
         ▼                           │
┌─────────────────────────┐         │
│     ASSIGNMENT          │         │
├─────────────────────────┤         │
│ PK: id (INT UNSIGNED)   │         │
│     title (VARCHAR 200) │         │
│     description (TEXT)  │         │
│     due_date (DATETIME) │         │
│ FK: teacher_id          │         │
└─────────────────────────┘         │
         │                           │
         │ 1:N                       │
         │ (assignment_id)           │
         │                           │
         ▼                           │
┌─────────────────────────┐         │
│     SUBMISSION          │         │
├─────────────────────────┤         │
│ PK: id (INT UNSIGNED)   │         │
│     file_path           │         │
│     grade (DECIMAL 5,2) │         │
│     feedback (TEXT)     │         │
│     submitted_at        │         │
│ FK: student_id          │─────────┘
│ FK: assignment_id       │
└─────────────────────────┘
```

### Table Definitions

#### 1. **User Table**

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| name | VARCHAR(100) | NOT NULL | User's full name |
| email | VARCHAR(150) | NOT NULL, UNIQUE | User's email (login) |
| password_hash | VARCHAR(100) | NOT NULL | Bcrypt hashed password |
| role | ENUM('teacher','student') | NOT NULL | User role for RBAC |

**Indexes:**
- Primary Key on `id`
- Unique Index on `email`

#### 2. **Assignment Table**

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique assignment identifier |
| title | VARCHAR(200) | NOT NULL | Assignment title |
| description | TEXT | NULL | Assignment details |
| due_date | DATETIME | NULL | Submission deadline |
| teacher_id | INT UNSIGNED | NOT NULL, FOREIGN KEY | Creator of assignment |

**Foreign Keys:**
- `teacher_id` REFERENCES `user(id)` ON DELETE CASCADE

**Indexes:**
- Primary Key on `id`
- Index on `teacher_id`

#### 3. **Submission Table**

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Unique submission identifier |
| file_path | VARCHAR(500) | NOT NULL | Path to uploaded file |
| grade | DECIMAL(5,2) | NULL | Numeric grade (0-100) |
| feedback | TEXT | NULL | Teacher's feedback |
| submitted_at | DATETIME | NOT NULL, DEFAULT NOW() | Submission timestamp |
| student_id | INT UNSIGNED | NOT NULL, FOREIGN KEY | Student who submitted |
| assignment_id | INT UNSIGNED | NOT NULL, FOREIGN KEY | Related assignment |

**Foreign Keys:**
- `student_id` REFERENCES `user(id)` ON DELETE CASCADE
- `assignment_id` REFERENCES `assignment(id)` ON DELETE CASCADE

**Indexes:**
- Primary Key on `id`
- Index on `student_id`
- Index on `assignment_id`
- Composite Index on `(assignment_id, student_id)` for performance

### Sequelize Model Associations

```javascript
// In models/index.js

// User -> Assignment (1:N as teacher)
User.hasMany(Assignment, { foreignKey: 'teacherId', as: 'createdAssignments' });
Assignment.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

// User -> Submission (1:N as student)
User.hasMany(Submission, { foreignKey: 'studentId', as: 'submissions' });
Submission.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

// Assignment -> Submission (1:N)
Assignment.hasMany(Submission, { foreignKey: 'assignmentId' });
Submission.belongsTo(Assignment, { foreignKey: 'assignmentId' });
```

---

## Authentication & Authorization

### JWT Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "id": 1,
    "role": "teacher",
    "iat": 1699999999,
    "exp": 1700007199
  }
}
```

**Token Lifetime:** 2 hours (7200 seconds)

### Authentication Middleware Flow

```javascript
// authMiddleware.js

Request
   │
   ▼
Extract Authorization header
   │
   ▼
Verify header format: "Bearer <token>"
   │
   ▼
jwt.verify(token, JWT_SECRET)
   │
   ├─── Valid ────▶ Attach user { id, role } to req.user
   │                    │
   │                    ▼
   │               Check role requirements
   │                    │
   │                    ├─── Match ────▶ next() → Controller
   │                    │
   │                    └─── No Match ─▶ 403 Forbidden
   │
   └─── Invalid ─▶ 401 Unauthorized
```

### Role-Based Access Control (RBAC)

| Endpoint | Teacher | Student |
|----------|---------|---------|
| POST /api/assignments | ✅ | ❌ |
| GET /api/assignments | ✅ | ✅ |
| PATCH /api/assignments/:id | ✅ (own) | ❌ |
| DELETE /api/assignments/:id | ✅ (own) | ❌ |
| POST /api/submissions | ❌ | ✅ |
| GET /api/submissions | ✅ (all for their assignments) | ✅ (own only) |
| PATCH /api/submissions/:id/grade | ✅ (for their assignments) | ❌ |

### Password Security

- **Hashing Algorithm:** bcrypt
- **Salt Rounds:** 10
- **Storage:** Only password hash stored, never plain text
- **Minimum Length:** 6 characters (configurable in validators)

---

## API Documentation

### Base URL

```
Development: http://localhost:3001/api
Production: https://your-domain.com/api
```

### Authentication Endpoints

#### **POST /api/auth/register**

Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "student"
}
```

**Validation:**
- `name`: String, minimum 2 characters
- `email`: Valid email format
- `password`: Minimum 6 characters
- `role`: Must be "teacher" or "student"

**Response (201):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student"
}
```

**Error Responses:**
- `400`: Validation errors
- `409`: Email already registered
- `500`: Server error

---

#### **POST /api/auth/login**

Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Error Responses:**
- `400`: Validation errors
- `401`: Invalid credentials
- `500`: Server error

---

### Assignment Endpoints

#### **POST /api/assignments**

Create a new assignment (Teacher only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Math Homework Chapter 5",
  "description": "Complete exercises 1-20",
  "dueDate": "2025-11-20T23:59:59Z"
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Math Homework Chapter 5",
  "description": "Complete exercises 1-20",
  "dueDate": "2025-11-20T23:59:59.000Z",
  "teacherId": 1
}
```

**Error Responses:**
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (not a teacher)
- `400`: Validation errors
- `500`: Server error

---

#### **GET /api/assignments**

Get all assignments.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `teacherId` (optional): Filter by teacher

**Response (200):**
```json
[
  {
    "id": 1,
    "title": "Math Homework Chapter 5",
    "description": "Complete exercises 1-20",
    "dueDate": "2025-11-20T23:59:59.000Z",
    "teacherId": 1,
    "teacher": {
      "id": 1,
      "name": "Prof. Smith",
      "email": "smith@school.edu"
    }
  }
]
```

---

#### **PATCH /api/assignments/:id**

Update an assignment (Teacher only, own assignments).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "dueDate": "2025-11-25T23:59:59Z"
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "Updated Title",
  "description": "Updated description",
  "dueDate": "2025-11-25T23:59:59.000Z",
  "teacherId": 1
}
```

---

#### **DELETE /api/assignments/:id**

Delete an assignment (Teacher only, own assignments).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Assignment deleted"
}
```

---

### Submission Endpoints

#### **POST /api/submissions**

Submit an assignment (Student only).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `assignmentId`: Number
- `file`: File (max 10MB)

**Response (201):**
```json
{
  "id": 1,
  "filePath": "/uploads/1699999999-assignment.pdf",
  "submittedAt": "2025-11-14T10:30:00.000Z",
  "studentId": 2,
  "assignmentId": 1,
  "grade": null,
  "feedback": null
}
```

---

#### **GET /api/submissions**

Get submissions.
- Teachers: All submissions for their assignments
- Students: Only their own submissions

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `assignmentId` (optional): Filter by assignment

**Response (200):**
```json
[
  {
    "id": 1,
    "filePath": "/uploads/1699999999-assignment.pdf",
    "grade": 95.5,
    "feedback": "Excellent work!",
    "submittedAt": "2025-11-14T10:30:00.000Z",
    "student": {
      "id": 2,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "assignment": {
      "id": 1,
      "title": "Math Homework Chapter 5"
    }
  }
]
```

---

#### **PATCH /api/submissions/:id/grade**

Grade a submission (Teacher only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "grade": 95.5,
  "feedback": "Excellent work! Keep it up."
}
```

**Response (200):**
```json
{
  "id": 1,
  "filePath": "/uploads/1699999999-assignment.pdf",
  "grade": 95.5,
  "feedback": "Excellent work! Keep it up.",
  "submittedAt": "2025-11-14T10:30:00.000Z",
  "studentId": 2,
  "assignmentId": 1
}
```

---

### Health Check

#### **GET /api/health**

Check API status.

**Response (200):**
```json
{
  "ok": true
}
```

---

## Frontend Architecture

### Next.js App Router Structure

```
app/
├── layout.tsx                 # Root layout (AuthProvider wrapper)
├── page.tsx                   # Landing page (public)
├── login/
│   └── page.tsx               # Login page (public)
├── register/
│   └── page.tsx               # Registration page (public)
├── dashboard/
│   └── page.tsx               # Dashboard (protected, role-based)
└── grades/
    └── page.tsx               # Grades view (protected)
```

### State Management with Context API

```typescript
// AuthContext.tsx

┌─────────────────────────────────────────┐
│          AuthProvider                    │
├─────────────────────────────────────────┤
│  State:                                 │
│  - user: User | null                    │
│  - token: string | null                 │
│                                         │
│  Methods:                               │
│  - login(email, password)               │
│  - logout()                             │
│                                         │
│  Persistence:                           │
│  - localStorage (token, user)           │
│  - Token expiry validation              │
└─────────────────────────────────────────┘
         │
         │ Provides context to
         │
         ▼
┌─────────────────────────────────────────┐
│     All App Components                   │
│  - useAuth() hook for access            │
└─────────────────────────────────────────┘
```

### Component Architecture

#### **Navbar Component**

```typescript
// Features:
// - Conditional rendering based on auth state
// - Role-based menu items
// - Logout functionality
// - Active route highlighting

export default function Navbar() {
  const { user, logout } = useAuth();
  // Render logic
}
```

#### **AssignmentCard Component**

```typescript
// Props:
interface AssignmentCardProps {
  assignment: Assignment;
  onSubmit?: (id: number) => void;  // For students
  onEdit?: (id: number) => void;    // For teachers
  onDelete?: (id: number) => void;  // For teachers
}

// Features:
// - Display assignment details
// - Due date highlighting
// - Role-based action buttons
```

#### **FileUploadForm Component**

```typescript
// Features:
// - Drag & drop file upload
// - File type validation
// - Size validation (max 10MB)
// - Progress indicator
// - Error handling

export default function FileUploadForm({ assignmentId, onSuccess }) {
  // Upload logic with FormData
}
```

### API Client Utility

```typescript
// lib/api.ts

// Centralized fetch wrapper with:
// - Automatic token injection
// - Error handling
// - Type safety

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  token?: string | null
): Promise<T> {
  // Implementation
}
```

### Styling Strategy

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Classes**: Defined in `globals.css`
  - `.btn-primary`: Primary action buttons
  - `.btn-secondary`: Secondary action buttons
  - `.card-glass`: Glass morphism cards
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Ready for implementation

---

## File Upload & Storage

### Multer Configuration

```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to uploads directory
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept all file types (can be restricted)
    cb(null, true);
  }
});
```

### File Serving

```javascript
// Static file serving in app.js
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Access pattern:
// http://localhost:3001/uploads/1699999999-assignment.pdf
```

### File Storage Structure

```
backend/
└── uploads/
    ├── 1699999999-assignment.pdf
    ├── 1700000001-homework.docx
    └── 1700000123-project.zip
```

**File Naming Convention:** `{timestamp}-{originalFilename}`

---

## Environment Configuration

### Backend `.env`

```env
# Database Configuration
DB_NAME=edutrack
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=3306

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
```

### Frontend `.env.local`

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Environment Variable Validation

The backend performs startup validation for required environment variables:

```javascript
const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_HOST', 'JWT_SECRET'];
const missing = requiredEnv.filter(k => !process.env[k]);
if (missing.length) {
  throw new Error(`Missing: ${missing.join(', ')}`);
}
```

---

## Setup & Installation

### Prerequisites

- **Node.js**: Version 18+ ([Download](https://nodejs.org/))
- **MySQL**: Version 8.0+ ([Download](https://dev.mysql.com/downloads/))
- **Git**: For version control
- **Code Editor**: VS Code recommended

### Installation Steps

#### 1. Clone Repository

```powershell
git clone <repository-url>
cd EduTrack
```

#### 2. Database Setup

```powershell
# Navigate to database directory
cd database

# Install MySQL client (if needed)
npm install

# Run schema creation
mysql -u root -p < schema.sql

# (Optional) Run seed data
mysql -u root -p < seed.sql
```

#### 3. Backend Setup

```powershell
cd ../backend

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Edit .env with your configuration
notepad .env

# Start development server
npm run dev
```

**Backend runs on:** `http://localhost:3001`

#### 4. Frontend Setup

```powershell
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
Copy-Item .env.local.example .env.local

# Edit .env.local
notepad .env.local

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

### Verification

1. **Database:** Check connection with `node database/connect.js`
2. **Backend:** Visit `http://localhost:3001/api/health`
3. **Frontend:** Open `http://localhost:3000` in browser

---

## Development Workflow

### Git Workflow

```
main
  ├── develop
  │   ├── feature/assignment-crud
  │   ├── feature/file-upload
  │   └── bugfix/auth-issue
```

**Branch Naming:**
- `feature/description`: New features
- `bugfix/description`: Bug fixes
- `hotfix/description`: Urgent production fixes

### Code Style

- **ESLint**: Enforces code quality
- **Prettier**: Code formatting
- **Naming Conventions:**
  - `camelCase`: Variables, functions
  - `PascalCase`: Components, classes
  - `UPPER_SNAKE_CASE`: Constants

### Development Commands

#### Backend

```powershell
npm run dev       # Start with nodemon (auto-reload)
npm start         # Start production server
npm run lint      # Run ESLint
npm run format    # Format with Prettier
```

#### Frontend

```powershell
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run Next.js linter
```

### Testing Workflow

1. Write unit tests for new features
2. Run tests locally before committing
3. Ensure all tests pass in CI/CD
4. Code review before merging

---

## Security Considerations

### Implemented Security Measures

1. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Minimum password length enforcement
   - No plain text storage

2. **JWT Security**
   - Short token expiry (2 hours)
   - Secret key stored in environment
   - Token verification on every protected route

3. **Input Validation**
   - express-validator for all inputs
   - SQL injection prevention (Sequelize ORM)
   - XSS prevention (input sanitization)

4. **HTTP Security**
   - Helmet.js security headers
   - CORS configuration
   - Rate limiting (recommended for production)

5. **File Upload Security**
   - File size limits (10MB)
   - File type validation (can be enhanced)
   - Unique filenames to prevent overwrites

### Recommended Production Enhancements

1. **HTTPS**: Use TLS/SSL certificates
2. **Rate Limiting**: Prevent brute force attacks
3. **CSP**: Content Security Policy headers
4. **Database**: Use read-only database users where possible
5. **Secrets Management**: Use secret management services
6. **Logging**: Implement comprehensive audit logs
7. **Monitoring**: Set up error tracking (e.g., Sentry)

---

## Performance Optimization

### Database Optimization

1. **Indexes**
   - Primary keys on all tables
   - Foreign key indexes
   - Composite indexes for common queries

2. **Query Optimization**
   - Use Sequelize eager loading for associations
   - Limit result sets with pagination
   - Avoid N+1 queries

3. **Connection Pooling**
   - Sequelize connection pool configured
   - Max connections: 5 (configurable)

### Frontend Optimization

1. **Next.js Optimizations**
   - Server-side rendering for initial load
   - Automatic code splitting
   - Image optimization with next/image

2. **Caching Strategy**
   - localStorage for auth state
   - Consider Redis for session management

3. **Bundle Optimization**
   - Tree shaking for unused code
   - Minification in production
   - Dynamic imports for large components

### API Optimization

1. **Response Compression**
   - Gzip compression for responses
   - JSON payload minimization

2. **Caching Headers**
   - Set appropriate Cache-Control headers
   - ETags for conditional requests

---

## Testing Strategy

### Unit Testing

```javascript
// Example: Testing auth controller
describe('Auth Controller', () => {
  describe('register', () => {
    it('should create a new user', async () => {
      // Test implementation
    });
    
    it('should reject duplicate email', async () => {
      // Test implementation
    });
  });
});
```

### Integration Testing

```javascript
// Example: Testing API endpoints
describe('POST /api/auth/register', () => {
  it('should return 201 with valid data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(validUserData);
    
    expect(response.status).toBe(201);
  });
});
```

### E2E Testing

- **Cypress** or **Playwright** for frontend E2E tests
- Test critical user flows:
  - Registration → Login → Create Assignment → Submit → Grade

### Test Coverage Goals

- **Unit Tests**: 80% coverage
- **Integration Tests**: Key API endpoints
- **E2E Tests**: Critical user journeys

---

## Deployment Guide

### Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Configure production database
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up error monitoring
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Configure logging
- [ ] Set up health checks

### Deployment Options

#### Option 1: Traditional Server (VPS)

1. **Backend**
   - Deploy to VPS (DigitalOcean, AWS EC2)
   - Use PM2 for process management
   - Nginx as reverse proxy
   - MySQL database instance

2. **Frontend**
   - Build: `npm run build`
   - Serve with PM2 or Nginx

#### Option 2: Platform as a Service

1. **Backend**
   - Deploy to Heroku, Railway, or Render
   - Use managed MySQL (ClearDB, PlanetScale)

2. **Frontend**
   - Deploy to Vercel (recommended for Next.js)
   - Automatic deployments from Git

#### Option 3: Containerized (Docker)

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: edutrack
      MYSQL_ROOT_PASSWORD: ${DB_PASS}
    volumes:
      - db-data:/var/lib/mysql
  
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_NAME=edutrack
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  db-data:
```

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Symptom:** `ECONNREFUSED` or `ER_ACCESS_DENIED_ERROR`

**Solutions:**
```powershell
# Check MySQL is running
Get-Service MySQL*

# Test connection
mysql -u root -p

# Verify environment variables
echo $env:DB_HOST
echo $env:DB_USER
```

#### 2. JWT Verification Failed

**Symptom:** `401 Unauthorized` on protected routes

**Solutions:**
- Check token is being sent in Authorization header
- Verify JWT_SECRET matches between sign and verify
- Check token hasn't expired
- Clear localStorage and re-login

#### 3. File Upload Fails

**Symptom:** `ENOENT` or `LIMIT_FILE_SIZE`

**Solutions:**
```powershell
# Ensure uploads directory exists
New-Item -ItemType Directory -Force -Path backend/uploads

# Check file size limit in controller
# Increase limit in multer configuration if needed
```

#### 4. CORS Errors

**Symptom:** `Access-Control-Allow-Origin` error

**Solutions:**
```javascript
// Update backend/src/app.js
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

#### 5. Port Already in Use

**Symptom:** `EADDRINUSE`

**Solutions:**
```powershell
# Find process using port 3001
netstat -ano | findstr :3001

# Kill process
Stop-Process -Id <PID> -Force
```

---

## Future Enhancements

### Phase 1: Core Features

- [ ] Real-time notifications (Socket.IO)
- [ ] Assignment categories/tags
- [ ] Bulk grading functionality
- [ ] Export grades to CSV/Excel
- [ ] Assignment templates

### Phase 2: Collaboration

- [ ] Comments on submissions
- [ ] Peer review system
- [ ] Group assignments
- [ ] Discussion forums
- [ ] Live chat support

### Phase 3: Advanced Features

- [ ] Analytics dashboard
- [ ] Progress reports
- [ ] Plagiarism detection
- [ ] Video submission support
- [ ] Mobile application (React Native)
- [ ] Gamification (badges, points)

### Phase 4: Administration

- [ ] Multi-tenant support (schools)
- [ ] Admin dashboard
- [ ] Course management
- [ ] Semester/term system
- [ ] Calendar integration
- [ ] Email notifications
- [ ] SMS notifications

### Technical Improvements

- [ ] GraphQL API option
- [ ] Redis caching
- [ ] Elasticsearch for search
- [ ] S3 file storage
- [ ] CDN integration
- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] Comprehensive test suite

---

## Appendix

### Glossary

- **JWT**: JSON Web Token - Stateless authentication mechanism
- **RBAC**: Role-Based Access Control - Authorization pattern
- **ORM**: Object-Relational Mapping - Database abstraction layer
- **SSR**: Server-Side Rendering - Rendering pages on server
- **CORS**: Cross-Origin Resource Sharing - HTTP security feature

### Useful Commands

```powershell
# Database commands
mysql -u root -p edutrack < schema.sql
mysqldump -u root -p edutrack > backup.sql

# Git commands
git status
git add .
git commit -m "feat: add feature"
git push origin develop

# npm commands
npm install <package>
npm update
npm audit fix
npm run <script>
```

### Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Express Documentation**: https://expressjs.com/
- **Sequelize Documentation**: https://sequelize.org/
- **MySQL Documentation**: https://dev.mysql.com/doc/
- **JWT Best Practices**: https://jwt.io/introduction

---

## Contact & Support

For questions, issues, or contributions:

- **GitHub Issues**: [Repository Issues Page]
- **Documentation**: This file
- **Email**: [your-email@domain.com]

---

**Document Version:** 1.0  
**Last Updated:** November 14, 2025  
**Maintained By:** Senior Development Team
