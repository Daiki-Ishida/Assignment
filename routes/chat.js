var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/top', function (req, res, next) {
  res.render('chat/top');
});

module.exports = router;
