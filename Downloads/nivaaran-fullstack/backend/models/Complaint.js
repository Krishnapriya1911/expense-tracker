const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId:   { type: String, required: true, unique: true },
  customer: {
    name:    { type: String, required: true },
    phone:   String,
    account: String,
    email:   String
  },
  type:      { type: String, required: true },
  channel:   { type: String, enum: ['email','call','twitter','branch','app','whatsapp','ivr'], default: 'call' },
  priority:  { type: String, enum: ['critical','high','medium','low'], default: 'medium' },
  status:    { type: String, enum: ['pending','in_progress','resolved','escalated'], default: 'pending' },
  description: String,
  slaDayCount: { type: Number, default: 1 },
  genomeCluster: { type: String, default: null },
  aiDraft:   { type: String, default: null },
  sentiment: { type: Number, default: 0 },   // -1 to 1
  rbiRisk:   { type: Boolean, default: false },
  churnRisk: { type: Number, default: 0 },   // 0-100
  resolvedAt: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
