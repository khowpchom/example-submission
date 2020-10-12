const User = require('../models').User
const Wallet = require('../models').Wallet

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.findAll({
        include: [{
          model: Wallet,
          as: 'wallets'
        }]
      })
      res.status(200).send(user)
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findAll({
        where: {
          id: req.params.id
        },
        include: [{
          model: Wallet,
          as: 'wallets'
        }]
      })
      if (user) {
        res.status(200).send(user)
      } 
      else {
        res.status(404).send("User Not Found")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  create: async (req, res) => {
    try {
      const user = await User.create({
        name: req.body.name
      })
      res.status(201).send(user)
    } 
    catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },
  update: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id
        }
      })
      if (user) {
        const updatedUser = await User.update({
          name: req.body.name
        }, { 
          where: { 
            id: req.params.id
          }
        })
        res.status(200).send(updatedUser)
      } 
      else {
        res.status(404).send("User Not Found")
      }
    } 
    catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}
