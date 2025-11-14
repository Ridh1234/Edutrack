const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const registerValidators = [
  body('name').isString().isLength({ min: 2 }).trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['teacher', 'student'])
];

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Surface validation errors in server logs for easier debugging
    console.warn('Register validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role });
    return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (_err) {
    console.error('Unexpected register error:', _err);
    return res.status(500).json({ error: 'Failed to register' });
  }
}

const loginValidators = [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().notEmpty()
];

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (_err) {
    return res.status(500).json({ error: 'Failed to login' });
  }
}

module.exports = { register, registerValidators, login, loginValidators };
