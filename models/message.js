'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    underscored: true,
  });
  Message.associate = function (models) {
    Message.belongsTo(models.User);
    Message.belongsTo(models.Room);
  };
  return Message;
};