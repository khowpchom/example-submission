const userController = require('../controller').user
const cryptoController = require('../controller').crypto
const walletController = require('../controller').wallet
const exchangeRateController = require('../controller').exchangeRate

module.exports = app => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      data: "Welcome Simple Wallet API v1",
    })
  })
  app.get("/api/users", userController.getAllUsers)
  app.get("/api/user/:id", userController.getUser)
  app.post("/api/user/create", userController.create)
  app.patch("/api/user/:id", userController.update)

  app.get("/api/cryptos", cryptoController.getAllCryptos)
  app.get("/api/crypto/:id", cryptoController.getCrypto)
  app.post("/api/crypto/create", cryptoController.create)

  app.get("/api/wallets", walletController.getAllWallets)
  // Admin can see all total balance of all cryptocurrency.
  app.get("/api/wallets/total", walletController.getTotalBalances)
  app.get("/api/wallet/:id", walletController.getWallet)
  app.post("/api/wallet/create", walletController.create)
  // Admin can increase user cryptocurrency balance.
  app.patch("/api/wallet/increase/:id", walletController.increaseBalance)
  // Admin can decrease user cryptocurrency balance.
  app.patch("/api/wallet/decrease/:id", walletController.decreaseBalance)
  // User can transfer cryptocurrency to other.
  // User can transfer cryptocurrency to other with difference currency such ETH to BTC with exchange rate.
  app.patch("/api/wallet/transfer", walletController.transferBalance)

  app.get("/api/exchangerates/", exchangeRateController.getAllExchangeRates)
  // Admin can add other cryptocurrency such XRP, EOS, XLM to wallet.
  app.post("/api/exchangerate/create", exchangeRateController.create)
  // Admin can manage exchange rate between cryptocurrency.
  app.patch("/api/exchangerate/update", exchangeRateController.updateExchangeRate)
}