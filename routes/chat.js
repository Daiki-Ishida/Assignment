var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/top', function (req, res, next) {
  models.User.findByPk(req.session.uid).then((user) => {
    res.render('chat/top', { user: user });
  }).catch((err) => {
    console.log(err);
    res.redirect('/login');
  })
});

router.get('/other', function (req, res, next) {
  models.User.findByPk(req.session.uid).then((user) => {
    res.render('other', { user: user });
  }).catch((err) => {
    console.error(err);
    res.redirect('/login');
  })
});

module.exports = router;
