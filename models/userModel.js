const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  email: {
    type: String,
    required: [true, 'An email id is required,'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email-id.'],
  },
  name: {
    type: String,
  },
  accountCreated: {
    type: Date,
    default: Date.now(),
  },
  password: {
    type: String,
    minlength: [8, 'Minimum length of password should be 8 characters.'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  otp: String,
  otpExpiry: Date,
});

// CREATING ACTIVE USER
userSchema.methods.createActiveUser = async function (name, password, active, undefined) {
  this.name = name;
  this.password = password;
  this.status = active;
  this.otp = undefined;
  this.otpExpiry = undefined;
};

// ENCRYPTING PASSWORD
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 14);
  next();
});

// VERIFYING USER WITH PASSWORD
userSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// GENERATING FORGOT PASSWORD TOKEN
userSchema.methods.forgotPasswordToken = async function () {
  const resetToken = crypto.randomBytes(40).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
