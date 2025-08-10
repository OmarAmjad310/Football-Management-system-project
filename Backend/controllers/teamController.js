// controllers/teamController.js
const db = require('../config/db');

// ✅ Controller functions
exports.getAllTeams = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM teams');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTeam = async (req, res) => {
  const { name, city, founded_year, stadium } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO teams (name, city, founded_year, stadium) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, city, founded_year, stadium]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, city, founded_year, stadium } = req.body;

  try {
    const result = await db.query(
      `UPDATE teams
       SET name = $1, city = $2, founded_year = $3, stadium = $4
       WHERE id = $5
       RETURNING *`,
      [name, city, founded_year, stadium, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a team by ID
exports.deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `DELETE FROM teams WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ message: 'Team deleted successfully', team: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};