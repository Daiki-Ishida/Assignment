var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', async (req, res, next) => {
  const pwd = req.body.password;
  const user = await models.User.findOne({ where: { email: req.body.email } });
  if (user && await user.isAuthenticated(pwd)) {
    user.login(req, res);
  } else {
    res.redirect('/login');
  }
})

module.exports = router;
