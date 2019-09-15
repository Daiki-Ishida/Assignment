var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    req.session.uid = user.id;
    res.redirect('/chat/top');
  } else {
    console.log(err);
    res.redirect('/register');
  }
});

module.exports = router;
