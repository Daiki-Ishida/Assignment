var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  delete req.session.uid;
  res.redirect('/');
})

module.exports = router;