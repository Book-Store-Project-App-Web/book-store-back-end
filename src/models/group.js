'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsToMany(models.User, { through: 'Group_User' })
      Group.belongsToMany(models.Screen, { through: 'Group_Screen' })
    }
  }
  Group.init(
    {
      groupName: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Group'
    }
  )
  return Group
}
