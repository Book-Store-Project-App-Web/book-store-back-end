'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Book_ImportInvoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book_ImportInvoice.init(
    {
      BookId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Book',
          key: 'id'
        }
      },
      Import_InvoiceId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Import_Invoice',
          key: 'id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'Book_ImportInvoice'
    }
  )
  return Book_ImportInvoice
}
