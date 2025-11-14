-- Seed demo accounts and sample assignment
USE `edutrack`;

-- bcrypt hash for the password 'password'
SET @PW := '$2b$10$CwTycUXWue0Thq9StjUM0uJ8E6R12.hDqOiiMHDL/95B2S/bR5E2K';

INSERT INTO `user` (`name`, `email`, `password_hash`, `role`) VALUES
('Alice Teacher', 'alice.teacher@example.com', @PW, 'teacher'),
('Bob Student', 'bob.student@example.com', @PW, 'student'),
('Carol Student', 'carol.student@example.com', @PW, 'student');

-- Add one assignment by the teacher (id assumed 1)
INSERT INTO `assignment` (`title`, `description`, `due_date`, `teacher_id`) VALUES
('Intro Essay', 'Write a one-page essay about learning goals.', NOW() + INTERVAL 7 DAY, 1);
