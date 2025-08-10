// controllers/coachController.js
const db = require('../config/db');

exports.getAllCoaches = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT c.*, t.name AS team_name
      FROM coaches c
      LEFT JOIN teams t ON c.team_id = t.id
      ORDER BY c.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCoach = async (req, res) => {
  const { first_name, last_name, specialization, team_id, hire_date } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO coaches (first_name, last_name, specialization, team_id, hire_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [first_name, last_name, specialization, team_id, hire_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// UPDATE Coach
exports.updateCoach = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, specialization, team_id, hire_date } = req.body;

  try {
    const result = await db.query(
      `UPDATE coaches
       SET first_name = $1, last_name = $2, specialization = $3, team_id = $4, hire_date = $5
       WHERE id = $6
       RETURNING *`,
      [first_name, last_name, specialization, team_id, hire_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Coach
exports.deleteCoach = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `DELETE FROM coaches WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Coach not found' });
    }

    res.json({ message: 'Coach deleted successfully', coach: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};