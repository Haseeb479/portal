const express = require('express');
const OverrideAction = require('../models/OverrideAction');
const { authMiddleware } = require('../middlewares/auth');
const router = express.Router();

// POST: Perform override
router.post('/', authMiddleware(['HR', 'Admin']), async (req, res) => {
  const { type, entityId, previousStatus, newStatus, reason } = req.body;
  const action = await OverrideAction.create({
    type,
    entityId,
    previousStatus,
    newStatus,
    performedBy: req.user.email,
    reason
  });
  res.json({ success: true, action });
});

// GET: List override actions (for audit)
router.get('/', authMiddleware(['HR', 'Admin']), async (req, res) => {
  const actions = await OverrideAction.find().sort({ performedAt: -1 }).limit(30);
  res.json(actions);
});

module.exports = router;
