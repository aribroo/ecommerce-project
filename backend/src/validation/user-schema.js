import Joi from 'joi';

export const registerValidation = Joi.object({
  username: Joi.string().min(4).max(100).required(),
  password: Joi.string().min(6).max(100).required(),
  phone_number: Joi.string().min(8).max(20).required(),
  email: Joi.string().email().required(),
  address: Joi.string().required()
});

export const loginValidation = Joi.object({
  username: Joi.string().min(4).max(100).optional().allow(null).allow(''),
  phone_number: Joi.string().max(20).optional().allow(null).allow(''),
  password: Joi.string().min(6).max(100).required()
});

export const getUserValidation = Joi.number().min(1).positive().required();
