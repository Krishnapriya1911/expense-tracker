const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { complaints } = require('../utils/mockData');

let Complaint;
try { Complaint = require('../models/Complaint'); } catch {}

// GET all complaints
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, type, channel, search } = req.query;
    if (Complaint) {
      let q = {};
      if (status)  q.status = status;
      if (type)    q.type = type;
      if (channel) q.channel = channel;
      if (search)  q['customer.name'] = new RegExp(search, 'i');
      const data = await Complaint.find(q).sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, data, count: data.length });
    }
    // Mock
    let data = [...complaints];
    if (status)  data = data.filter(c => c.status === status);
    if (search)  data = data.filter(c => c.customer.name.toLowerCase().includes(search.toLowerCase()) || c.complaintId.includes(search));
    res.json({ success: true, data, count: data.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single complaint
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    if (Complaint) {
      const c = await Complaint.findOne({ complaintId: id });
      if (!c) return res.status(404).json({ success: false, message: 'Not found' });
      return res.json({ success: true, data: c });
    }
    const c = complaints.find(x => x.complaintId === id);
    if (!c) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: c });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new complaint
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { customerName, customerPhone, type, channel, description, priority } = req.body;
    if (!customerName || !type) return res.status(400).json({ success: false, message: 'Customer name and type required' });
    const newId = '#' + (5000 + Math.floor(Math.random()*1000));
    const newComplaint = {
      complaintId: newId,
      customer: { name: customerName, phone: customerPhone },
      type, channel: channel || 'call', description,
      priority: priority || 'medium', status: 'pending',
      slaDayCount: 1, rbiRisk: false, churnRisk: 20,
      aiDraft: `Dear ${customerName}, Thank you for reaching out to Union Bank of India. We have received your complaint regarding ${type} and will resolve it within 4 business days. Reference: ${newId}`,
      createdAt: new Date()
    };
    if (Complaint) {
      const saved = await Complaint.create({ ...newComplaint, customer: newComplaint.customer });
      return res.status(201).json({ success: true, data: saved, message: 'Complaint registered successfully' });
    }
    complaints.unshift(newComplaint);
    res.status(201).json({ success: true, data: newComplaint, message: 'Complaint registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH update status
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending','in_progress','resolved','escalated'].includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status' });
    if (Complaint) {
      const c = await Complaint.findOneAndUpdate({ complaintId: req.params.id }, { status, ...(status==='resolved' ? { resolvedAt: new Date() } : {}) }, { new: true });
      return res.json({ success: true, data: c });
    }
    const c = complaints.find(x => x.complaintId === req.params.id);
    if (c) c.status = status;
    res.json({ success: true, data: c, message: `Status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST generate AI draft
router.post('/:id/draft', authMiddleware, async (req, res) => {
  try {
    const c = complaints.find(x => x.complaintId === req.params.id);
    const draft = c ? c.aiDraft : `Dear Customer, We have received your complaint and will resolve it within 4 business days. Reference: ${req.params.id}`;
    res.json({ success: true, draft, generatedAt: new Date(), complaintId: req.params.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
