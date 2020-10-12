const ExchangeRate = require('../models').ExchangeRate
const Crypto = require('../models').Crypto

module.exports = {
  getAllExchangeRates: async (req, res) => {
    try {
      const exchange = await ExchangeRate.findAll({
        include: [{
          model: Crypto,
          as: 'currency'
        },
        {
          model: Crypto,
          as: 'to_currency'
        }]
      })
      res.status(200).send(exchange)
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  create: async (req, res) => {
    try {
      const exchange = await ExchangeRate.findOne({
        where: {
          crypto_id: req.body.crypto_id,
          tocrypto_id: req.body.tocrypto_id
        }
      })
      if (!exchange) {
        if (req.body.crypto_id === req.body.tocrypto_id) {
            res.status(404).send("Can't Assign Exchange Rate Same Currency")
        }
        else {
            const exchange = await ExchangeRate.create({
                crypto_id: req.body.crypto_id,
                tocrypto_id: req.body.tocrypto_id,
                rate: req.body.rate
            })
            res.status(201).send(exchange)
        }
      }
      else {
        res.status(404).send("Exchange Rate Already Have")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },
  updateExchangeRate: async (req, res) => {
    try {
      const exchange = await ExchangeRate.findOne({
        where: {
          crypto_id: req.body.crypto_id,
          tocrypto_id: req.body.tocrypto_id
        }
      })
      if (exchange) {
        const exchange = await ExchangeRate.update({
          rate: req.body.rate
        }, { 
          where: {
            crypto_id: req.body.crypto_id,
            tocrypto_id: req.body.tocrypto_id
          }
        })
        console.log(exchange)
        res.status(200).send(exchange)
      } 
      else {
        res.status(404).send("Exchange Rate Not Found")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}
