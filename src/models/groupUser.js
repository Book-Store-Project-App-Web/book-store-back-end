'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Group_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group_User.init(
    {
      GroupId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Group',
          key: 'id'
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Group_User'
    }
  )
  return Group_User
}
