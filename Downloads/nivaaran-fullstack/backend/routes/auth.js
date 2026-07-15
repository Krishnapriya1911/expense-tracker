const router  = require('express').Router();
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const { mockUsers } = require('../middleware/auth');

let User;
try { User = require('../models/User'); } catch {}

const sign = (user) => jwt.sign(
  { id: user._id, employeeId: user.employeeId, role: user.role, name: `${user.firstName} ${user.lastName}`, bank: user.bank, branch: user.branch },
  process.env.JWT_SECRET || 'nivaaran_secret',
  { expiresIn: process.env.JWT_EXPIRES || '7d' }
);

// ── POST /api/auth/login ──────────────────────────
router.post('/login', async (req, res) => {
  const { employeeId, password } = req.body;
  if (!employeeId || !password)
    return res.status(400).json({ success: false, message: 'Employee ID and password required' });

  try {
    let user = null;

    // Try MongoDB first
    if (User) {
      try {
        user = await User.findOne({ employeeId: employeeId.toUpperCase() });
      } catch {}
    }

    // Fall back to mock users
    if (!user) {
      user = mockUsers.find(u => u.employeeId === employeeId.toUpperCase());
      if (!user) return res.status(401).json({ success: false, message: 'Invalid Employee ID or password' });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ success: false, message: 'Invalid Employee ID or password' });
      return res.json({ success: true, token: sign(user), user: { id: user._id, name: `${user.firstName} ${user.lastName}`, employeeId: user.employeeId, role: user.role, bank: user.bank, branch: user.branch } });
    }

    // MongoDB user
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid Employee ID or password' });
    if (User) await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    res.json({ success: true, token: sign(user), user: { id: user._id, name: user.fullName, employeeId: user.employeeId, role: user.role, bank: user.bank, branch: user.branch } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ── POST /api/auth/register ───────────────────────
router.post('/register', async (req, res) => {
  const { firstName, lastName, employeeId, bank, role, password, branch } = req.body;
  if (!firstName || !lastName || !employeeId || !password)
    return res.status(400).json({ success: false, message: 'All fields required' });
  if (password.length < 6)
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });

  try {
    if (User) {
      const exists = await User.findOne({ employeeId: employeeId.toUpperCase() });
      if (exists) return res.status(409).json({ success: false, message: 'Employee ID already registered' });
      const user = await User.create({ firstName, lastName, employeeId: employeeId.toUpperCase(), bank, role: role || 'agent', password, branch });
      return res.status(201).json({ success: true, token: sign(user), user: { id: user._id, name: user.fullName, employeeId: user.employeeId, role: user.role, bank: user.bank } });
    }
    // Mock mode — just return success
    const mockUser = { _id: Date.now(), firstName, lastName, employeeId: employeeId.toUpperCase(), role: role||'agent', bank: bank||'Union Bank of India', branch: branch||'Main' };
    res.status(201).json({ success: true, token: sign(mockUser), user: { id: mockUser._id, name: `${firstName} ${lastName}`, employeeId: mockUser.employeeId, role: mockUser.role, bank: mockUser.bank } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ── GET /api/auth/me ──────────────────────────────
router.get('/me', require('../middleware/auth').authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
