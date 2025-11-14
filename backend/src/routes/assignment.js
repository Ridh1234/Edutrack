const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const { createAssignment, createValidators, listAssignments } = require('../controllers/assignment');

router.use(authenticateToken);

router.get('/', listAssignments);
router.post('/', authorizeRole('teacher'), createValidators, createAssignment);

module.exports = router;
