# EduTrack Backend (Express + Sequelize + MySQL)

## Prerequisites
- Node.js 18+
- MySQL 8+ running locally

## Setup
1. Copy `.env.example` to `.env` and set values.
2. Install dependencies.
3. Run the server.

### Windows PowerShell
```
# From this folder
Copy-Item .env.example .env
npm install
npm run dev
```

The API will start on `http://localhost:3001`.

## Endpoints (base: /api)

- `POST /auth/register` – { name, email, password, role: teacher|student }
- `POST /auth/login` – { email, password } → { token, user }
- `GET /assignments` – Auth required. Teacher: own assignments; Student: all
- `POST /assignments` – Teacher only. { title, description?, dueDate? }
- `GET /submissions/my` – Student only. Own submissions
- `POST /submissions` – Student only. multipart/form-data with fields: assignmentId, file
- `PATCH /submissions/:id/grade` – Teacher only. { grade?, feedback? }

Auth uses `Authorization: Bearer <token>` header.

## Project Structure
```
src/
  config/db.js
  models/{User,Assignment,Submission}.js
  models/index.js
  controllers/{auth,assignment,submission}.js
  routes/{auth,assignment,submission}.js
  middleware/authMiddleware.js
uploads/
server.js
```

## Notes
- Uses `sequelize.sync()` for MVP. For production, use migrations.
- File uploads are stored under `backend/uploads/` and served at `/uploads/*`.
