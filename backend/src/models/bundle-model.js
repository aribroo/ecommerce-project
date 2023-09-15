import { logger } from '../apps/logging.js';
import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/db-config.js';

import CategoryModel from './category-model.js';
import ProductModel from './product-model.js';
import CartModel from './cart-model.js';
import TransactionDetailModel from './transaction-detail-model.js';
import TransactionModel from './transaction-model.js';
import UserModel from './user-model.js';

const sequelize = new Sequelize(dbConfig.dbname, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorAlises: false,
  port: dbConfig.dbport,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: (msg) => logger.info(msg)
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('connected...');
  })
  .catch((e) => {
    logger.error('Error: ', e);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.user = UserModel(sequelize, DataTypes);
db.product = ProductModel(sequelize, DataTypes);
db.category = CategoryModel(sequelize, DataTypes);
db.cart = CartModel(sequelize, DataTypes);
db.transaction = TransactionModel(sequelize, DataTypes);
db.transaction_detail = TransactionDetailModel(sequelize, DataTypes);

// relation
db.category.hasMany(db.product, { foreignKey: 'category_id', onDelete: 'SET NULL' });
db.product.belongsTo(db.category, { foreignKey: 'category_id', onDelete: 'SET NULL' });

db.product.hasMany(db.cart, { foreignKey: 'product_id', onDelete: 'CASCADE' });
db.cart.belongsTo(db.product, { foreignKey: 'product_id' });

db.user.hasOne(db.cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.cart.belongsTo(db.user, { foreignKey: 'user_id' });

db.product.hasMany(db.transaction_detail, { foreignKey: 'product_id', onDelete: 'SET NULL' });
db.transaction_detail.belongsTo(db.product, { foreignKey: 'product_id' });

db.transaction.hasMany(db.transaction_detail, { foreignKey: 'trs_id' });
db.transaction_detail.belongsTo(db.transaction, { foreignKey: 'trs_id' });

db.user.hasOne(db.transaction, { foreignKey: 'user_id', onDelete: 'SET NULL' });
db.transaction.belongsTo(db.user, { foreignKey: 'user_id' });

db.sequelize.sync({ force: false }).then(() => {
  logger.info('re-sync done');
});

export default db;
