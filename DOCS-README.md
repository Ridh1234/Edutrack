# EduTrack Documentation & Architecture

## 📚 Documentation Files

This directory contains comprehensive documentation for the EduTrack project:

### 1. **DOCUMENTATION.md**
Complete technical documentation covering:
- System architecture and component design
- Technology stack details
- Database schema and relationships
- API documentation with examples
- Authentication & authorization flows
- Setup and installation guide
- Security considerations
- Development workflow
- Testing strategy
- Deployment guide
- Troubleshooting tips
- Future enhancements roadmap

**Target Audience:** Developers, technical leads, DevOps engineers

---

### 2. **architecture-diagram.svg**
Visual system architecture diagram showing:
- **Client Layer**: Next.js frontend with all components
- **Application Layer**: Express.js backend with routes, controllers, middleware, and models
- **Data Layer**: MySQL database with table structures and relationships
- **File Storage Layer**: Local file system for uploads
- **Authentication Flow**: JWT token lifecycle
- **Data Relationships**: Foreign key relationships and associations

**How to View:**
- Open in any modern web browser
- View in VS Code with SVG preview extension
- Embed in markdown: `![Architecture](./architecture-diagram.svg)`

---

### 3. **user-flow-diagram.svg**
Detailed user interaction flows including:
- **User Registration Flow**: Complete signup process
- **Authentication Flow**: Login and JWT token handling
- **Teacher Workflows**: 
  - Creating assignments
  - Viewing submissions
  - Grading submissions
  - Providing feedback
- **Student Workflows**:
  - Viewing assignments
  - Submitting files
  - Checking grades
- **Role-Based Access Control Matrix**: Permission breakdown by role
- **Security Features**: Authentication and authorization details
- **Technology Stack Overview**: Frontend and backend technologies

**How to View:**
- Open in any modern web browser
- View in VS Code with SVG preview extension
- Embed in markdown: `![User Flows](./user-flow-diagram.svg)`

---

## 🎯 Quick Start

### For New Team Members:
1. Start with **DOCUMENTATION.md** - Read sections 1-5 for overview
2. Review **architecture-diagram.svg** - Understand system components
3. Study **user-flow-diagram.svg** - Learn user interactions
4. Follow Setup & Installation in DOCUMENTATION.md
5. Refer to API Documentation when developing

### For Stakeholders:
1. Review **architecture-diagram.svg** - System overview
2. Check **user-flow-diagram.svg** - Understand user experiences
3. Read Executive Summary in DOCUMENTATION.md

### For Developers:
1. Keep **DOCUMENTATION.md** open during development
2. Reference API Documentation for endpoint details
3. Check Security Considerations before implementing features
4. Follow Development Workflow guidelines

---

## 📊 Architecture Overview

### System Layers

```
┌─────────────────────────────────────┐
│   Frontend (Next.js + TypeScript)   │
│   - Pages: /, /login, /dashboard    │
│   - Components: Navbar, Cards, etc. │
│   - Auth Context (Global State)     │
└──────────────┬──────────────────────┘
               │ REST API (JSON)
┌──────────────▼──────────────────────┐
│   Backend (Express + Node.js)       │
│   - Routes → Controllers            │
│   - Auth Middleware (JWT)           │
│   - File Upload (Multer)            │
│   - Sequelize Models                │
└──────────────┬──────────────────────┘
               │ SQL Queries
┌──────────────▼──────────────────────┐
│   Database (MySQL)                  │
│   - Users, Assignments, Submissions │
└─────────────────────────────────────┘
```

---

## 🔐 Security Highlights

### Authentication
- JWT tokens with 2-hour expiry
- Bcrypt password hashing (10 rounds)
- Token validation on every protected route
- Secure storage in localStorage

### Authorization
- Role-based access control (Teacher/Student)
- Resource ownership verification
- Middleware chain validation
- Foreign key constraints

### Data Protection
- Helmet.js security headers
- CORS policy enforcement
- Input validation (express-validator)
- SQL injection prevention (Sequelize ORM)
- File size limits (10MB max)

---

## 🗄️ Database Schema

### Tables
1. **user**: Stores teachers and students
2. **assignment**: Created by teachers
3. **submission**: Students submit assignments with files

### Relationships
- User (1) → (N) Assignment (as teacher)
- User (1) → (N) Submission (as student)
- Assignment (1) → (N) Submission
- All with CASCADE DELETE

---

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT)

### Assignments (Protected)
- `GET /api/assignments` - List all assignments
- `POST /api/assignments` - Create assignment (Teacher only)
- `PATCH /api/assignments/:id` - Update assignment (Teacher only)
- `DELETE /api/assignments/:id` - Delete assignment (Teacher only)

### Submissions (Protected)
- `GET /api/submissions` - List submissions (role-filtered)
- `POST /api/submissions` - Submit assignment (Student only)
- `PATCH /api/submissions/:id/grade` - Grade submission (Teacher only)

### Utility
- `GET /api/health` - Health check

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript 5.6**: Type-safe JavaScript
- **Tailwind CSS 3.4**: Utility-first CSS
- **React 18.3**: UI library

### Backend
- **Node.js 18+**: JavaScript runtime
- **Express.js 5.1**: Web framework
- **Sequelize 6.37**: ORM
- **MySQL 8.0+**: Database

### Security & Utilities
- **JWT**: Token-based authentication
- **Bcrypt**: Password hashing
- **Multer**: File uploads
- **Helmet**: Security headers
- **CORS**: Cross-origin requests
- **Morgan**: Request logging

---

## 📦 Project Structure

```
EduTrack/
├── backend/           # Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── uploads/       # File storage
├── frontend/          # Next.js app
│   ├── app/           # Pages (App Router)
│   ├── components/    # React components
│   ├── context/       # Auth context
│   └── lib/           # Utilities
├── database/          # SQL scripts
│   ├── schema.sql
│   └── seed.sql
├── DOCUMENTATION.md   # This complete guide
├── architecture-diagram.svg
└── user-flow-diagram.svg
```

---

## 🎓 User Roles & Permissions

### Teacher
✅ Create, edit, delete assignments
✅ View all submissions for their assignments
✅ Grade submissions
✅ Provide feedback
❌ Cannot submit assignments

### Student
✅ View all assignments
✅ Submit assignments with files
✅ View their own submissions and grades
❌ Cannot create assignments
❌ Cannot grade

---

## 🔄 Typical User Flows

### Teacher Journey
1. Register/Login → Dashboard
2. Create new assignment with title, description, due date
3. View incoming submissions from students
4. Download submitted files
5. Grade and provide feedback
6. Students see updated grades

### Student Journey
1. Register/Login → Dashboard
2. View available assignments
3. Upload assignment file before deadline
4. Check submission status
5. View grade and feedback from teacher

---

## 📝 Development Guidelines

### Code Style
- Use ESLint and Prettier
- Follow naming conventions:
  - `camelCase`: variables, functions
  - `PascalCase`: components, classes
  - `UPPER_SNAKE_CASE`: constants

### Git Workflow
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes

### Testing
- Write unit tests for controllers
- Integration tests for API endpoints
- E2E tests for critical flows

---

## 🚀 Quick Commands

### Backend
```powershell
cd backend
npm install
npm run dev        # Development mode
npm start          # Production mode
npm run lint       # Check code quality
```

### Frontend
```powershell
cd frontend
npm install
npm run dev        # Development (port 3000)
npm run build      # Production build
npm start          # Production server
```

### Database
```powershell
cd database
mysql -u root -p < schema.sql  # Create tables
mysql -u root -p < seed.sql    # Insert test data
```

---

## 📞 Support & Contribution

### Getting Help
1. Check **DOCUMENTATION.md** - Most questions answered here
2. Review architecture diagrams for system understanding
3. Check Troubleshooting section
4. Review API Documentation for endpoint details

### Contributing
1. Read Development Workflow in DOCUMENTATION.md
2. Follow code style guidelines
3. Write tests for new features
4. Update documentation for new features
5. Submit pull request to `develop` branch

---

## 📅 Version History

- **v0.1.0** (Nov 2025): Initial MVP release
  - User authentication (JWT)
  - Assignment CRUD operations
  - File submissions
  - Grading system
  - Role-based access control

---

## 🎯 Future Roadmap

See **Future Enhancements** section in DOCUMENTATION.md for:
- Real-time notifications
- Collaboration features
- Advanced analytics
- Mobile application
- And much more...

---

**Note:** Always refer to DOCUMENTATION.md for the most detailed and up-to-date information.

**Last Updated:** November 14, 2025
