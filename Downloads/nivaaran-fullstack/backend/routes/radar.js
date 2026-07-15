const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { radarAlerts } = require('../utils/mockData');

router.get('/', authMiddleware, (req, res) => {
  res.json({ success: true, data: radarAlerts, preventedToday: 34, preventionRate: 73 });
});
router.post('/:id/outreach', authMiddleware, (req, res) => {
  const r = radarAlerts.find(x => x.id === req.params.id);
  res.json({ success: true, message: `Outreach triggered for ${r ? r.name : req.params.id}`, method: 'SMS + Call', rmNotified: true, retentionOfferSent: true });
});

module.exports = router;
