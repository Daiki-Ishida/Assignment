'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    name: DataTypes.STRING,
    host_id: DataTypes.INTEGER,
  }, {
    underscored: true,
  });
  Room.associate = function (models) {
    Room.hasMany(models.Message, { foreignKey: 'room_id' });
    Room.belongsTo(models.User, { as: 'Host' });
    // Room.belongsToMany(models.User, { through: models.Guest })
  };
  return Room;
};