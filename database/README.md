# EduTrack Database (MySQL)

## Files
- `schema.sql` – creates `user`, `assignment`, `submission` tables matching Sequelize models
- `seed.sql` – inserts one teacher and two student demo accounts and a sample assignment
- `connect.js` – Node script to verify DB connection using mysql2

## Usage (Windows PowerShell)
```
# Import schema and seed via MySQL CLI
# Update -u and -p as needed for your local MySQL
mysql -u root -p < schema.sql
mysql -u root -p edutrack < seed.sql

# Test the connection using the backend .env
node connect.js
```

Seeded accounts (all use password: `password`):
- alice.teacher@example.com (teacher)
- bob.student@example.com (student)
- carol.student@example.com (student)
