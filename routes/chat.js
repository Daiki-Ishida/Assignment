var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/top', (req, res, next) => {
  models.User.findByPk(req.session.uid).then((user) => {
    res.render('chat/top', { user: user });
  }).catch((err) => {
    console.log(err);
    res.redirect('/login');
  })
});

router.get('/other', (req, res, next) => {
  models.User.findByPk(req.session.uid).then((user) => {
    res.render('chat/other', { user: user });
  }).catch((err) => {
    console.error(err);
    res.redirect('/login');
  })
});

router.get('/create', (req, res, next) => {
  res.render('chat/create');
})

router.post('/create', (req, res, next) => {
  models.Room.create({
    name: req.body.name,
    host_id: req.session.uid
  })
  res.redirect('/chat/rooms');
})

router.get('/rooms', (req, res, next) => {
  models.Room.findAll({
    include: [{
      model: models.User,
      as: 'Host',
      attributes: ['name']
    }]
  }).then((rooms) => {
    res.render('chat/rooms', { rooms: rooms });
  })
})

module.exports = router;
