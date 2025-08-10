// routes/players.js
const express = require('express');
const router = express.Router();
const {
  getAllPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require('../controllers/playerController');

router.get('/', getAllPlayers);
router.post('/', createPlayer);
router.put('/:id', updatePlayer);     // ✅ Update player
router.delete('/:id', deletePlayer);  // ✅ Delete player

module.exports = router;