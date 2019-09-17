'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define('Guest', {
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  Guest.associate = function(models) {
    // associations can be defined here
  };
  return Guest;
};