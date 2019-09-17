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
    User.hasMany(models.Message, { foreignKey: 'user_id' });
    User.hasMany(models.Room, { foreignKey: 'user_id' });
    User.belongsToMany(models.Room, { thorough: models.Guest })
  };

  // Instance Methods
  User.prototype.login = function (req, res) {
    req.session.uid = this.id;
    const url = req.session.url || '/chat/top'
    res.redirect(url);
    delete req.session.url
  };
  User.prototype.isAuthenticated = function (input) {
    return bcrypt.compare(input, this.password_digest);
  };

  return User;
};

const hashPassword = async (user, options) => {
  const pwd = user.password_digest
  const hashedPwd = await bcrypt.hash(pwd, saltRounds)
  user.password_digest = hashedPwd;
}