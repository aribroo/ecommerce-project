import Joi from 'joi';

export const createProductValidation = Joi.object({
  title: Joi.string().min(5).max(255).required(),
  price: Joi.number().positive().min(100).max(100000000).required(),
  desc: Joi.string().min(5).max(255).required(),
  full_desc: Joi.string().min(10).optional().allow(null).allow(''),
  category_id: Joi.number().min(1).positive().required()
});

export const getProductValidation = Joi.string().required();

export const searchProductValidation = Joi.string();

export const addToCartValidation = Joi.number().positive().required();
