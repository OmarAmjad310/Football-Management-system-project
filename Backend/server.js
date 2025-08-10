/*// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Correctly require the router
const teamRoutes = require('./routes/teams'); // ← must point to teams.js
const playerRoutes = require('./routes/players');
const matchRoutes = require('./routes/matches');
const coachRoutes = require('./routes/coaches');



// ✅ Use the router
app.use('/api/teams', teamRoutes); // This must receive a router, not undefined
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/coaches', coachRoutes);

app.get('/', (req, res) => {
  res.send('Football Management API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🌐 CORS Configuration (enhanced)
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Your React app URL
    credentials: true, // Enable if using cookies later
  })
);

// 📦 Built-in middleware
app.use(express.json({ extended: false })); // Parse JSON bodies

// 🔐 Routes
const teamRoutes = require('./routes/teams');
const playerRoutes = require('./routes/players');
const matchRoutes = require('./routes/matches');
const coachRoutes = require('./routes/coaches');
const authRoutes = require('./routes/authRoutes'); // 👈 Add this

// 🛣️ Mount routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/auth', authRoutes); // 👈 Add this

// 🏠 Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>🏈 Football Management API</h1>
    <p>Backend is running!</p>
    <strong>Routes:</strong>
    <ul>
      <li><code>GET /api/teams</code></li>
      <li><code>POST /api/auth/register</code></li>
      <li><code>POST /api/auth/login</code></li>
    </ul>
  `);
});

// ❌ Handle invalid routes
app.use('*splat', (req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// 🐞 Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong!' });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`👉 API: http://localhost:${PORT}/api/auth/register`);
});