var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function (req, res, next) {
  res.render('register');
});

router.post('/', (req, res, next) => {
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    password_digest: req.body.password
  }).then((user) => {
    console.log('user created!');
    req.session.uid = user.id;
    res.redirect('/chat/top');
  }).catch((err) => {
    console.log('error!');
    console.log(err);
    res.redirect('/register');
  })
})

module.exports = router;
