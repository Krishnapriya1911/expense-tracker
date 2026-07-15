const { complaints, genomeClusters } = require('./mockData');

let seeded = false;

async function seedDatabase() {
  if (seeded) return;
  try {
    const User       = require('../models/User');
    const Complaint  = require('../models/Complaint');

    // Seed demo users
    const demoUsers = [
      { firstName:'K.',       lastName:'Krishnapriya', employeeId:'DEMO-AGENT', role:'agent',      bank:'Union Bank of India', branch:'Mumbai Central', password:'demo123' },
      { firstName:'Branch',   lastName:'Manager',      employeeId:'DEMO-MGR',   role:'manager',    bank:'Union Bank of India', branch:'Delhi South',    password:'demo123' },
      { firstName:'Compliance',lastName:'Officer',     employeeId:'DEMO-CO',    role:'compliance', bank:'Union Bank of India', branch:'Chennai HQ',     password:'demo123' },
    ];
    for (const u of demoUsers) {
      const exists = await User.findOne({ employeeId: u.employeeId });
      if (!exists) await User.create(u);
    }

    // Seed complaints
    const count = await Complaint.countDocuments();
    if (count === 0) {
      for (const c of complaints) {
        await Complaint.create({
          complaintId:  c.complaintId,
          customer:     c.customer,
          type:         c.type,
          channel:      c.channel,
          priority:     c.priority,
          status:       c.status === 'in_progress' ? 'in_progress' : c.status,
          slaDayCount:  c.slaDayCount,
          genomeCluster:c.genomeCluster,
          sentiment:    c.sentiment,
          rbiRisk:      c.rbiRisk,
          churnRisk:    c.churnRisk,
          description:  c.description,
          aiDraft:      c.aiDraft,
          createdAt:    c.createdAt
        });
      }
    }
    seeded = true;
    console.log('✅  Database seeded with demo data');
  } catch (err) {
    console.warn('⚠️  Seeding skipped:', err.message);
  }
}

module.exports = { seedDatabase };
