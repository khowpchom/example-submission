module.exports = (sequelize, Sequelize) => {
  const ExchangeRate = sequelize.define('ExchangeRate', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      crypto_id: Sequelize.INTEGER,
      tocrypto_id: Sequelize.INTEGER,
      rate: {
        type: Sequelize.DECIMAL(10,2),
        validate: {
          min: 0
        }
      }
  })
  ExchangeRate.associate = (models) => {
    ExchangeRate.belongsTo(models.Crypto, {
      foreignKey: "crypto_id",
      as: "currency"
    })
    ExchangeRate.belongsTo(models.Crypto, {
      foreignKey: "tocrypto_id",
      as: "to_currency"
    })
  }
  return ExchangeRate
}