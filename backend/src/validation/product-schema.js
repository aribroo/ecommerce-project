import Joi from 'joi';

export const createProductValidation = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  stock: Joi.number().positive().min(1).required(),
  price: Joi.number().positive().min(100).max(100000000).required(),
  desc: Joi.string().min(5).max(255).required(),
  full_desc: Joi.string().min(10).optional().allow(null).allow(''),
  category_id: Joi.number().min(1).positive().required()
});

export const getProductValidation = Joi.string().required();

export const searchProductValidation = Joi.string();

export const addToCartValidation = Joi.number().positive().required();

export const checkoutValidation = Joi.object({
  id: Joi.number().positive().required(),
  username: Joi.string().min(4).max(100).required(),
  name: Joi.string().min(4).max(100).required(),
  email: Joi.string().email().optional().allow(null).allow(''),
  phone_number: Joi.string().min(6).max(20).required(),
  address: Joi.string().required()
});
