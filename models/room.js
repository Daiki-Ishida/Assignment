'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  Room.associate = function (models) {
    Room.hasMany(models.Message, { foreignKey: 'room_id' });
    Room.belongsTo(models.User, { as: 'Host' });
    Room.belongsToMany(models.User, { thorough: models.Guest })
  };
  return Room;
};