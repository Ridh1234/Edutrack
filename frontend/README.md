# EduTrack Frontend (Next.js + TypeScript + Tailwind)

## Setup
1. Copy `.env.local.example` to `.env.local` and adjust the API URL if needed.
2. Install dependencies and start the dev server.

### Windows PowerShell
```
# From this folder
Copy-Item .env.local.example .env.local
npm install
npm run dev
```

App will run on `http://localhost:3000`.

## Pages
- `/register` – sign up as student/teacher
- `/login` – login and store JWT locally
- `/dashboard` – teacher: create/list assignments; student: list assignments and upload submissions
- `/grades` – student view of submissions and grades

## Notes
- Tailwind is configured in `./styles/globals.css` and `tailwind.config.js`.
- Auth state is managed in `context/AuthContext.tsx` with JWT expiry handling.
