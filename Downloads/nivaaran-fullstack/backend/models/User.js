const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName:  { type: String, required: true, trim: true },
  lastName:   { type: String, required: true, trim: true },
  employeeId: { type: String, required: true, unique: true, uppercase: true },
  bank:       { type: String, default: 'Union Bank of India' },
  role:       { type: String, enum: ['agent','manager','compliance','executive'], default: 'agent' },
  password:   { type: String, required: true, minlength: 6 },
  branch:     { type: String, default: 'Mumbai Central' },
  isActive:   { type: Boolean, default: true },
  lastLogin:  { type: Date }
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(plain) {
  return bcrypt.compare(plain, this.password);
};

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', userSchema);
