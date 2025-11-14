const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const { createSubmission, createValidators, mySubmissions, submissionsForAssignment, gradeSubmission, gradeValidators } = require('../controllers/submission');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = crypto.randomBytes(16).toString('hex') + ext;
    cb(null, name);
  }
});

// Add a conservative file size limit (20 MB) to prevent accidental huge uploads
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

router.use(authenticateToken);

router.get('/my', authorizeRole('student'), mySubmissions);
router.get('/assignment/:assignmentId', authorizeRole('teacher'), submissionsForAssignment);
router.post('/', authorizeRole('student'), upload.single('file'), createValidators, createSubmission);
router.patch('/:id/grade', authorizeRole('teacher'), gradeValidators, gradeSubmission);

module.exports = router;
