module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
          type: Sequelize.STRING,
          unique: true
      }
  })
  User.associate = (models) => {
    User.hasMany(models.Wallet, {
      foreignKey: "user_id",
      as: "wallets"
    })
  }
  return User
}