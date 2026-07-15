// genome.js
const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { genomeClusters } = require('../utils/mockData');

router.get('/', authMiddleware, (req, res) => {
  res.json({ success: true, data: genomeClusters, total: genomeClusters.length, totalTickets: genomeClusters.reduce((s,c)=>s+c.count,0) });
});
router.get('/:id', authMiddleware, (req, res) => {
  const c = genomeClusters.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ success:false, message:'Cluster not found' });
  res.json({ success: true, data: c });
});
router.post('/:id/fix', authMiddleware, (req, res) => {
  const c = genomeClusters.find(x => x.id === req.params.id);
  res.json({ success: true, message: `Root cause fix initiated for: ${c ? c.title : req.params.id}`, estimatedResolution: '2 hours', ticketsAffected: c ? c.count : 0 });
});

module.exports = router;
