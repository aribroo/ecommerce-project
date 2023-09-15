import { ResponseError } from '../error/response-error.js';
import { validate } from '../validation/validation.js';
import db from '../models/bundle-model.js';
import { getProductValidation } from '../validation/product-schema.js';

const getAllTransaction = async (userId) => {
  const transactions = await db.transaction.findAll({
    where: { user_id: userId },
    attributes: ['id', 'trs_number', 'amount', 'createdAt'],
    include: [
      {
        attributes: ['id', 'qty'],
        model: db.transaction_detail,
        include: [
          {
            attributes: ['title', 'price', 'desc', 'full_desc', 'image'],
            model: db.product,
            include: [
              {
                attributes: ['name'],
                model: db.category
              }
            ]
          }
        ]
      }
    ]
  });

  if (transactions.length === 0) throw new ResponseError(404, 'Transaction is empty');

  const groupedData = transactions.map((transaction) => {
    const products = transaction.transaction_details.map((detail) => {
      return detail.product.title;
    });

    return {
      transaction_id: transaction.id,
      amount: transaction.amount,
      date: transaction.createdAt,
      products
    };
  });

  return groupedData;
};

const getOneTransaction = async (id) => {
  id = validate(getProductValidation, id);

  const transaction = await db.transaction.findOne({
    where: { id },
    attributes: ['id', 'trs_number', 'amount'],
    include: [
      {
        attributes: ['id', 'qty'],
        model: db.transaction_detail,
        include: [
          {
            attributes: ['title', 'price', 'desc', 'full_desc', 'image'],
            model: db.product,
            include: [
              {
                attributes: ['name'],
                model: db.category
              }
            ]
          }
        ]
      }
    ]
  });

  if (!transaction) throw new ResponseError(404, 'Transaction is not found');

  const products = transaction.transaction_details.map((detail) => {
    return {
      id: detail.id,
      qty: detail.qty,
      title: detail.product.title,
      price: detail.product.price,
      image: detail.product.image,
      category: detail.product.category.name,
      desc: detail.product.desc,
      full_desc: detail.product.full_desc
    };
  });

  return {
    trs_id: transaction.id,
    trs_number: transaction.trs_number,
    amount: transaction.amount,
    date: transaction.createdAt,
    products
  };
};

export default { getAllTransaction, getOneTransaction };
