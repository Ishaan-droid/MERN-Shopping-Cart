const express = require('express');
const userController = require('../controllers/userController');
const protectController = require('../controllers/protectController');

const router = express.Router();

// GET ALL USERS
router.get(
  '/',
  protectController.routeProtect,
  protectController.verifyAdmin,
  userController.getAllUsers
);

router.get('/getLoggedUser', userController.getLoggedUser);

// CREATE USER
router.post('/verifyMail', userController.emailVerification);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// FORGOT PASSWORD
router.post('/forgotPassword', userController.forgotPassword);
router.patch('/resetPassword/:resetToken', userController.resetPassword);

// UPDATE PASSWORD
router.patch('/updatePassword', protectController.routeProtect, userController.updatePassword);

// LOGOUT USER
router.get('/logout-user', userController.logoutUser);

module.exports = router;
