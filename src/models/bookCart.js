'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Book_Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book_Cart.init(
    {
      BookId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Book',
          key: 'id'
        }
      },
      CartId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Cart',
          key: 'id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      unitPrice: {
        type: DataTypes.DOUBLE
      }
    },
    {
      sequelize,
      modelName: 'Book_Cart'
    }
  )
  return Book_Cart
}
