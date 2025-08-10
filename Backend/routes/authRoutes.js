// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getCurrentUser); // Protected route

module.exports = router;