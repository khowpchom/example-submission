const Crypto = require('../models').Crypto
const Wallet = require('../models').Wallet

module.exports = {
  getAllCryptos: async (req, res) => {
    try {
      const crypto = await Crypto.findAll({
        include: [{
          model: Wallet,
          as: 'total'
        }]
      })
      res.status(200).send(crypto)
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  getCrypto: async (req, res) => {
    try {
      const crypto = await Crypto.findAll({
        where: {
          id: req.params.id
        },
        include: [{
          model: Wallet,
          as: 'total'
        }]
      })
      if (crypto) {
        res.status(200).send(crypto)
      } 
      else {
        res.status(404).send("Crypto Not Found")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  create: async (req, res) => {
    try {
      const crypto = await Crypto.create({
        currency: req.body.currency
      })
      res.status(201).send(crypto)
    } 
    catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  }
}
