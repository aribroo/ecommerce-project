import { addToCartValidation, checkoutValidation, getProductValidation, searchProductValidation } from '../validation/product-schema.js';
import { ResponseError } from '../error/response-error.js';
import { validate } from '../validation/validation.js';
import db from '../models/bundle-model.js';
import { v4 as uuidv4 } from 'uuid';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Op } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getProductHomepage = async () => {
  return db.product.findAll({
    attributes: ['id', 'title', 'stock', 'price', 'image', 'url'],
    where: { stock: { [Op.gt]: 0 } },
    limit: 8
  });
};

const productDetail = async (url) => {
  url = validate(getProductValidation, url);

  const product = await db.product.findOne({
    where: { url },
    attributes: ['id', 'title', 'price', 'stock', 'desc', 'full_desc', 'image', 'url'],

    include: {
      model: db.category,
      attributes: ['name']
    }
  });

  if (!product) throw new ResponseError(404, 'Product is not found');

  return product;
};

const searchProducts = async (query) => {
  if (Object.keys(query).length > 0 && !query.keyword) throw new ResponseError(400, 'Bad request query');

  const queryOptions = {
    attributes: ['id', 'title', 'price', 'stock', 'desc', 'full_desc', 'image', 'url', 'category_id']
  };

  if (query.keyword) {
    const keyword = validate(searchProductValidation, query.keyword);

    const products = await db.product.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                title: {
                  [Op.like]: `%${keyword}%`
                }
              },
              {
                '$category.name$': {
                  [Op.like]: `%${keyword}%`
                }
              }
            ]
          },
          {
            stock: {
              [Op.gt]: 0
            }
          }
        ]
      },
      ...queryOptions,

      include: {
        model: db.category,
        attributes: ['name']
      }
    });

    if (products.length === 0) throw new ResponseError(404, 'Product is not found');

    return products;
  } else {
    return db.product.findAll(queryOptions, { where: { stock: { [Op.gt]: 0 } } });
  }
};

const addToCart = async (userId, request) => {
  const product_id = validate(getProductValidation, request.product_id);
  userId = validate(addToCartValidation, userId);
  const qty = validate(addToCartValidation, request.qty);

  const checkCart = await db.cart.findOne({ where: { user_id: userId, product_id } });

  if (checkCart) {
    await db.cart.update(
      {
        qty: db.sequelize.literal('qty + 1')
      },
      { where: { user_id: userId, product_id } }
    );

    return db.cart.findOne({ where: { user_id: userId, product_id } });
  }

  return db.cart.create({
    user_id: userId,
    qty,
    product_id
  });
};

const updateCart = async (id, request) => {
  id = validate(addToCartValidation, id);
  const qty = validate(addToCartValidation, request.qty);

  const cart = await db.cart.update({ qty }, { where: { id } });

  if (cart[0] === 0) throw new ResponseError(404, 'id cart not found');

  return db.cart.findOne({ where: { id } });
};

const getCart = async (userId) => {
  userId = validate(addToCartValidation, userId);

  const cart = await db.cart.findAll({
    attributes: ['id', 'qty'],
    where: { user_id: userId },
    include: [
      {
        model: db.product,
        attributes: ['title', 'price', 'image', 'url']
      }
    ]
  });

  if (cart.length === 0) throw new ResponseError(404, 'Cart not found');

  return cart;
};

const deleteCart = async (id) => {
  id = validate(addToCartValidation, id);
  const cart = await db.cart.destroy({ where: { id } });

  if (cart === 0) throw new ResponseError(404, 'Id cart not found');
};

const checkout = async (user) => {
  const carts = await db.cart.findAll({
    where: { user_id: user.id },
    include: [
      {
        model: db.product,
        attributes: ['price']
      }
    ]
  });

  if (carts.length === 0) {
    throw new ResponseError(404, 'Cart is not found');
  }

  const amount = carts.reduce((total, cart) => {
    return total + cart.product.price * cart.qty;
  }, 0);

  const transactionData = {
    id: uuidv4(),
    trs_number: 'trs-' + Date.now(),
    amount: parseInt(amount),
    user_id: user.id
  };

  const transactionItems = carts.map((cart) => ({
    qty: cart.qty,
    product_id: cart.product_id,
    trs_id: transactionData.id
  }));

  // create transaction data and transaction details
  await db.transaction.create(transactionData);
  await db.transaction_detail.bulkCreate(transactionItems);

  // delete cart items after successful transaction
  await db.cart.destroy({ where: { user_id: user.id } });

  return transactionData;
};

const getImage = async (name) => {
  name = validate(getProductValidation, name);

  const image = join(__dirname, '../../uploads', name);
  return image;
};

export default { getProductHomepage, productDetail, searchProducts, addToCart, getCart, updateCart, deleteCart, checkout, getImage };
