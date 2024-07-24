'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Group_Screen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group_Screen.init(
    {
      GroupId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Group',
          key: 'id'
        }
      },
      ScreenId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Screen',
          key: 'id'
        }
      },
      isRole: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      sequelize,
      modelName: 'Group_Screen'
    }
  )
  return Group_Screen
}
