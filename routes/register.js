var express = require('express');
var router = express.Router();

// csrf
const Tokens = require("csrf");
const tokens = new Tokens();
const setToken = async (req, res) => {
  const secret = await tokens.secretSync();
  const token = await tokens.create(secret);
  req.session.csrf = secret;
  res.cookie('csrf', token);
}
const checkToken = async (req, res) => {
  const secret = await req.session.csrf;
  const token = await req.cookies.csrf;
  if (tokens.verify(secret, token) === false) {
    throw new Error("Invalid Token");
  }
  console.log('varified!')
  delete req.session.csrf;
  res.clearCookie('csrf');
}

var models = require('../models');

router.get('/', function (req, res, next) {
  setToken(req, res);
  res.render('register');
});

router.post('/', (req, res, next) => {
  checkToken(req, res);
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    password_digest: req.body.password
  }).then((user) => {
    console.log('user created!');
    user.login(req, res);
  }).catch(() => {
    console.log('failed to create user!');
    res.redirect('/register');
  })
});

module.exports = router;
