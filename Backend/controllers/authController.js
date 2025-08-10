// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const userCheck = await db.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role`,
      [username, email, hashedPassword, role]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please include email and password' });
  }

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { user: { id: user.id, username: user.username, email: user.email, role: user.role } },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
exports.getCurrentUser = async (req, res) => {
  res.json({ user: req.user });
};