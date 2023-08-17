import Joi from 'joi';

export const createCategoryValidation = Joi.string().min(3).max(50).required();

export const getCategoryValidation = Joi.number().positive().min(1).required();
