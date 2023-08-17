import { ResponseError } from '../error/response-error.js';
import { validate } from '../validation/validation.js';
import db from '../models/bundle-model.js';
import { getProductValidation } from '../validation/product-schema.js';

const getAllTransaction = async () => {
  const historyTransaction = await db.transaction.findAll({
    attributes: ['id', 'trs_number'],
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

  if (historyTransaction.length === 0) throw new ResponseError(404, 'Transaction is empty');

  const groupedData = historyTransaction.reduce((result, currentItem) => {
    const existingItem = result.find((item) => item.transaction_id === currentItem.id);

    if (existingItem) {
      existingItem.items.push({
        id: currentItem.transaction_detail.id,
        qty: currentItem.transaction_detail.qty,
        product: currentItem.transaction_detail.product
      });
    } else {
      result.push({
        transaction_id: currentItem.id,
        trs_number: currentItem.trs_number,
        items: [
          {
            id: currentItem.transaction_detail.id,
            qty: currentItem.transaction_detail.qty,
            product: currentItem.transaction_detail.product
          }
        ]
      });
    }

    return result;
  }, []);

  return groupedData;
};

const getOneTransaction = async (id) => {
  id = validate(getProductValidation, id);

  const historyTransaction = await db.transaction.findAll({
    where: { id },
    attributes: ['id', 'trs_number'],
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

  if (historyTransaction.length === 0) throw new ResponseError(404, 'Transaction is not found');

  const groupedData = historyTransaction.reduce((result, currentItem) => {
    const existingItem = result.find((item) => item.transaction_id === currentItem.id);

    if (existingItem) {
      existingItem.items.push({
        id: currentItem.transaction_detail.id,
        qty: currentItem.transaction_detail.qty,
        product: currentItem.transaction_detail.product
      });
    } else {
      result.push({
        transaction_id: currentItem.id,
        trs_number: currentItem.trs_number,
        items: [
          {
            id: currentItem.transaction_detail.id,
            qty: currentItem.transaction_detail.qty,
            product: currentItem.transaction_detail.product
          }
        ]
      });
    }

    return result;
  }, []);

  return groupedData;
};

export default { getAllTransaction, getOneTransaction };
