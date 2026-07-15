const jwt = require('jsonwebtoken');

// In-memory users for mock mode (when MongoDB is not available)
const mockUsers = [
  { _id:'1', firstName:'K.', lastName:'Krishnapriya', employeeId:'DEMO-AGENT',  role:'agent',      bank:'Union Bank of India', branch:'Mumbai Central', password:'$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LfEMttnObkK' },
  { _id:'2', firstName:'Branch', lastName:'Manager',  employeeId:'DEMO-MGR',    role:'manager',    bank:'Union Bank of India', branch:'Delhi South',    password:'$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LfEMttnObkK' },
  { _id:'3', firstName:'Compliance', lastName:'Officer', employeeId:'DEMO-CO', role:'compliance', bank:'Union Bank of India', branch:'Chennai HQ',     password:'$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LfEMttnObkK' },
];
// password hash above = 'demo123'

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nivaaran_secret');
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = { authMiddleware, mockUsers };
