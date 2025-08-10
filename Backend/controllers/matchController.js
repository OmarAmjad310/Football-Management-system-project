// controllers/matchController.js
const db = require('../config/db');

exports.getAllMatches = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        m.*,
        ht.name AS home_team_name,
        at.name AS away_team_name
      FROM matches m
      LEFT JOIN teams ht ON m.home_team_id = ht.id
      LEFT JOIN teams at ON m.away_team_id = at.id
      ORDER BY m.match_date
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMatch = async (req, res) => {
  const { home_team_id, away_team_id, match_date, venue, status } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO matches (home_team_id, away_team_id, match_date, venue, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [home_team_id, away_team_id, match_date, venue, status || 'scheduled']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// UPDATE Match
exports.updateMatch = async (req, res) => {
  const { id } = req.params;
  const { home_team_id, away_team_id, match_date, home_score, away_score, venue, status } = req.body;

  try {
    const result = await db.query(
      `UPDATE matches
       SET home_team_id = $1, away_team_id = $2, match_date = $3, home_score = $4,
           away_score = $5, venue = $6, status = $7
       WHERE id = $8
       RETURNING *`,
      [home_team_id, away_team_id, match_date, home_score, away_score, venue, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Match
exports.deleteMatch = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `DELETE FROM matches WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.json({ message: 'Match deleted successfully', match: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};