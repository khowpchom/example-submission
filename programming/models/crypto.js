module.exports = (sequelize, Sequelize) => {
  const Crypto = sequelize.define('Crypto', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      currency: {
          type: Sequelize.STRING,
          unique: true
      }
  })
  Crypto.associate = (models) => {
    Crypto.hasMany(models.Wallet, {
      foreignKey: "crypto_id",
      as: "total"
    })
  }
  return Crypto
}