const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require('../utils/email/email');
const helpers = require('./helpers/helper');
const passwordResetTemplate = require('../utils/email/passwordResetTemplate');
const emailVerificationTemplate = require('../utils/email/emailVerificationTemplate');

const createToken = userId =>
  jwt.sign({ id: userId }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

// EMAIL VERIFICATION
exports.emailVerification = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const user = await User.findOne({ email });

    if (user?.status === 'active') {
      helpers.serverError('Fail', 401, 'Email Id already exists');
      return next(err);
    } else if (user?.status === 'inactive') {
      helpers.serverError('Fail', 401, 'OTP is already send. You have 10 minutes.');
      return next(err);
    }

    const otp = Math.random().toFixed(6).slice(2);
    const otpExpiry = Date.now() + 10 * 60 * 1000;
    await User.create({ email, otp, role, otpExpiry });

    const emailVerification = emailVerificationTemplate(otp);
    await sendEmail({
      email,
      subject: 'Mern Cart - Verify Email',
      html: emailVerification,
    });

    res.status(201).send('OTP Sent');
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 400, 'Please try again.');
    next(err);
  }
};

// CREATING ACTIVE USER
exports.registerUser = async (req, res, next) => {
  try {
    const { email, name, password, otp } = req.body;

    const user = await User.findOne({ email });

    if (user.status === 'active') {
      helpers.serverError('Fail', 401, 'Email Id already exists. Please login to continue.');
      return next(err);
    }

    if (user.status === 'inactive' && user.otpExpiry < Date.now()) {
      await User.deleteOne({ email });
      return res.status(401).send('Please verify your email again.');
    }

    if (otp !== user.otp) {
      helpers.serverError('Fail', 401, 'Please enter correct OTP.');
      return next(err);
    }

    await user.createActiveUser(name, password, 'active', undefined);
    await user.save({ validateBeforeSave: false }, function (err) {
      if (err) console.log(err);
    });

    user.password = 'mid';

    const token = createToken(user._id);

    res.cookie('jwt', token, {
      expires: new Date(Date.now() + parseInt(process.env.TOKEN_EXPIRY) * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    helpers.serverResponse(res, 'Success', 201, token, user);
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 400, 'Please try again.');
    next(err);
  }
};

// LOGIN USER
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      helpers.serverError('Fail', 400, 'Please provide your email and password.');
      return next(err);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!(await user.verifyPassword(password))) {
      helpers.serverError('Fail', 401, 'Incorrect email or password.');
      return next(err);
    }

    user.password = 'mid';

    const token = createToken(user._id);

    res.cookie('jwt', token, {
      expires: new Date(Date.now() + parseInt(process.env.TOKEN_EXPIRY) * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    helpers.serverResponse(res, 'Success', 200, token, user);
  } catch (err) {
    helpers.catchServerError(
      err,
      'Fail',
      400,
      'You are not registered. Please create a new account.'
    );
    next(err);
  }
};

exports.getLoggedUser = async (req, res) => {
  if (req.cookies.jwt) {
    const decoded = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET_KEY);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) res.end();

    helpers.serverResponse(res, 'Success', 200, undefined, currentUser);
  } else {
    res.end();
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    helpers.serverResponse(res, 'Success', 200, undefined, users);
  } catch (err) {
    helpers.catchServerError(err, 'Fail', 400, 'Unable to fetch all users.');
    return next(err);
  }
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.status === 'inactive') {
      helpers.serverError(
        'Fail',
        401,
        'It seems like you have not created an account with us yet. Please register.'
      );
      return next(err);
    }

    const resetToken = await user.forgotPasswordToken();
    await user.save({ validateBeforeSave: false }, function (err) {
      if (err) console.log(err);
    });

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/mern-shopping-cart/users/resetPassword/${resetToken}`;

    // SENDING MAIL
    const resetTemplate = passwordResetTemplate(resetUrl);

    await sendEmail({
      email: user.email,
      subject: 'Mern Cart - Reset Password',
      html: resetTemplate,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    helpers.catchServerError(
      err,
      'Fail',
      400,
      'You are not registered. Please create a new account.'
    );
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    helpers.serverError('Fail', 400, 'The link has expired now. Please try again.');
    return next(err);
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = createToken(user._id);
  helpers.serverResponse(res, 'Success', 201, token, user);
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { _id } = req.user;

  const user = await User.findById(_id).select('+password');

  if (!(await user.verifyPassword(oldPassword))) {
    helpers.serverError('Fail', 400, 'The current password is wrong');
    return next(err);
  }

  user.password = newPassword;
  user.passwordChangedAt = new Date().toISOString();
  await user.save();

  const token = createToken(_id);
  helpers.serverResponse(res, 'Success', 201, token, user);
};

// LOGOUT USER
exports.logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send('Logout');
};
