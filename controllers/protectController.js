const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const helpers = require('./helpers/helper');

exports.routeProtect = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      helpers.serverError('Fail', 401, 'Please sign in to continue.');
      return next(err);
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      helpers.serverError('Fail', 401, 'Please sign in to continue.');
      return next(err);
    }

    req.user = freshUser;

    next();
  } catch (err) {
    helpers.catchServerError('Fail', 404, 'Token is invalid. Please login again.');
    next(err);
  }
};

exports.verifyAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role === 'admin') {
    next();
  } else if (role === 'user') {
    helpers.serverError('Fail', 401, 'You are not authorized to view this route.');
    return next(err);
  }
};
