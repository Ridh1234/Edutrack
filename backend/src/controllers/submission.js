const { body, validationResult } = require('express-validator');
const path = require('path');
const { Submission, Assignment, User } = require('../models');

const createValidators = [
  body('assignmentId').isInt({ min: 1 })
];

async function createSubmission(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  if (!req.file) return res.status(400).json({ error: 'File is required' });

  try {
    const assignment = await Assignment.findByPk(req.body.assignmentId);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    // Allow resubmission: upsert by (studentId, assignmentId)
  let submission = await Submission.findOne({ where: { studentId: req.user.id, assignmentId: assignment.id } });
  // Store a URL-friendly path using forward slashes regardless of OS
  const filePath = path.posix.join('uploads', req.file.filename);

    if (submission) {
      submission.filePath = filePath;
      submission.submittedAt = new Date();
      await submission.save();
    } else {
      submission = await Submission.create({
        studentId: req.user.id,
        assignmentId: assignment.id,
        filePath
      });
    }

    return res.status(201).json(submission);
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to submit' });
  }
}

async function mySubmissions(req, res) {
  try {
    const subs = await Submission.findAll({ where: { studentId: req.user.id }, order: [['submittedAt', 'DESC']] });
    return res.json(subs);
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to list submissions' });
  }
}

// Teacher: list all submissions for an assignment they own
async function submissionsForAssignment(req, res) {
  const assignmentId = parseInt(req.params.assignmentId, 10);
  if (!Number.isInteger(assignmentId) || assignmentId < 1) {
    return res.status(400).json({ error: 'Invalid assignment id' });
  }
  try {
    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    if (assignment.teacherId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to view submissions for this assignment' });
    }
    const subs = await Submission.findAll({
      where: { assignmentId },
      include: [{ model: User, as: 'student', attributes: ['id', 'name', 'email'] }],
      order: [['submittedAt', 'DESC']]
    });
    return res.json(subs);
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to list assignment submissions' });
  }
}

const gradeValidators = [
  body('grade').optional().isFloat({ min: 0 }).toFloat(),
  body('feedback').optional().isString()
];

async function gradeSubmission(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const submission = await Submission.findByPk(req.params.id, { include: [{ model: Assignment, as: 'assignment' }] });
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    // Ensure teacher owns the assignment
    if (submission.assignment.teacherId !== req.user.id) {
      return res.status(403).json({ error: 'Cannot grade submissions for this assignment' });
    }

    submission.grade = req.body.grade ?? submission.grade;
    submission.feedback = req.body.feedback ?? submission.feedback;
    await submission.save();

    return res.json(submission);
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to grade submission' });
  }
}

module.exports = { createSubmission, createValidators, mySubmissions, submissionsForAssignment, gradeSubmission, gradeValidators };
