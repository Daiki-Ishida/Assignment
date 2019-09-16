'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    underscored: true,
    hooks: {
      beforeSave: hashPassword,
      beforeUpdate: hashPassword
    },
  });
  User.associate = function (models) {
    // associations can be defined here
  };

  // Instance Methods
  User.prototype.login = function (session) {
    session.uid = this.id;
  };
  User.prototype.authenticate = async function (input, session) {
    const match = await bcrypt.compare(input, this.password_digest);
    if (match) {
      this.login(session)
    }
  };

  return User;
};

const hashPassword = async (user, options) => {
  const pwd = user.password_digest
  const hashedPwd = await bcrypt.hash(pwd, saltRounds)
  user.password_digest = hashedPwd;
}