// routes/matches.js
const express = require('express');
const router = express.Router();
const {
  getAllMatches,
  createMatch,
  updateMatch,
  deleteMatch,
} = require('../controllers/matchController');

router.get('/', getAllMatches);
router.post('/', createMatch);
router.put('/:id', updateMatch);     
router.delete('/:id', deleteMatch);  

module.exports = router;