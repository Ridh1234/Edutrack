-- EduTrack schema
CREATE DATABASE IF NOT EXISTS `edutrack` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `edutrack`;

-- user table
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(100) NOT NULL,
  `role` ENUM('teacher','student') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- assignment table
CREATE TABLE IF NOT EXISTS `assignment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `due_date` DATETIME NULL,
  `teacher_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_assignment_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- submission table
CREATE TABLE IF NOT EXISTS `submission` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `file_path` VARCHAR(500) NOT NULL,
  `grade` DECIMAL(5,2) NULL,
  `feedback` TEXT NULL,
  `submitted_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `student_id` INT UNSIGNED NOT NULL,
  `assignment_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_submission_student` FOREIGN KEY (`student_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_submission_assignment` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
