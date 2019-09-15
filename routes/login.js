var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', (req, res, next) => {
  models.User.findOne({
    email: req.body.email,
    password_digest: req.body.password
  }).then((user) => {
    console.log('safely logged in!');
    req.session.uid = user.id;
    res.redirect('/chat/top');
  }).catch((err) => {
    console.log('error!');
    console.log(err);
    res.redirect('/login');
  })
})

module.exports = router;
