import Joi from 'joi';

export const customerValidation = Joi.object({
  first_name: Joi.string().min(3).max(50).required(),
  last_name: Joi.string().min(3).max(50).optional().allow(null).allow(''),
  email: Joi.string().email().max(50).required(),
  number_phone: Joi.string().min(8).max(20).required(),
  address: Joi.string().min(3).max(255).required()
});
