'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};