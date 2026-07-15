const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth');
const { rbiItems } = require('../utils/mockData');

router.get('/', authMiddleware, (req, res) => {
  const urgent  = rbiItems.filter(x => x.status === 'critical').length;
  const warning = rbiItems.filter(x => x.status === 'warning').length;
  const safe    = rbiItems.filter(x => x.status === 'safe').length;
  res.json({ success: true, data: rbiItems, stats: { urgent, warning, safe, lettersGenerated: 48 } });
});
router.post('/:id/generate-letter', authMiddleware, (req, res) => {
  const item = rbiItems.find(x => x.id === req.params.id);
  const letter = `
UNDER: RBI Banking Ombudsman Scheme 2021
DATE: ${new Date().toLocaleDateString('en-IN')}
REF: ${item ? item.complaintId : req.params.id}

TO: The Banking Ombudsman
FROM: Union Bank of India — Compliance Department

SUBJECT: Response to Customer Complaint — ${item ? item.customer : 'Customer'}

Dear Sir/Madam,

We refer to the complaint dated [date] filed by ${item ? item.customer : 'the customer'} regarding:
${item ? item.complaint : 'the matter referenced above'}

We have investigated the matter thoroughly and are pleased to inform that:
1. The complaint has been acknowledged and processed within the stipulated SLA.
2. Resolution steps have been initiated as per RBI guidelines.
3. Customer has been informed of the timeline and resolution plan.

We assure full compliance with RBI Banking Ombudsman Scheme 2021.

Yours faithfully,
Compliance Officer
Union Bank of India
`;
  res.json({ success: true, letter: letter.trim(), generatedAt: new Date(), format: 'RBI Ombudsman Scheme 2021', complaintId: item ? item.complaintId : req.params.id });
});

module.exports = router;
