// routes/teams.js
const express = require('express');
const router = express.Router();
const {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamController');

// GET all teams
router.get('/', getAllTeams);
// Add a new team
router.post('/', createTeam);

// ✅ Add dynamic routes for update and delete
// PUT (update) a team by ID
router.put('/:id', updateTeam);      // PUT /api/teams/1
// DELETE a team by ID
router.delete('/:id', deleteTeam);   // DELETE /api/teams/1

module.exports = router;