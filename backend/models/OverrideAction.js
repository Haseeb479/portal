const mongoose = require('mongoose');
const OverrideActionSchema = new mongoose.Schema({
  type: String,
  entityId: String,
  previousStatus: String,
  newStatus: String,
  performedBy: String,
  performedAt: { type: Date, default: Date.now },
  reason: String
});
module.exports = mongoose.model('OverrideAction', OverrideActionSchema);
