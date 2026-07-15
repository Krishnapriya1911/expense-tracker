const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { complaints, genomeClusters, radarAlerts, rbiItems, clsData } = require('../utils/mockData');

let Complaint;
try { Complaint = require('../models/Complaint'); } catch {}

router.get('/summary', authMiddleware, async (req, res) => {
  try {
    let stats = {};
    if (Complaint) {
      const total    = await Complaint.countDocuments();
      const resolved = await Complaint.countDocuments({ status: 'resolved' });
      const pending  = await Complaint.countDocuments({ status: { $in: ['pending','in_progress'] } });
      const rbiRisk  = await Complaint.countDocuments({ rbiRisk: true });
      stats = { total, resolved, pending, rbiRisk };
    } else {
      stats = {
        total:    complaints.length,
        resolved: complaints.filter(c => c.status === 'resolved').length,
        pending:  complaints.filter(c => ['pending','in_progress'].includes(c.status)).length,
        rbiRisk:  complaints.filter(c => c.rbiRisk).length,
      };
    }
    res.json({
      success: true,
      stats: {
        ...stats,
        avgResolutionTime: '4 min',
        genomeClusters: genomeClusters.length,
        preComplaintAlerts: radarAlerts.length,
        rbiLettersGenerated: 48,
        preventionRate: 73,
        revenueAtRisk: clsData.filter(x=>['critical','high'].includes(x.status)).reduce((s,x)=>s+x.ltv,0),
      },
      recentComplaints: complaints.slice(0, 5),
      topClusters: genomeClusters.slice(0, 3),
      urgentRBI: rbiItems.filter(x => x.status === 'critical'),
      criticalRadar: radarAlerts.filter(x => x.level === 'critical'),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
