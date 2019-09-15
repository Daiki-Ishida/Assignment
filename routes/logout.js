var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  req.session.uid = '';
  res.redirect('/login');
})

module.exports = router;