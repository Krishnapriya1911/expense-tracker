// cls.js
const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { clsData } = require('../utils/mockData');

router.get('/', authMiddleware, (req, res) => {
  const critical = clsData.filter(x => x.status === 'critical').length;
  const high     = clsData.filter(x => x.status === 'high').length;
  const revenueAtRisk = clsData.filter(x => ['critical','high'].includes(x.status)).reduce((s,x)=>s+x.ltv,0);
  res.json({ success: true, data: clsData, stats: { critical, high, revenueAtRisk, retentionActions: 23 } });
});
router.post('/:id/retain', authMiddleware, (req, res) => {
  const c = clsData.find(x => x.id === req.params.id);
  res.json({ success: true, message: `Retention offer sent to ${c ? c.name : req.params.id}`, offer: 'Zero-fee account + 0.5% extra FD rate for 1 year', rmAssigned: 'Senior RM — Regional Office', expectedRetention: 'High' });
});

module.exports = router;
