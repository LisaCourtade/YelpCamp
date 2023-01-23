const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const User = require('../models/user');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout', users.logout)

module.exports = router;