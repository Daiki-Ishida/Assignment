'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
  });
  Message.associate = function (models) {
    Message.belongsTo(models.User);
    Message.belongsTo(models.Room);
  };
  return Message;
};