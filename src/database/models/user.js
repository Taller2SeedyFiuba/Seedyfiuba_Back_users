'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      birthdate: { type: DataTypes.DATEONLY },
      email: { type: DataTypes.STRING },
      signindate: {
        type: DataTypes.DATE
      },
      isadmin: DataTypes.BOOLEAN
    }, {
      tableName: 'users',
      timestamps: false,
    }
  );

  User.beforeCreate((user, options) => {
    user.signindate = new Date().toISOString();
  })

  return User;
};
