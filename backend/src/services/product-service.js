import { createProductValidation, getProductValidation, searchProductValidation } from '../validation/product-schema.js';
import { validate } from '../validation/validation.js';
import db from '../models/bundle-model.js';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';
import { ResponseError } from '../error/response-error.js';

const createProduct = async (file, request) => {
  request = validate(createProductValidation, request);
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000);

  const data = {
    id: uuidv4(),
    title: request.title,
    price: request.price,
    stock: request.stock,
    desc: request.desc,
    full_desc: request.full_desc,
    image: file.filename,
    url: slugify(request.title + ' ' + randomDigits, { lower: true }),
    category_id: request.category_id
  };

  return await db.product.create(data);
};

const getAllProducts = async (query) => {
  const queryOptions = {
    attributes: ['id', 'title', 'price', 'stock', 'desc', 'full_desc', 'image', 'url', 'category_id']
  };

  if (Object.keys(query).length !== 0 && !query.title) throw new ResponseError(400, 'Bad request query');

  if (query.title) {
    const title = validate(searchProductValidation, query.title);

    const products = await db.product.findAll({
      where: {
        title: {
          [db.Sequelize.Op.like]: `%${title}%`
        }
      },
      ...queryOptions
    });

    if (products.length === 0) throw new ResponseError(404, 'Product is not found');

    return products;
  } else {
    return db.product.findAll(queryOptions);
  }
};

const getOneProduct = async (id) => {
  id = validate(getProductValidation, id);

  const product = await db.product.findOne({
    where: { id },
    attributes: ['id', 'title', 'price', 'stock', 'desc', 'full_desc', 'image', 'url', 'category_id']
  });

  if (!product) throw new ResponseError(404, 'Product is not found');

  return product;
};

const updateProduct = async (id, file, request) => {
  id = validate(getProductValidation, id);
  request = validate(createProductValidation, request);

  const randomDigits = Math.floor(10000000 + Math.random() * 90000000);

  const data = {
    title: request.title,
    price: request.price,
    stock: request.stock,
    desc: request.desc,
    full_desc: request.full_desc,
    image: file.filename,
    url: slugify(request.title + ' ' + randomDigits, { lower: true }),
    category_id: request.category_id
  };

  const product = await db.product.update(data, {
    where: { id }
  });

  if (product[0] === 0) throw new ResponseError(404, 'Product is not found');

  return db.product.findOne({
    where: { id },
    attributes: ['id', 'title', 'price', 'stock', 'desc', 'full_desc', 'image', 'url', 'category_id']
  });
};

const deleteProduct = async (id) => {
  id = validate(getProductValidation, id);

  const product = await db.product.destroy({
    where: { id }
  });

  if (product === 0) throw new ResponseError(404, 'Product is not found');
};

export default { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct };
