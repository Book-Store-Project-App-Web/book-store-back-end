'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cart, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Order, {
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sex: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
