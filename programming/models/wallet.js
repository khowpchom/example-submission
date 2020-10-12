module.exports = (sequelize, Sequelize) => {
  const Wallet = sequelize.define('Wallet', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      user_id: Sequelize.INTEGER,
      crypto_id: Sequelize.INTEGER,
      balance: {
        type: Sequelize.DECIMAL(10,2),
        validate: {
          min: 0
        }
      }
  })
  Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "owner"
    })
    Wallet.belongsTo(models.Crypto, {
      foreignKey: "crypto_id",
      as: "currency"
    })
  }
  return Wallet
}