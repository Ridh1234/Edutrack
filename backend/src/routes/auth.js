const express = require('express');
const router = express.Router();
const { register, registerValidators, login, loginValidators } = require('../controllers/auth');

router.post('/register', registerValidators, register);
router.post('/login', loginValidators, login);

module.exports = router;
