require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const path       = require('path');

const authRoutes       = require('./routes/auth');
const complaintRoutes  = require('./routes/complaints');
const genomeRoutes     = require('./routes/genome');
const radarRoutes      = require('./routes/radar');
const rbiRoutes        = require('./routes/rbi');
const clsRoutes        = require('./routes/cls');
const dashRoutes       = require('./routes/dashboard');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ─────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve static frontend ──────────────────────────
app.use(express.static(path.join(__dirname, '../frontend/public')));

// ── API Routes ─────────────────────────────────────
app.use('/api/auth',       authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/genome',     genomeRoutes);
app.use('/api/radar',      radarRoutes);
app.use('/api/rbi',        rbiRoutes);
app.use('/api/cls',        clsRoutes);
app.use('/api/dashboard',  dashRoutes);

// ── Health check ───────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    project: 'NivAaran',
    version: '1.0.0',
    team: 'Team Sankalpa',
    hackathon: 'iDEA 2.0 PS5 — Union Bank of India'
  });
});

// ── Catch-all: serve frontend ──────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// ── Connect DB & Start ─────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅  MongoDB connected');
    const { seedDatabase } = require('./utils/seed');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`\n🌿  NivAaran running at http://localhost:${PORT}`);
      console.log(`📊  Dashboard  → http://localhost:${PORT}/dashboard.html`);
      console.log(`🔐  Login      → http://localhost:${PORT}/login.html`);
      console.log(`\n🔑  Demo login: emp=DEMO-AGENT  pwd=demo123\n`);
    });
  })
  .catch(err => {
    console.warn('⚠️  MongoDB not available — running with in-memory mock data');
    console.log(err.message);
    // Still start server with mock data
    app.listen(PORT, () => {
      console.log(`\n🌿  NivAaran (mock mode) → http://localhost:${PORT}`);
      console.log(`📊  Dashboard → http://localhost:${PORT}/dashboard.html`);
      console.log(`🔑  Login: emp=DEMO-AGENT  pwd=demo123\n`);
    });
  });

module.exports = app;
