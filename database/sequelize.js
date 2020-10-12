// Store Item
const Item = sequelize.define('Item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  detail: Sequelize.STRING,
  price: {
    type: Sequelize.DECIMAL(10,2),
    validate: {
        min: 0
    }
  },
  start_date: Sequelize.DATEONLY,
  end_date: Sequelize.DATEONLY
})
Item.associate = (models) => {
  Item.hasMany(ItemCode, { foreignKey: 'item_id' }),
  Item.belongsToMany(Promotion, {through: 'ItemPromotion', foreignKey: 'item_id'}),
  Item.belongsToMany(Bundle, {through: 'ItemBundle', foreignKey: 'item_id'})    
}

// Store ItemCode 
const ItemCode = sequelize.define('ItemCode', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: Sequelize.STRING(32),
    unique: true
  },
  item_id: Sequelize.INTEGER,
  order_id: Sequelize.INTEGER,
  valid: Sequelize.BOOLEAN
})
ItemCode.associate = (models) => {
  ItemCode.belongsTo(Item, { foreignKey: 'item_id' }),
  ItemCode.belongsTo(Order, { foreignKey: 'order_id' })
}

// Store Promotion 
const Promotion = sequelize.define('Promotion', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  discount_price: {
    type: Sequelize.DECIMAL(10,2),
    validate: {
        min: 0
    }
  },
  start_date: Sequelize.DATEONLY,
  end_date: Sequelize.DATEONLY
})
Promotion.associate = (models) => {
  Promotion.belongsToMany(Item, {through: 'ItemPromotion', foreignKey: 'promotion_id'})
}

// Store Bundle 
const Bundle = sequelize.define('Bundle', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bundle_price: {
    type: Sequelize.DECIMAL(10,2),
    validate: {
        min: 0
    }
  }
})
Bundle.associate = (models) => {
  Bundle.belongsToMany(Item, {through: 'ItemBundle', foreignKey: 'bundle_id'})
}

// Store Order 
const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  bundle_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  promotion_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  total_price: Sequelize.DECIMAL(10,2),
  paid: Sequelize.BOOLEAN
})
Order.associate = (models) => {
    Order.belongsTo(Item, { foreignKey: 'item_id' }),
    Order.belongsTo(Bundle, { foreignKey: 'bundle_id' }),
    Order.belongsTo(Promotion, { foreignKey: 'promotion_id' }),
    Order.hasMany(ItemCode, { foreignKey: 'order_id' })
}

// Store Item Is Related to Promotion
const ItemPromotion = sequelize.define('ItemPromotion', {
  promotion_price: {
    type: Sequelize.DECIMAL(10,2),
    validate: {
      min: 0
    }
  }
})

// Store Item Is Related to Bundle
const ItemBundle = sequelize.define('ItemBundle', {
  amount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  }
})