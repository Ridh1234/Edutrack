const { body, validationResult } = require('express-validator');
const { Assignment, User } = require('../models');

const createValidators = [
  body('title').isString().isLength({ min: 2 }).trim(),
  body('description').optional().isString(),
  body('dueDate').optional().isISO8601().toDate()
];

async function createAssignment(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const assignment = await Assignment.create({
      title: req.body.title,
      description: req.body.description || null,
      dueDate: req.body.dueDate || null,
      teacherId: req.user.id
    });
    return res.status(201).json(assignment);
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to create assignment' });
  }
}

async function listAssignments(req, res) {
  try {
    if (req.user.role === 'teacher') {
      const mine = await Assignment.findAll({ where: { teacherId: req.user.id }, order: [['id', 'DESC']] });
      return res.json(mine);
    }
    const all = await Assignment.findAll({ include: [{ model: User, as: 'teacher', attributes: ['id', 'name'] }], order: [['id', 'DESC']] });
    return res.json(all);
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to list assignments' });
  }
}

module.exports = { createAssignment, createValidators, listAssignments };
