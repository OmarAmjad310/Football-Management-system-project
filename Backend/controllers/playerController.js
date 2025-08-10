// controllers/playerController.js
const db = require('../config/db');

exports.getAllPlayers = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*, t.name AS team_name 
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      ORDER BY p.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPlayer = async (req, res) => {
  const { first_name, last_name, position, jersey_number, team_id, date_of_birth, nationality } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO players (first_name, last_name, position, jersey_number, team_id, date_of_birth, nationality)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [first_name, last_name, position, jersey_number, team_id, date_of_birth, nationality]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Player
exports.updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, position, jersey_number, team_id, date_of_birth, nationality } = req.body;

  try {
    const result = await db.query(
      `UPDATE players
       SET first_name = $1, last_name = $2, position = $3, jersey_number = $4,
           team_id = $5, date_of_birth = $6, nationality = $7
       WHERE id = $8
       RETURNING *`,
      [first_name, last_name, position, jersey_number, team_id, date_of_birth, nationality, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Player
exports.deletePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `DELETE FROM players WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json({ message: 'Player deleted successfully', player: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};