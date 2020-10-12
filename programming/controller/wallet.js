const Wallet = require('../models').Wallet
const User = require('../models').User
const Crypto = require('../models').Crypto
const ExchangeRate = require('../models').ExchangeRate
const sequelize = require('sequelize')

module.exports = {
  getAllWallets: async (req, res) => {
    try {
      const wallet = await Wallet.findAll({
        include: [{
          model: User,
          as: 'owner'
        },
        {
          model: Crypto,
          as: 'currency'
        }]
      })
      res.status(200).send(wallet)
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  getWallet: async (req, res) => {
    try {
      const wallet = await Wallet.findAll({
        where: {
          id: req.params.id
        },
        include: [{
          model: User,
          as: 'owner'
        },
        {
          model: Crypto,
          as: 'currency'
        }]
      })
      if (wallet) {
        res.status(200).send(wallet)
      } 
      else {
        res.status(404).send("Wallet Not Found")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  create: async (req, res) => {
    try {
      const wallet = await Wallet.findOne({
        where: {
          user_id: req.body.user_id,
          crypto_id: req.body.crypto_id
        }
      })
      if (!wallet) {
        const wallet = await Wallet.create({
          balance: req.body.balance,
          user_id: req.body.user_id,
          crypto_id: req.body.crypto_id
        })
        res.status(201).send(wallet)
      }
      else {
        res.status(404).send("Wallet Of User Already Have")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },
  increaseBalance: async (req, res) => {
    try {
      const wallet = await Wallet.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['balance'],
        raw: true
      })
      const result = wallet.balance + req.body.amount
      if (wallet) {
        const wallet = await Wallet.update({
          balance: result
        }, { 
          where: { 
            id: req.params.id
          }
        })
        console.log(wallet)
        res.status(200).send(wallet)
      } 
      else {
        res.status(404).send("Wallet Not Found")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  decreaseBalance: async (req, res) => {
    try {
      const wallet = await Wallet.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['balance'],
        raw: true
      })
      const result = wallet.balance - req.body.amount
      if (wallet) {
        if (result >= 0) {
          const wallet = await Wallet.update({
            balance: result
          }, { 
            where: { 
              id: req.params.id
            }
          })
          console.log(wallet)
          res.status(200).send(wallet)
        }
        else {
          res.status(404).send("This Wallet Balance Is Not Enough to Decrease")
        }
      } 
      else {
        res.status(404).send("Wallet Not Found")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  transferBalance: async (req, res) => {
    try {
      const from_wallet = await Wallet.findOne({
        where: {
          id: req.body.from_wallet_id
        },
        attributes: ['balance','crypto_id'],
        raw: true
      })
      const to_wallet = await Wallet.findOne({
        where: {
          id: req.body.to_wallet_id
        },
        attributes: ['balance','crypto_id'],
        raw: true
      })
      if ((from_wallet)&&(to_wallet)) {
        const result = from_wallet.balance - req.body.amount
        if (result >= 0) {
          const wallet = await Wallet.update({
            balance: result
          }, { 
            where: { 
              id: req.body.from_wallet_id
            }
          })
          let increase = 1
          if (from_wallet.crypto_id !== to_wallet.crypto_id) {
            const exchange = await ExchangeRate.findOne({
              where: {
                crypto_id: from_wallet.crypto_id,
                tocrypto_id: to_wallet.crypto_id
              },
              attributes: ['rate'],
              raw: true
            })
            increase = exchange.rate
          }
          const find_wallet = await Wallet.findOne({
            where: {
              id: req.body.to_wallet_id
            },
            attributes: ['balance'],
            raw: true
          })
          const to_result = find_wallet.balance + (req.body.amount * increase)
          const result_wallet = await Wallet.update({
            balance: to_result
          }, { 
            where: { 
              id: req.body.to_wallet_id
            }
          })
          console.log(result_wallet)
          res.status(200).send(result_wallet)
        } 
        else {
          res.status(404).send("Your Wallet Balance Is Not Enough to Transfer")
        }        
      }
      else {
        res.status(404).send("Wallet Not Found")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  getTotalBalances: async (req, res) => {
    try {
      const wallet = await Wallet.findAll({
        include: [{
          model: Crypto,
          as: 'currency',
          attributes: ['currency']
        }],
        attributes: ['crypto_id', [sequelize.fn('sum', sequelize.col('balance')), 'total_balance']],
        group: ['crypto_id']
      })
      res.status(200).send(wallet)
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}
