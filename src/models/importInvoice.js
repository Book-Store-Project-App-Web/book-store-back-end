'use strict'
import { Model } from 'sequelize'
module.exports = (sequelize, DataTypes) => {
  class Import_Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Import_Invoice.belongsToMany(models.Book, { through: 'Book_ImportInvoice' })
      Import_Invoice.belongsTo(models.User)
    }
  }
  Import_Invoice.init(
    {
      supplier: {
        type: DataTypes.STRING
      },
      totalInvoice: {
        type: DataTypes.DOUBLE
      }
    },
    {
      sequelize,
      modelName: 'Import_Invoice'
    }
  )
  return Import_Invoice
}
