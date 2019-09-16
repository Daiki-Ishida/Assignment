var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function (req, res, next) {
  res.render('register');
});

router.post('/', async (req, res, next) => {
  const user = await models.User.create({
    name: req.body.name,
    email: req.body.email,
    password_digest: req.body.password
  })
  if (user) {
    console.log('user created!');
    user.login(req.session);
    res.redirect('/chat/top');
  } else {
    console.log('failed to create user!');
    res.redirect('/register');
  }
});

module.exports = router;
