import { addToCartValidation, getProductValidation, searchProductValidation } from '../validation/product-schema.js';
import { ResponseError } from '../error/response-error.js';
import { validate } from '../validation/validation.js';
import db from '../models/bundle-model.js';
import { v4 as uuidv4 } from 'uuid';
import { customerValidation } from '../validation/customer-schema.js';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getProductHomepage = async () => {
  return db.product.findAll({
    attributes: ['id', 'title', 'price', 'image', 'url'],
    limit: 8
  });
};

const productDetail = async (url) => {
  url = validate(getProductValidation, url);

  const product = await db.product.findOne({
    where: { url },
    attributes: ['id', 'title', 'price', 'desc', 'full_desc', 'image', 'url'],

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
    attributes: ['id', 'title', 'price', 'desc', 'full_desc', 'image', 'url', 'category_id']
  };

  if (query.keyword) {
    const keyword = validate(searchProductValidation, query.keyword);

    const products = await db.product.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          {
            title: {
              [db.Sequelize.Op.like]: `%${keyword}%`
            }
          },
          {
            '$category.name$': {
              [db.Sequelize.Op.like]: `%${keyword}%`
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
    return db.product.findAll(queryOptions);
  }
};

const addToCart = async (request) => {
  const product_id = validate(getProductValidation, request.product_id);
  const session_id = validate(addToCartValidation, request.session_id);
  const qty = validate(addToCartValidation, request.qty);

  const checkCart = await db.cart.findOne({ where: { session_id, product_id } });

  if (checkCart) {
    await db.cart.update(
      {
        qty: db.sequelize.literal('qty + 1')
      },
      { where: { session_id, product_id } }
    );

    return db.cart.findOne({ where: { session_id, product_id } });
  }

  return db.cart.create({
    qty,
    session_id,
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

const getCart = async (query) => {
  const session_id = validate(addToCartValidation, query.session_id);

  const cart = await db.cart.findAll({
    attributes: ['id', 'qty', 'session_id'],
    where: { session_id },
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
  console.log(cart);
  if (cart === 0) throw new ResponseError(404, 'Id cart not found');
};

const checkout = async (query, request) => {
  const session_id = validate(addToCartValidation, query.session_id);
  request = validate(customerValidation, request);

  const cart = await db.cart.findAll({ where: { session_id } });

  if (cart.length === 0) {
    throw new ResponseError(404, 'Cart is not found');
  }

  const transactionData = {
    id: uuidv4(),
    trs_number: 'trs-' + Date.now()
  };

  const transactionItems = cart.map((item) => ({
    qty: item.qty,
    session_id: item.session_id,
    product_id: item.product_id,
    trs_id: transactionData.id
  }));

  // create transaction data and transaction details
  await db.transaction.create(transactionData);
  await db.transaction_detail.bulkCreate(transactionItems);

  // delete cart items after successful transaction
  await db.cart.destroy({ where: { session_id } });

  const customerData = {
    first_name: request.first_name,
    last_name: request.last_name,
    email: request.email,
    address: request.address,
    number_phone: request.number_phone,
    trs_id: transactionData.id
  };

  // create customer data
  await db.customer.create(customerData);

  return transactionData;
};

const getImage = async (name) => {
  name = validate(getProductValidation, name);

  const image = join(__dirname, '../../uploads', name);
  return image;
};

export default { getProductHomepage, productDetail, searchProducts, addToCart, getCart, updateCart, deleteCart, checkout, getImage };
