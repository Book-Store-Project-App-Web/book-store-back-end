'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Supplier.hasMany(models.Book, {
        foreignKey: 'supplierId'
      })
    }
  }
  Supplier.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Supplier'
    }
  )
  return Supplier
}
