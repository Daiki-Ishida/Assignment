var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', (req, res, next) => {
  const pwd = req.body.password
  models.User.findOne(
    {
      where: {
        email: req.body.email,
      }
    }).then(async (user) => {
      await user.authenticate(pwd, req.session);
      res.redirect('/chat/top');
    }).catch(() => {
      console.log('error!');
      res.redirect('/login');
    })
})

module.exports = router;
