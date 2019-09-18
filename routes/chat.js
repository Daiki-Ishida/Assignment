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
  models.User.findAll().then((users) => {
    res.render('chat/create', { users: users });
  })
})

router.post('/create', async (req, res, next) => {
  const guests = await models.User.findAll({
    where: {
      id: req.body.guests
    }
  });
  const newRoom = await models.Room.create({
    name: req.body.name,
    host_id: req.session.uid
  });
  if (!newRoom) {
    res.redirect('/chat/create');
  } else {
    newRoom.setGuests(guests);
    res.redirect('/chat/rooms');
  }
})

router.get('/rooms', (req, res, next) => {
  models.Room.findAll({
    include: [{
      model: models.User,
      as: 'host',
      attributes: ['name']
    }]
  }).then((rooms) => {
    res.render('chat/rooms', { rooms: rooms });
  }).catch((err) => {
    console.error(err);
    res.redirect('/');
  })
})

router.get('/rooms/:id', async (req, res, next) => {
  const user = await models.User.findByPk(req.session.uid);
  const room = await models.Room.findByPk(
    req.params.id,
    {
      include: [{
        model: models.User,
        as: 'host',
        attributes: ['name']
      }, {
        model: models.User,
        as: 'guests',
        attributes: ['id', 'name']
      }]
    }
  );
  if (user.isHost(room.host) || user.isGuest(room.guests)) {
    res.render('chat/room', { room: room })
  } else {
    console.log('a user is not authorized to enter this room!');
    res.redirect('/chat/rooms');
  }
})

module.exports = router;
